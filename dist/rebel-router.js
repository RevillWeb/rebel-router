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

var RebelRouter = exports.RebelRouter = (function (_HTMLElement) {
    _inherits(RebelRouter, _HTMLElement);

    function RebelRouter() {
        _classCallCheck(this, RebelRouter);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelRouter).apply(this, arguments));
    }

    _createClass(RebelRouter, [{
        key: "attachedCallback",
        value: function attachedCallback() {
            var _this2 = this;

            this.createShadowRoot();
            this.render();
            RebelRouter.hashChange(function () {
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
        }
    }, {
        key: "setDefault",
        value: function setDefault(ViewClass) {
            this.add("*", ViewClass);
        }
    }], [{
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
            if (validElementTag(name) === false) {
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
        key: "hashChange",
        value: function hashChange(callback) {
            if (RebelRouter.changeCallbacks === undefined) {
                RebelRouter.changeCallbacks = [];
            }
            RebelRouter.changeCallbacks.push(callback);
            window.onhashchange = function (event) {
                if (event.newURL != event.oldURL) {
                    RebelRouter.changeCallbacks.forEach(function (callback) {
                        callback();
                    });
                }
            };
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
})(HTMLElement);
