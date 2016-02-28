/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: http://www.jsinsights.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

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
    static parseQueryString(url) {
        var result = {};
        if (url !== undefined) {
            var queryString = (url.indexOf("?") > -1) ? url.substr(url.indexOf("?") + 1, url.length) : null;
            if (queryString !== null) {
                queryString.split("&").forEach(function (part) {
                    if (!part) return;
                    part = part.replace("+", " ");
                    var eq = part.indexOf("=");
                    var key = eq > -1 ? part.substr(0, eq) : part;
                    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
                    var from = key.indexOf("[");
                    if (from == -1) result[decodeURIComponent(key)] = val;
                    else {
                        var to = key.indexOf("]");
                        var index = decodeURIComponent(key.substring(from + 1, to));
                        key = decodeURIComponent(key.substring(0, from));
                        if (!result[key]) result[key] = [];
                        if (!index) result[key].push(val);
                        else result[key][index] = val;
                    }
                });
            }
        }
        return result;
    }
    static classToTag(Class) {
        var name = Class.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        if (validElementTag(name) === false) {
            throw new Error("Class name couldn't be translated to tag.");
        }
        return name;
    }
    static isRegisteredElement(name) {
        return document.createElement(name).constructor !== HTMLElement;
    }
    static create(Class) {
        const name = RebelRouter.classToTag(Class);
        if (RebelRouter.isRegisteredElement(name) === false) {
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
        var result = RebelRouter.parseQueryString(path);
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