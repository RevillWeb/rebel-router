/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _rebelRouter = __webpack_require__(1);

	var _home = __webpack_require__(2);

	var _about = __webpack_require__(3);

	var _contact = __webpack_require__(6);

	/**
	 * Created by Leon Revill on 03/03/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */


	var MainRouter = new _rebelRouter.RebelRouter("main-view", { "mode": "history" });
	MainRouter.add("/about", _about.AboutPage).add("/contact", _contact.ContactPage).setDefault(_home.HomePage);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 15/12/2015.
	 * Blog: http://www.jsinsights.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var _MODES = {
	    HISTORY: "history",
	    HASH: "hash"
	};

	function _routeResult(templateName, route, regex, path) {
	    var result = {};
	    result.templateName = templateName;
	    result.route = route;
	    result.path = path;
	    result.params = RebelRouter.getParamsFromUrl(regex, route, path);
	    return result;
	}

	var RouterTemplate = function (_HTMLTemplateElement) {
	    _inherits(RouterTemplate, _HTMLTemplateElement);

	    function RouterTemplate() {
	        _classCallCheck(this, RouterTemplate);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RouterTemplate).apply(this, arguments));
	    }

	    _createClass(RouterTemplate, [{
	        key: "init",
	        value: function init(config) {
	            this.initialised = false;
	            this.config = RebelRouter.mergeConfig({
	                "mode": _MODES.HASH,
	                "basePath": "/",
	                "shadowRoot": false
	            }, config);
	            switch (this.config.mode) {
	                case _MODES.HASH:
	                    this.mode = _MODES.HASH;
	                    break;
	                case _MODES.HISTORY:
	                    this.mode = _MODES.HISTORY;
	                    break;
	                default:
	                    throw new Error("Invalid mode specified in config, please specify either 'hash' or 'history' (default: 'history').");
	            }
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            if (this.initialised === false) {
	                if (this.config.shadowRoot === true) {
	                    this.createShadowRoot();
	                    this.root = this.shadowRoot;
	                } else {
	                    this.root = this;
	                }
	                this.render();
	                RebelRouter.pathChange(function (data) {
	                    _this2.render();
	                });
	                this.initialised = true;
	            }
	        }
	    }, {
	        key: "current",
	        value: function current() {
	            var path = this.getPathFromUrl();
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
	            console.log("RENDER!");
	            this.root.innerHTML = "";
	            var result = this.current();
	            if (result !== null) {
	                var $template = document.createElement(result.templateName);
	                $template.setAttribute("rbl-url-params", JSON.stringify(result.params));
	                this.root.appendChild($template);
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
	    }, {
	        key: "getPathFromUrl",
	        value: function getPathFromUrl() {
	            var result = null;
	            if (this.config.mode === _MODES.HISTORY) {
	                //var reg = new RegExp(this.config.basePath + "(.*)$");
	                return window.location.pathname; //"/" + window.location.pathname.match(reg);
	                //console.log("PATH NAME:", );?
	                //console.log("RESULT:", result);
	            } else {
	                    result = window.location.href.match(/#(.*)$/);
	                    if (result !== null) {
	                        return result[1];
	                    }
	                }
	        }
	    }]);

	    return RouterTemplate;
	}(HTMLTemplateElement);

	var RebelRouter = exports.RebelRouter = function () {
	    function RebelRouter(name, config) {
	        _classCallCheck(this, RebelRouter);

	        this.template = null;
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
	    }, {
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
	                Class.prototype.name = name;
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
	                if (event.oldURL !== undefined && event.newURL != event.oldURL || event.detail !== undefined && event.detail.path !== undefined) {
	                    var data = event.detail;
	                    RebelRouter.changeCallbacks.forEach(function (callback) {
	                        callback(data);
	                    });
	                }
	            };
	            window.onhashchange = changeHandler;
	            window.onpopstate = changeHandler;
	            window.addEventListener("pushstate", changeHandler);
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
	}();

	var RebelView = function (_HTMLTemplateElement2) {
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
	}(HTMLTemplateElement);

	document.registerElement("rebel-view", RebelView);

	var RebelHistory = function (_HTMLAnchorElement) {
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
	                    history.pushState(null, null, path);
	                    window.dispatchEvent(new CustomEvent('pushstate', { "detail": { "path": path } }));
	                }
	            });
	        }
	    }]);

	    return RebelHistory;
	}(HTMLAnchorElement);

	document.registerElement("rebel-history", {
	    extends: "a",
	    prototype: RebelHistory.prototype
	});

	window.onload = function () {
	    console.log("helllo");
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 07/03/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var HomePage = exports.HomePage = function (_HTMLElement) {
	    _inherits(HomePage, _HTMLElement);

	    function HomePage() {
	        _classCallCheck(this, HomePage);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(HomePage).apply(this, arguments));
	    }

	    _createClass(HomePage, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.template = "<p>This is the home page. <a href=\"/about\" is=\"rebel-history\">About</a> <a href=\"/contact\" is=\"rebel-history\">contact</a></p>";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this.render();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.shadowRoot.innerHTML = this.template;
	        }
	    }]);

	    return HomePage;
	}(HTMLElement);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AboutPage = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tab = __webpack_require__(4);

	var _tab2 = __webpack_require__(5);

	var _rebelRouter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var AboutPage = exports.AboutPage = function (_HTMLElement) {
	    _inherits(AboutPage, _HTMLElement);

	    function AboutPage() {
	        _classCallCheck(this, AboutPage);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AboutPage).apply(this, arguments));
	    }

	    _createClass(AboutPage, [{
	        key: 'createdCallback',
	        value: function createdCallback() {
	            this.template = '<div class="page-container">\n            <h2>About</h2>\n            <nav class="page-nav">\n                <a href="/about/tab1" is="rebel-history">Tab 1</a>\n                <a href="/about/tab2" is="rebel-history">Tab 2</a>\n            </nav>\n            <div class="content">\n                <rebel-view name="about-view"></rebel-view>\n            </div>\n        </div>';
	        }
	    }, {
	        key: 'attachedCallback',
	        value: function attachedCallback() {
	            var AboutRouter = new _rebelRouter.RebelRouter("about-view", { "mode": "history" });
	            AboutRouter.add("/about/tab2", _tab2.AboutTab2).setDefault(_tab.AboutTab1);
	            this.render();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.innerHTML = this.template;
	        }
	    }]);

	    return AboutPage;
	}(HTMLElement);

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 07/03/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var AboutTab1 = exports.AboutTab1 = function (_HTMLElement) {
	    _inherits(AboutTab1, _HTMLElement);

	    function AboutTab1() {
	        _classCallCheck(this, AboutTab1);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AboutTab1).apply(this, arguments));
	    }

	    _createClass(AboutTab1, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.template = "<p>Tab 1</p>";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this.render();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.innerHTML = this.template;
	        }
	    }]);

	    return AboutTab1;
	}(HTMLElement);

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 07/03/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var AboutTab2 = exports.AboutTab2 = function (_HTMLElement) {
	    _inherits(AboutTab2, _HTMLElement);

	    function AboutTab2() {
	        _classCallCheck(this, AboutTab2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AboutTab2).apply(this, arguments));
	    }

	    _createClass(AboutTab2, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.template = "<p>Tab 2</p>";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this.render();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.innerHTML = this.template;
	        }
	    }]);

	    return AboutTab2;
	}(HTMLElement);

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 07/03/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var ContactPage = exports.ContactPage = function (_HTMLElement) {
	    _inherits(ContactPage, _HTMLElement);

	    function ContactPage() {
	        _classCallCheck(this, ContactPage);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ContactPage).apply(this, arguments));
	    }

	    _createClass(ContactPage, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.template = "<p>This is the contact page. <a href=\"/\" is=\"rebel-history\">Home</a></p>";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            this.render();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.shadowRoot.innerHTML = this.template;
	        }
	    }]);

	    return ContactPage;
	}(HTMLElement);

/***/ }
/******/ ]);