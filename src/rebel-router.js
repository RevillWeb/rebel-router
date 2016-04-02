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

class RouterTemplate extends HTMLTemplateElement {
    init(config) {
        this.initialised = false;
        this.config = RebelRouter.mergeConfig({
            "shadowRoot": false
        }, config);
    }
    attachedCallback() {
        if (this.initialised === false) {
            if (this.config.shadowRoot === true) {
                this.createShadowRoot();
                this.root = this.shadowRoot;
            } else {
                this.root = this;
            }
            this.render();
            RebelRouter.pathChange(() => {
                this.render();
            });
            this.initialised = true;
        }
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
        const result = this.current();
        if (result !== null) {
            //let $template = null;
            if (result.templateName !== this.previousTemplate) {
                this.root.innerHTML = "";
                this.$template = document.createElement(result.templateName);
                this.root.appendChild(this.$template);
                this.previousTemplate = result.templateName;
            }
            this.$template.setAttribute("rbl-url-params", JSON.stringify(result.params));
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
        return this;
    }
    setDefault(ViewClass) {
        return this.add("*", ViewClass);
    }
}

export class RebelRouter {
    constructor(name, config) {
        this.template = null;
        if (RebelRouter.validElementTag(name) === false) {
            throw new Error("Invalid tag name provided.");
        }
        if (RebelRouter.isRegisteredElement(name) === false) {
            const tag = document.registerElement(name, {
                prototype: Object.create(RouterTemplate.prototype)
            });
            let instance = new tag();
            instance.init(config);
            RebelRouter.addView(name, instance);
        }
        return RebelRouter.getView(name);
    }
    static mergeConfig(defaults, config) {
        if (config === undefined) {
            return defaults;
        }
        var result = {};
        for (var attrName in defaults) { result[attrName] = defaults[attrName]; }
        for (var attrName in config) { result[attrName] = config[attrName]; }
        return result;
    }
    static addView(name, classInstance) {
        if (RebelRouter._views === undefined) {
            RebelRouter._views = {};
        }
        RebelRouter._views[name] = classInstance;
    }
    static getView(name) {
        return (RebelRouter._views !== undefined) ? RebelRouter._views[name] : undefined;
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
        if (RebelRouter.validElementTag(name) === false) {
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
            Class.prototype.name = name;
            document.registerElement(name, Class);
        }
        return name;
    }
    static validElementTag(tag) {
        return /^[a-z0-9\-]+$/.test(tag);
    }
    static pathChange(callback) {
        if (RebelRouter.changeCallbacks === undefined) {
            RebelRouter.changeCallbacks = [];
        }
        RebelRouter.changeCallbacks.push(callback);
        const changeHandler = (event) => {
            if ((event.oldURL !== undefined && event.newURL != event.oldURL) || (event.detail !== undefined && event.detail.path !== undefined)) {
                var data = event.detail;
                RebelRouter.changeCallbacks.forEach(function(callback){
                    callback(data);
                });
            }
        };
        window.onhashchange = changeHandler;
        window.onpopstate = changeHandler;
        window.addEventListener("pushstate", changeHandler);
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
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }
}

class RebelView extends HTMLTemplateElement {
    attachedCallback() {
        //Get the name attribute from this element
        var name = this.getAttribute("name");
        //If its not undefined then attempt to find a router instance with a matching name
        if (name !== undefined) {
            var instance = RebelRouter.getView(name);
            //If an instance exists with that name append it to this element
            if (instance !== undefined) {
                this.appendChild(instance);
            }
        }
    }
}
document.registerElement("rebel-view", RebelView);