"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Leon Revill on 15/12/2015.
 * Blog: http://www.jsinsights.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

function _routeResult(templateName, route, regex, path) {
    var result = {};
    result.templateName = templateName;
    result.route = route;
    result.path = path;
    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
    return result;
}

var RouterTemplate = (function (_HTMLTemplateElement) {
    _inherits(RouterTemplate, _HTMLTemplateElement);

    function RouterTemplate() {
        _classCallCheck(this, RouterTemplate);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RouterTemplate).apply(this, arguments));
    }

    _createClass(RouterTemplate, [{
        key: "attachedCallback",
        value: function attachedCallback() {
            var _this2 = this;

            this.createShadowRoot();
            this.render();
            RebelRouter.pathChange(function () {
                _this2.render();
            });
        }
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
    }, {
        key: "render",
        value: function render() {
            this.shadowRoot.innerHTML = "";
            var result = this.current();
            if (result !== null) {
                var $template = document.createElement(result.templateName);
                $template.setAttribute("rbl-url-params", JSON.stringify(result.params));
                this.shadowRoot.appendChild($template);
            }
        }
    }, {
        key: "add",
        value: function add(path, ViewClass) {
            var _this3 = this;

            if (this.paths === undefined) {
                this.paths = {};
            }
            var name = RebelRouter.create(ViewClass);
            if (Array.isArray(path)) {
                path.forEach(function (item) {
                    _this3.paths[item] = name;
                });
            } else {
                this.paths[path] = name;
            }
            return this;
        }
    }, {
        key: "setDefault",
        value: function setDefault(ViewClass) {
            return this.add("*", ViewClass);
        }
    }]);

    return RouterTemplate;
})(HTMLTemplateElement);

var RebelRouter = exports.RebelRouter = (function () {
    function RebelRouter(name, config) {
        _classCallCheck(this, RebelRouter);

        this.template = null;
        if (RebelRouter.validElementTag(name) === false) {
            throw new Error("Invalid tag name provided.");
        }
        if (RebelRouter.isRegisteredElement(name) === false) {
            var tag = document.registerElement(name, RouterTemplate);
            var instance = new tag();
            RebelRouter.addView(name, instance);
            return instance;
        }
    }

    _createClass(RebelRouter, null, [{
        key: "addView",
        value: function addView(name, classInstance) {
            if (RebelRouter._views === undefined) {
                RebelRouter._views = {};
            }
            RebelRouter._views[name] = classInstance;
        }
    }, {
        key: "getView",
        value: function getView(name) {
            return RebelRouter._views !== undefined ? RebelRouter._views[name] : undefined;
        }
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
    }, {
        key: "classToTag",
        value: function classToTag(Class) {
            var name = Class.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
            if (RebelRouter.validElementTag(name) === false) {
                throw new Error("Class name couldn't be translated to tag.");
            }
            return name;
        }
    }, {
        key: "isRegisteredElement",
        value: function isRegisteredElement(name) {
            return document.createElement(name).constructor !== HTMLElement;
        }
    }, {
        key: "create",
        value: function create(Class) {
            var name = RebelRouter.classToTag(Class);
            if (RebelRouter.isRegisteredElement(name) === false) {
                document.registerElement(name, Class);
            }
            return name;
        }
    }, {
        key: "validElementTag",
        value: function validElementTag(tag) {
            return (/^[a-z0-9\-]+$/.test(tag)
            );
        }
    }, {
        key: "pathChange",
        value: function pathChange(callback) {
            if (RebelRouter.changeCallbacks === undefined) {
                RebelRouter.changeCallbacks = [];
            }
            RebelRouter.changeCallbacks.push(callback);
            var changeHandler = function changeHandler(event) {
                console.log("EVENT:", event);
                if (event.newURL != event.oldURL) {
                    RebelRouter.changeCallbacks.forEach(function (callback) {
                        callback();
                    });
                }
            };
            window.onhashchange = changeHandler;
            window.onpopstate = changeHandler;
            window.addEventListener("pushstate", changeHandler);
        }
    }, {
        key: "getPathFromUrl",
        value: function getPathFromUrl() {
            var result = window.location.href.match(/#(.*)$/);
            if (result !== null) {
                return result[1];
            }
        }
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
    }]);

    return RebelRouter;
})();

var RebelView = (function (_HTMLTemplateElement2) {
    _inherits(RebelView, _HTMLTemplateElement2);

    function RebelView() {
        _classCallCheck(this, RebelView);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelView).apply(this, arguments));
    }

    _createClass(RebelView, [{
        key: "attachedCallback",
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

    return RebelView;
})(HTMLTemplateElement);

document.registerElement("rebel-view", RebelView);

var RebelHistory = (function (_HTMLAnchorElement) {
    _inherits(RebelHistory, _HTMLAnchorElement);

    function RebelHistory() {
        _classCallCheck(this, RebelHistory);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelHistory).apply(this, arguments));
    }

    _createClass(RebelHistory, [{
        key: "attachedCallback",
        value: function attachedCallback() {
            this.addEventListener("click", function (event) {
                event.preventDefault();
                var path = this.getAttribute("href");
                if (path !== undefined) {
                    var target = this.getAttribute("target");
                    window.dispatchEvent(new CustomEvent('pushstate', { "detail": { "path": path, "target": target } }));
                }
            });
        }
    }]);

    return RebelHistory;
})(HTMLAnchorElement);

document.registerElement("rebel-history", {
    extends: "a",
    prototype: RebelHistory.prototype
});
