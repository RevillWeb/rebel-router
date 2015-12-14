import * as RebelCore from 'rebel-core';

export class RebelRouter {
    constructor() {
        this.paths = {};
        return this;
    }
    add(path, ViewClass) {
        let name = ViewClass.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        document.registerElement(name, ViewClass);
        if (Array.isArray(path)) {
            path.forEach((item) => {
                this.paths[item] = name;
            });
        } else {
            this.paths[path] = name;
        }
        return this;
    }
    create(name) {
        name = name.toLowerCase();
        if (RebelCore.validElementTag(name) === true) {
            let $constructor = document.registerElement(name, RebelView);
            let $view = new $constructor();
            $view.paths = this.paths;
            return $view;
        } else {
            throw new Error("Invalid router name provided");
        }
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

class RebelView extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
    }
    attachedCallback() {
        this.render();
        window.onhashchange = (event) => {
            if (event.newURL != event.oldURL) {
                this.render();
            }
        };
    }
    current() {
        const path = RebelRouter.getPathFromUrl();
        for (const route in this._paths) {
            let regexString = "^" + route.replace(/{\w+}\/?/g, "(\\w+)\/?");
            regexString += (regexString.indexOf("\\/?") > -1) ? "" : "\\/?" + "([?=&\\w+]+)?$";
            const regex = new RegExp(regexString);
            if (regex.test(path)) {
                let result = {};
                result.templateName = this._paths[route];
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
    set paths(value) {
        this._paths = value;
    }
}