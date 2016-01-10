/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

import * as RebelCore from 'rebel-core';

function _routeResult(templateName, route, regex, path) {
    let result = {};
    result.templateName = templateName;
    result.route = route;
    result.path = path;
    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
    return result;
}

export class RebelRouter extends HTMLElement {
    attachedCallback() {
        this.createShadowRoot();
        this.render();
        RebelRouter.hashChange(() => {
            this.render();
        });
    }
    current() {
        const path = RebelRouter.getPathFromUrl();
        for (const route in this.paths) {
            if (route !== "*") {
                let regexString = "^" + route.replace(/{\w+}\/?/g, "(\\w+)\/?");
                regexString += (regexString.indexOf("\\/?") > -1) ? "" : "\\/?" + "([?=&-\/\\w+]+)?$";
                const regex = new RegExp(regexString);
                if (regex.test(path)) {
                    return _routeResult(this.paths[route], route, regex, path);
                }
            }
        }
        return (this.paths["*"] !== undefined) ? _routeResult(this.paths["*"], "*", null, path) : null;
    }
    render() {
        this.shadowRoot.innerHTML = "";
        const result = this.current();
        if (result !== null) {
            let $template = document.createElement(result.templateName);
            $template.setAttribute("rbl-url-params", JSON.stringify(result.params));
            this.shadowRoot.appendChild($template);
        }
    }
    add(path, ViewClass) {
        if (this.paths === undefined) {
            this.paths = {};
        }
        const name = RebelRouter.create(ViewClass);
        if (Array.isArray(path)) {
            path.forEach((item) => {
                this.paths[item] = name;
            });
        } else {
            this.paths[path] = name;
        }
    }
    setDefault(ViewClass) {
        this.add("*", ViewClass);
    }
    static create(Class) {
        const name = RebelCore.classToTag(Class);
        if (RebelCore.isRegisteredElement(name) === false) {
            document.registerElement(name, Class);
        }
        return name;
    }
    static changeCallbacks;
    static hashChange(callback) {
        if (RebelRouter.changeCallbacks === undefined) {
            RebelRouter.changeCallbacks = [];
        }
        RebelRouter.changeCallbacks.push(callback);
        window.onhashchange = (event) => {
            if (event.newURL != event.oldURL) {
                RebelRouter.changeCallbacks.forEach(function(callback){
                    callback();
                });
            }
        };
    }
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }
    static getParamsFromUrl(regex, route, path) {
        var result = RebelCore.parseQueryString(path);
        var re = /{(\w+)}/g;
        var results = [];
        let match;
        while (match = re.exec(route)) {
            results.push(match[1]);
        }
        if (regex !== null) {
            var results2 = regex.exec(path);
            results.forEach(function (item, idx) {
                result[item] = results2[idx + 1];
            });
        }
        return result;
    }
}