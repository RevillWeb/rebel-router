/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: blog.revillweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

/**
 * The main router class and entry point to the router.
 */
export class RebelRouter {
    /**
     * Constructor for a new router.
     * @param name - The name of the router, must be a valid element name (e.g. main-router)
     * @param config - Configuration object for the router
     * @returns {*} - Returns the view instance
     */
    constructor(name, config) {
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

    /**
     * Static helper method used to merge two configuration objects.
     * @param defaults
     * @param config
     * @returns {*}
     */
    static mergeConfig(defaults, config) {
        if (config === undefined) {
            return defaults;
        }
        var result = {};
        for (var attrName in defaults) { result[attrName] = defaults[attrName]; }
        for (var attrName in config) { result[attrName] = config[attrName]; }
        return result;
    }

    /**
     * Static method to add a new view to the router.
     * @param name
     * @param classInstance
     */
    static addView(name, classInstance) {
        if (RebelRouter._views === undefined) {
            RebelRouter._views = {};
        }
        RebelRouter._views[name] = classInstance;
    }

    /**
     * Static method to get a view instance by name.
     * @param name
     * @returns {*}
     */
    static getView(name) {
        return (RebelRouter._views !== undefined) ? RebelRouter._views[name] : undefined;
    }

    /**
     * Static helper method to parse the query string from a url into an object.
     * @param url
     * @returns {{}}
     */
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

    /**
     * Static helper method to convert a class name to a valid element name.
     * @param Class
     * @returns {string}
     */
    static classToTag(Class) {
        /**
         * Class.name would be better but this isn't supported in IE 11.
         */
        try {
            var name = Class.toString().match(/^function\s*([^\s(]+)/)[1].replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        } catch (e) {
            throw new Error("Couldn't parse class name:", e);
        }
        if (RebelRouter.validElementTag(name) === false) {
            throw new Error("Class name couldn't be translated to tag.");
        }
        return name;
    }

    /**
     * Static helper method used to determine if an element with the specified name has already been registered.
     * @param name
     * @returns {boolean}
     */
    static isRegisteredElement(name) {
        return document.createElement(name).constructor !== HTMLElement;
    }

    /**
     * Static helper method to take a web component class, create an element name and register the new element on the document.
     * @param Class
     * @returns {string}
     */
    static create(Class) {
        const name = RebelRouter.classToTag(Class);
        if (RebelRouter.isRegisteredElement(name) === false) {
            Class.prototype.name = name;
            document.registerElement(name, Class);
        }
        return name;
    }

    /**
     * Simple static helper method containing a regular expression to validate an element name
     * @param tag
     * @returns {boolean}
     */
    static validElementTag(tag) {
        return /^[a-z0-9\-]+$/.test(tag);
    }

    /**
     * Method used to register a callback to be called when the URL path changes.
     * @param callback
     */
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

    /**
     * Static helper method used to get the parameters from the provided route.
     * @param regex
     * @param route
     * @param path
     * @returns {{}}
     */
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

    /**
     * Static helper method used to get the path from the current URL.
     * @returns {*}
     */
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }
}

/**
 * Represents a router template which is used as the prototype for each RebelRouter element registered.
 */
class RouterTemplate extends HTMLElement {
    /**
     * Initialisation method with some basic configuration.
     * @param config
     */
    init(config) {
        this.initialised = false;
        this.config = RebelRouter.mergeConfig({
            "shadowRoot": false,
            "animation": false
        }, config);
    }

    /**
     * Function used to initialise the animation mechanics if animation is turned on
     */
    initAnimation() {
        const observer = new MutationObserver((mutations) => {
            let node = mutations[0].addedNodes[0];
            if (node !== undefined) {
                const otherChildren = this.getOtherChildren(node);
                node.classList.add("rebel-animate");
                node.classList.add("enter");
                setTimeout(() => {
                    if (otherChildren.length > 0) {
                        otherChildren.forEach((child) => {
                            child.classList.add("exit");
                            setTimeout(() => {
                                child.classList.add("complete");
                            }, 10);
                        });
                    }
                    setTimeout(() => {
                        node.classList.add("complete");
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

    /**
     * Executed when the element has been added to the DOM, renders the templates and sets up the path change listener
     */
    attachedCallback() {
        if (this.initialised === false) {
            if (this.config.shadowRoot === true) {
                this.createShadowRoot();
                this.root = this.shadowRoot;
            } else {
                this.root = this;
            }
            if (this.config.animation === true) {
                this.initAnimation();
            }
            this.render();
            RebelRouter.pathChange((isBack) => {
                if (this.config.animation === true) {
                    if (isBack === true) {
                        this.classList.add("rbl-back");
                    } else {
                        this.classList.remove("rbl-back");
                    }
                }
                this.render();
            });
            this.initialised = true;
        }
    }

    /**
     * Method used to get the current route object
     * @returns {*}
     */
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

    /**
     * Method called to render the current view
     */
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

    /**
     * Method used to add new paths to the router
     * @param path - The route path
     * @param ViewClass - The web component representing the view assoicated to the path
     * @returns {RouterTemplate}
     */
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

    /**
     * Short had way of adding a new default/fallback route
     * @param ViewClass
     * @returns {RouterTemplate}
     */
    setDefault(ViewClass) {
        return this.add("*", ViewClass);
    }

    /**
     *
     * @param node - Used with the animation mechanics to get all other view children except itself
     * @returns {Array}
     */
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

/**
 * Represents a view element used to embed a router in the DOM
 */
class RebelRouterInstance extends HTMLElement {
    /**
     * Called when the element is added to the DOM.
     */
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
document.registerElement("rebel-router", RebelRouterInstance);

/**
 * Represents the prototype for an anchor element which added functionality to perform a back transition.
 */
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

/**
 * Constructs a route object
 * @param templateName
 * @param route
 * @param regex
 * @param path
 * @returns {{}}
 * @private
 */
function _routeResult(templateName, route, regex, path) {
    let result = {};
    result.templateName = templateName;
    result.route = route;
    result.path = path;
    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
    return result;
}