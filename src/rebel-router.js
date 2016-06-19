/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: blog.revillweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

/**
 * The main router class and entry point to the router.
 */
export class RebelRouter extends HTMLElement {

    createdCallback() {

        this.previousPath = null;
        this.basePath = null;

        //Get options
        this.options = {
            "animation": (this.getAttribute("animation") == "true"),
            "shadowRoot": (this.getAttribute("shadow") == "true"),
            "inherit": (this.getAttribute("inherit") == "true")
        };

        //Get routes
        if (this.options.inherit === true) {
            //If this is a nested router then we need to go and get the parent path
            let $element = this;
            while ($element.parentNode) {
                $element = $element.parentNode;
                if ($element.nodeName.toLowerCase() == "rebel-router") {
                    const current = $element.current();
                    this.basePath = current.route;
                    break;
                }
            }
        }
        this.routes = {};
        const $children = this.children;
        for (let i = 0; i < $children.length; i++) {
            const $child = $children[i];
            let path = $child.getAttribute("path");
            switch ($child.nodeName.toLowerCase()) {
                case "default":
                    path = "*";
                    break;
                case "route":
                    path = (this.basePath !== null) ? this.basePath + path : path;
                    break;
            }
            if (path !== null) {
                this.routes[path] = {
                    "component": $child.getAttribute("component"),
                    "template": $child.innerHTML || null
                };
            }
        }

        //After we have collected all configuration clear innerHTML
        this.innerHTML = "";

        if (this.options.shadowRoot === true) {
            this.createShadowRoot();
            this.root = this.shadowRoot;
        } else {
            this.root = this;
        }
        if (this.options.animation === true) {
            this.initAnimation();
        }
        this.render();
        RebelRouter.pathChange((isBack) => {
            if (this.options.animation === true) {
                if (isBack === true) {
                    this.classList.add("rbl-back");
                } else {
                    this.classList.remove("rbl-back");
                }
            }
            this.render();
        });

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
     * Method used to get the current route object
     * @returns {*}
     */
    current() {
        const path = RebelRouter.getPathFromUrl();
        for (const route in this.routes) {
            if (route !== "*") {
                let regexString = "^" + route.replace(/{\w+}\/?/g, "(\\w+)\/?");
                regexString += (regexString.indexOf("\\/?") > -1) ? "" : "\\/?" + "([?=&-\/\\w+]+)?$";
                const regex = new RegExp(regexString);
                if (regex.test(path)) {
                    return _routeResult(this.routes[route], route, regex, path);
                }
            }
        }
        return (this.routes["*"] !== undefined) ? _routeResult(this.routes["*"], "*", null, path) : null;
    }

    /**
     * Method called to render the current view
     */
    render() {
        const result = this.current();
        if (result !== null) {
            if (result.path !== this.previousPath || this.options.animation === true) {
                if (this.options.animation !== true) {
                    this.root.innerHTML = "";
                }
                if (result.component !== null) {
                    let $component = document.createElement(result.component);
                    for (let key in result.params) {
                        let value = result.params[key];
                        if (typeof value == "Object") {
                            try {
                                value = JSON.parse(value);
                            } catch (e) {
                                console.error("Couldn't parse param value:", e);
                            }
                        }
                        $component.setAttribute(key, value);
                    }
                    this.root.appendChild($component);
                } else {
                    let $template = result.template;
                    //TODO: Find a faster alternative
                    if ($template.indexOf("${") > -1) {
                        $template = $template.replace(/\${([^{}]*)}/g,
                            function (a, b) {
                                var r = result.params[b];
                                return typeof r === 'string' || typeof r === 'number' ? r : a;
                            }
                        );
                    }
                    this.root.innerHTML = `<div>${$template}</div>`;
                }
                this.previousPath = result.path;
            }
        }
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
    static createElement(Class) {
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
        const changeHandler = () => {
            /**
             *  event.oldURL and event.newURL would be better here but this doesn't work in IE :(
             */
            if (window.location.href != RebelRouter.oldURL) {
                RebelRouter.changeCallbacks.forEach(function(callback){
                    callback(RebelRouter.isBack);
                });
                RebelRouter.isBack = false;
            }
            RebelRouter.oldURL = window.location.href;
        };
        if (window.onhashchange === null) {
            window.addEventListener("rblback", function(){
                RebelRouter.isBack = true;
            });
        }
        window.onhashchange = changeHandler;
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

document.registerElement("rebel-router", RebelRouter);

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
/**
 * Register the back button custom element
 */
document.registerElement("rebel-back-a", {
    extends: "a",
    prototype: RebelBackA.prototype
});

/**
 * Constructs a route object
 * @param obj - the component name or the HTML template
 * @param route
 * @param regex
 * @param path
 * @returns {{}}
 * @private
 */
function _routeResult(obj, route, regex, path) {
    let result = {};
    result.component = obj.component;
    result.template = obj.template;
    result.route = route;
    result.path = path;
    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
    return result;
}