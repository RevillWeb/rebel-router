/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: http://www.jsinsights.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

//Custom shim for Safari
if (typeof HTMLElement !== 'function') {
    var _HTMLElement = function(){};
    _HTMLElement.prototype = HTMLElement.prototype;
    HTMLElement = _HTMLElement;
}

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
            "shadowRoot": false,
            "animation": false
        }, config);
    }
    initAnimation() {
        if (this.config.animation === true) {
            const observer = new MutationObserver((mutations) => {
                let node = mutations[0].addedNodes[0];
                if (node !== undefined) {
                    const otherChildren = this.getOtherChildren(node);
                    node.className += " rebel-animate enter";
                    setTimeout(() => {
                        if (otherChildren.length > 0) {
                            otherChildren.forEach((child) => {
                                child.className += " exit";
                                setTimeout(() => {
                                    child.className += " complete";
                                }, 10);
                            });
                        }
                        setTimeout(() => {
                            node.className += " complete";
                        }, 10);
                    }, 10);
                    const animationEnd = (event) => {
                        if (event.target.className.indexOf("exit") > -1) {
                            this.root.removeChild(event.target);
                        }
                    };
                    node.addEventListener("transitionend", animationEnd);
                    node.addEventListener("animationend", animationEnd);
                }
            });
            observer.observe(this, {childList: true});
        }
    }
    attachedCallback() {
        if (this.initialised === false) {
            if (this.config.shadowRoot === true) {
                this.createShadowRoot();
                this.root = this.shadowRoot;
            } else {
                this.root = this;
            }
            this.initAnimation();
            this.render();
            RebelRouter.pathChange((isBack) => {
                if (this.config.animation === true) {
                    if (isBack === true) {
                        this.className = this.className.replace(" rbl-back", "");
                        this.className += " rbl-back";
                    } else {
                        this.className = this.className.replace(" rbl-back", "");
                    }
                }
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
            if (result.templateName !== this.previousTemplate || this.config.animation === true) {
                this.$template = document.createElement(result.templateName);
                if (this.config.animation !== true) {
                    this.root.innerHTML = "";
                }
                this.root.appendChild(this.$template);
                this.previousTemplate = result.templateName;
            }
            for (let key in result.params) {
                let value = result.params[key];
                if (typeof value == "Object") {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        console.error("Couldn't parse param value:", e);
                    }
                }
                this.$template.setAttribute(key, value);
            }
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
    getOtherChildren(node) {
        const children = this.root.children;
        let results = [];
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child != node) {
                results.push(child);
            }
        }
        return results;
    };
}

export class RebelRouter {
    constructor(name, config) {
        this.stack = [];
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
            if (event.oldURL !== undefined && event.newURL != event.oldURL) {
                RebelRouter.changeCallbacks.forEach(function(callback){
                    callback(RebelRouter.isBack);
                });
                RebelRouter.isBack = false;
            }
        };
        if (window.onhashchange === null) {
            window.addEventListener("rblback", function(){
                RebelRouter.isBack = true;
            });
        }
        window.onhashchange = changeHandler;
        window.onpopstate = changeHandler;
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

class RebelBackA extends HTMLAnchorElement {
    attachedCallback() {
        this.addEventListener("click", (event) => {
            const path = this.getAttribute("href");
            event.preventDefault();
            if (path !== undefined) {
                window.dispatchEvent(new CustomEvent('rblback'));
            }
            window.location.hash = path;
        });
    }
}
document.registerElement("rebel-back-a", {
    extends: "a",
    prototype: RebelBackA.prototype
});