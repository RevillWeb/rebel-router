"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: blog.revillweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

/**
 * The main router class and entry point to the router.
 */

var RebelRouter = exports.RebelRouter = (function () {
    /**
     * Constructor for a new router.
     * @param name - The name of the router, must be a valid element name (e.g. main-router)
     * @param config - Configuration object for the router
     * @returns {*} - Returns the view instance
     */

    function RebelRouter(name, config) {
        _classCallCheck(this, RebelRouter);

        if (RebelRouter.validElementTag(name) === false) {
            throw new Error("Invalid tag name provided.");
        }
        if (RebelRouter.isRegisteredElement(name) === false) {
            var tag = document.registerElement(name, {
                prototype: Object.create(RouterTemplate.prototype)
            });
            var instance = new tag();
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

    _createClass(RebelRouter, null, [{
        key: "mergeConfig",
        value: function mergeConfig(defaults, config) {
            if (config === undefined) {
                return defaults;
            }
            var result = {};
            for (var attrName in defaults) {
                result[attrName] = defaults[attrName];
            }
            for (var attrName in config) {
                result[attrName] = config[attrName];
            }
            return result;
        }

        /**
         * Static method to add a new view to the router.
         * @param name
         * @param classInstance
         */

    }, {
        key: "addView",
        value: function addView(name, classInstance) {
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

    }, {
        key: "getView",
        value: function getView(name) {
            return RebelRouter._views !== undefined ? RebelRouter._views[name] : undefined;
        }

        /**
         * Static helper method to parse the query string from a url into an object.
         * @param url
         * @returns {{}}
         */

    }, {
        key: "parseQueryString",
        value: function parseQueryString(url) {
            var result = {};
            if (url !== undefined) {
                var queryString = url.indexOf("?") > -1 ? url.substr(url.indexOf("?") + 1, url.length) : null;
                if (queryString !== null) {
                    queryString.split("&").forEach(function (part) {
                        if (!part) return;
                        part = part.replace("+", " ");
                        var eq = part.indexOf("=");
                        var key = eq > -1 ? part.substr(0, eq) : part;
                        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
                        var from = key.indexOf("[");
                        if (from == -1) result[decodeURIComponent(key)] = val;else {
                            var to = key.indexOf("]");
                            var index = decodeURIComponent(key.substring(from + 1, to));
                            key = decodeURIComponent(key.substring(0, from));
                            if (!result[key]) result[key] = [];
                            if (!index) result[key].push(val);else result[key][index] = val;
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

    }, {
        key: "classToTag",
        value: function classToTag(Class) {
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

    }, {
        key: "isRegisteredElement",
        value: function isRegisteredElement(name) {
            return document.createElement(name).constructor !== HTMLElement;
        }

        /**
         * Static helper method to take a web component class, create an element name and register the new element on the document.
         * @param Class
         * @returns {string}
         */

    }, {
        key: "create",
        value: function create(Class) {
            var name = RebelRouter.classToTag(Class);
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

    }, {
        key: "validElementTag",
        value: function validElementTag(tag) {
            return (/^[a-z0-9\-]+$/.test(tag)
            );
        }

        /**
         * Method used to register a callback to be called when the URL path changes.
         * @param callback
         */

    }, {
        key: "pathChange",
        value: function pathChange(callback) {
            if (RebelRouter.changeCallbacks === undefined) {
                RebelRouter.changeCallbacks = [];
            }
            RebelRouter.changeCallbacks.push(callback);
            var changeHandler = function changeHandler(event) {
                if (event.oldURL !== undefined && event.newURL != event.oldURL) {
                    RebelRouter.changeCallbacks.forEach(function (callback) {
                        callback(RebelRouter.isBack);
                    });
                    RebelRouter.isBack = false;
                }
            };
            if (window.onhashchange === null) {
                window.addEventListener("rblback", function () {
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

    }, {
        key: "getParamsFromUrl",
        value: function getParamsFromUrl(regex, route, path) {
            var result = RebelRouter.parseQueryString(path);
            var re = /{(\w+)}/g;
            var results = [];
            var match = undefined;
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

    }, {
        key: "getPathFromUrl",
        value: function getPathFromUrl() {
            var result = window.location.href.match(/#(.*)$/);
            if (result !== null) {
                return result[1];
            }
        }
    }]);

    return RebelRouter;
})();

/**
 * Represents a router template which is used as the prototype for each RebelRouter element registered.
 */

var RouterTemplate = (function (_HTMLElement) {
    _inherits(RouterTemplate, _HTMLElement);

    function RouterTemplate() {
        _classCallCheck(this, RouterTemplate);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RouterTemplate).apply(this, arguments));
    }

    _createClass(RouterTemplate, [{
        key: "init",

        /**
         * Initialisation method with some basic configuration.
         * @param config
         */
        value: function init(config) {
            this.initialised = false;
            this.config = RebelRouter.mergeConfig({
                "shadowRoot": false,
                "animation": false
            }, config);
        }

        /**
         * Function used to initialise the animation mechanics if animation is turned on
         */

    }, {
        key: "initAnimation",
        value: function initAnimation() {
            var _this2 = this;

            var observer = new MutationObserver(function (mutations) {
                var node = mutations[0].addedNodes[0];
                if (node !== undefined) {
                    (function () {
                        var otherChildren = _this2.getOtherChildren(node);
                        node.classList.add("rebel-animate");
                        node.classList.add("enter");
                        setTimeout(function () {
                            if (otherChildren.length > 0) {
                                otherChildren.forEach(function (child) {
                                    child.classList.add("exit");
                                    setTimeout(function () {
                                        child.classList.add("complete");
                                    }, 10);
                                });
                            }
                            setTimeout(function () {
                                node.classList.add("complete");
                            }, 10);
                        }, 10);
                        var animationEnd = function animationEnd(event) {
                            if (event.target.className.indexOf("exit") > -1) {
                                _this2.root.removeChild(event.target);
                            }
                        };
                        node.addEventListener("transitionend", animationEnd);
                        node.addEventListener("animationend", animationEnd);
                    })();
                }
            });
            observer.observe(this, { childList: true });
        }

        /**
         * Executed when the element has been added to the DOM, renders the templates and sets up the path change listener
         */

    }, {
        key: "attachedCallback",
        value: function attachedCallback() {
            var _this3 = this;

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
                RebelRouter.pathChange(function (isBack) {
                    if (_this3.config.animation === true) {
                        if (isBack === true) {
                            _this3.classList.add("rbl-back");
                        } else {
                            _this3.classList.remove("rbl-back");
                        }
                    }
                    _this3.render();
                });
                this.initialised = true;
            }
        }

        /**
         * Method used to get the current route object
         * @returns {*}
         */

    }, {
        key: "current",
        value: function current() {
            var path = RebelRouter.getPathFromUrl();
            for (var route in this.paths) {
                if (route !== "*") {
                    var regexString = "^" + route.replace(/{\w+}\/?/g, "(\\w+)\/?");
                    regexString += regexString.indexOf("\\/?") > -1 ? "" : "\\/?" + "([?=&-\/\\w+]+)?$";
                    var regex = new RegExp(regexString);
                    if (regex.test(path)) {
                        return _routeResult(this.paths[route], route, regex, path);
                    }
                }
            }
            return this.paths["*"] !== undefined ? _routeResult(this.paths["*"], "*", null, path) : null;
        }

        /**
         * Method called to render the current view
         */

    }, {
        key: "render",
        value: function render() {
            var result = this.current();
            if (result !== null) {
                if (result.templateName !== this.previousTemplate || this.config.animation === true) {
                    this.$template = document.createElement(result.templateName);
                    if (this.config.animation !== true) {
                        this.root.innerHTML = "";
                    }
                    this.root.appendChild(this.$template);
                    this.previousTemplate = result.templateName;
                }
                for (var key in result.params) {
                    var value = result.params[key];
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

    }, {
        key: "add",
        value: function add(path, ViewClass) {
            var _this4 = this;

            if (this.paths === undefined) {
                this.paths = {};
            }
            var name = RebelRouter.create(ViewClass);
            if (Array.isArray(path)) {
                path.forEach(function (item) {
                    _this4.paths[item] = name;
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

    }, {
        key: "setDefault",
        value: function setDefault(ViewClass) {
            return this.add("*", ViewClass);
        }

        /**
         *
         * @param node - Used with the animation mechanics to get all other view children except itself
         * @returns {Array}
         */

    }, {
        key: "getOtherChildren",
        value: function getOtherChildren(node) {
            var children = this.root.children;
            var results = [];
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child != node) {
                    results.push(child);
                }
            }
            return results;
        }
    }]);

    return RouterTemplate;
})(HTMLElement);

/**
 * Represents a view element used to embed a router in the DOM
 */

var RebelRouterInstance = (function (_HTMLElement2) {
    _inherits(RebelRouterInstance, _HTMLElement2);

    function RebelRouterInstance() {
        _classCallCheck(this, RebelRouterInstance);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelRouterInstance).apply(this, arguments));
    }

    _createClass(RebelRouterInstance, [{
        key: "attachedCallback",

        /**
         * Called when the element is added to the DOM.
         */
        value: function attachedCallback() {
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
    }]);

    return RebelRouterInstance;
})(HTMLElement);

document.registerElement("rebel-router", RebelRouterInstance);

/**
 * Represents the prototype for an anchor element which added functionality to perform a back transition.
 */

var RebelBackA = (function (_HTMLAnchorElement) {
    _inherits(RebelBackA, _HTMLAnchorElement);

    function RebelBackA() {
        _classCallCheck(this, RebelBackA);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelBackA).apply(this, arguments));
    }

    _createClass(RebelBackA, [{
        key: "attachedCallback",
        value: function attachedCallback() {
            var _this7 = this;

            this.addEventListener("click", function (event) {
                var path = _this7.getAttribute("href");
                event.preventDefault();
                if (path !== undefined) {
                    window.dispatchEvent(new CustomEvent('rblback'));
                }
                window.location.hash = path;
            });
        }
    }]);

    return RebelBackA;
})(HTMLAnchorElement);

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
    var result = {};
    result.templateName = templateName;
    result.route = route;
    result.path = path;
    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
    return result;
}
