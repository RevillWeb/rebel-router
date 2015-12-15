/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

import * as RebelCore from 'rebel-core';

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
            let regexString = "^" + route.replace(/{\w+}\/?/g, "(\\w+)\/?");
            regexString += (regexString.indexOf("\\/?") > -1) ? "" : "\\/?" + "([?=&\\w+]+)?$";
            const regex = new RegExp(regexString);
            if (regex.test(path)) {
                let result = {};
                result.templateName = this.paths[route];
                result.route = route;
                result.path = path;
                result.params = RebelRouter.getParamsFromUrl(regex, route, path);
                return result;
            }
        }
        return null;
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
        let name = ViewClass.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        document.registerElement(name, ViewClass);
        if (Array.isArray(path)) {
            path.forEach((item) => {
                this.paths[item] = name;
            });
        } else {
            this.paths[path] = name;
        }
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
        var results2 = regex.exec(path);
        results.forEach(function(item, idx){
            result[item] = results2[idx + 1];
        });
        return result;
    }
}