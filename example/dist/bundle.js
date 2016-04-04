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

	var _resourceList = __webpack_require__(3);

	var _people = __webpack_require__(9);

	var _info = __webpack_require__(5);

	var _rebelRepeater = __webpack_require__(6);

	var _rebelLoading = __webpack_require__(7);

	//Configure the main app router with the main resource list page and the info page.
	var MainRouter = new _rebelRouter.RebelRouter("main-view"); /**
	                                                             * Created by Leon Revill on 03/03/16.
	                                                             * Blog: http://www.revilweb.com
	                                                             * GitHub: https://github.com/RevillWeb
	                                                             * Twitter: @RevillWeb
	                                                             */

	MainRouter.add("/info", _info.InfoPage).add("/resources/{resource}", _resourceList.ResourcesList).add("/resource/people/{id}", _people.PeopleResource).setDefault(_home.HomePage);

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
	                "shadowRoot": false
	            }, config);
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
	                RebelRouter.pathChange(function () {
	                    _this2.render();
	                });
	                this.initialised = true;
	            }
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
	            var result = this.current();
	            if (result !== null) {
	                //let $template = null;
	                if (result.templateName !== this.previousTemplate) {
	                    this.root.innerHTML = "";
	                    this.$template = document.createElement(result.templateName);
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
	            this.template = "<p>This is the home page.</p>";
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

	    return HomePage;
	}(HTMLElement);

/***/ },
/* 3 */
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

	var ResourcesList = exports.ResourcesList = function (_HTMLElement) {
	    _inherits(ResourcesList, _HTMLElement);

	    function ResourcesList() {
	        _classCallCheck(this, ResourcesList);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResourcesList).apply(this, arguments));
	    }

	    _createClass(ResourcesList, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.baseUrl = "http://swapi.co/api/";
	            this.type = null;
	            this.innerHTML = "\n            <rbl-loading id=\"loading\" color=\"#ff6\" background-color=\"#000\"></rbl-loading>\n            <h1 id=\"title\"></h1>\n            <ul class=\"resource-list\">\n                <rbl-repeater id=\"list-row\"></rbl-repeater>\n            </ul>\n        ";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.querySelector(".resource-list").addEventListener("click", function (event) {
	                var url = event.target.dataset.url;
	                if (url.substr(-1) === '/') {
	                    url = url.substr(0, url.length - 1);
	                }
	                var parts = url.split("/");
	                var id = parts[parts.length - 1];
	                window.location.hash = "/resource/" + _this2.type + "/" + id;
	            });
	            this.render();
	        }
	    }, {
	        key: "attributeChangedCallback",
	        value: function attributeChangedCallback(name) {
	            switch (name) {
	                case "resource":
	                    this.type = this.getAttribute("resource");
	                    this.render();
	                    break;
	            }
	        }
	    }, {
	        key: "getTypeIcon",
	        value: function getTypeIcon() {
	            switch (this.type) {
	                case "people":
	                    return "icon-user5";
	                    break;
	                case "starships":
	                    return "icon-rocket";
	                    break;
	                case "vehicles":
	                    return "icon-truck";
	                    break;
	                case "species":
	                    return "icon-eye";
	                    break;
	                case "planets":
	                    return "icon-planet2";
	                    break;
	                default:
	                    return "";
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            if (this.type !== null) {
	                var xhr;

	                (function () {
	                    var $title = _this3.querySelector("#title");
	                    $title.innerHTML = "<span class='icon " + _this3.getTypeIcon() + "'></span>" + _this3.type.charAt(0).toUpperCase() + _this3.type.slice(1);
	                    xhr = new XMLHttpRequest();

	                    var $loader = _this3.querySelector('#loading');
	                    $loader.show();
	                    xhr.onreadystatechange = function () {
	                        if (xhr.readyState == 4 && xhr.status == 200) {
	                            try {
	                                var json = JSON.parse(xhr.response);
	                                if (json.results !== undefined && json.results.length > 0) {
	                                    var $list = _this3.querySelector("#list-row");
	                                    if ($list !== null) {
	                                        $list.setTemplate('<li><a href="javascript:void(0)" class="resource-click" data-url="${url}">${name}</a></li>');
	                                        $list.setContent(json.results);
	                                        $loader.hide();
	                                    }
	                                }
	                            } catch (e) {
	                                console.error("Couldn't parse API response:", e);
	                            }
	                        }
	                    };
	                    xhr.open("GET", _this3.baseUrl + _this3.type);
	                    xhr.send();
	                })();
	            }
	        }
	    }]);

	    return ResourcesList;
	}(HTMLElement);

/***/ },
/* 4 */,
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

	var InfoPage = exports.InfoPage = function (_HTMLElement) {
	    _inherits(InfoPage, _HTMLElement);

	    function InfoPage() {
	        _classCallCheck(this, InfoPage);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(InfoPage).apply(this, arguments));
	    }

	    _createClass(InfoPage, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.template = "<p>This is the contact page. <a href=\"#/\">Home</a></p>";
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

	    return InfoPage;
	}(HTMLElement);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 10/01/2016.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var RblRepeater = exports.RblRepeater = function (_HTMLElement) {
	    _inherits(RblRepeater, _HTMLElement);

	    function RblRepeater() {
	        _classCallCheck(this, RblRepeater);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RblRepeater).apply(this, arguments));
	    }

	    _createClass(RblRepeater, [{
	        key: 'createdCallback',
	        value: function createdCallback() {
	            this.content = [];
	            this.template = this.innerHTML;
	            if (this.getAttribute('shadow') == "true") {
	                this.createShadowRoot();
	            }
	        }
	    }, {
	        key: 'attachedCallback',
	        value: function attachedCallback() {

	            this.render();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var element = this.getAttribute('element');
	            var html = element !== null ? "<" + element.toLowerCase() + ">" : "";
	            if (Array.isArray(this.content)) {
	                this.content.forEach(function (item) {
	                    html += RblRepeater.interpolate(_this2.template, item);
	                });
	            } else {
	                throw new Error("Content should be an Array of objects.");
	            }
	            html += element !== null ? "</" + element.toLowerCase() + ">" : "";
	            if (this.getAttribute('shadow') == "true") {
	                this.shadowRoot.innerHTML = html;
	                this.innerHTML = "";
	            } else {
	                this.innerHTML = html;
	            }
	        }
	    }, {
	        key: 'setContent',
	        value: function setContent(content) {
	            this.content = content;
	            this.render();
	        }
	    }, {
	        key: 'setTemplate',
	        value: function setTemplate(template) {
	            this.template = template;
	            this.render();
	        }
	    }, {
	        key: 'attributeChangedCallback',
	        value: function attributeChangedCallback(name) {
	            switch (name) {
	                case "content":
	                    this.content = RblRepeater.fromJson(this.getAttribute('content'));
	                    this.render();
	                    break;
	            }
	        }
	    }], [{
	        key: 'interpolate',
	        value: function interpolate(template, obj) {
	            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object") {
	                for (var key in obj) {
	                    var find = "${" + key + "}";
	                    if (template.indexOf(find) > -1) {
	                        template = template.replace(find, obj[key]);
	                        delete obj[key];
	                    }
	                }
	            }
	            return template;
	        }
	    }, {
	        key: 'fromJson',
	        value: function fromJson(str) {
	            var obj = null;
	            if (typeof str == "string") {
	                try {
	                    obj = JSON.parse(str);
	                } catch (e) {
	                    throw new Error("Invalid JSON string provided. ");
	                }
	            }
	            return obj;
	        }
	    }]);

	    return RblRepeater;
	}(HTMLElement);

	document.registerElement("rbl-repeater", RblRepeater);

/***/ },
/* 7 */
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

	var RblLoading = exports.RblLoading = function (_HTMLElement) {
	    _inherits(RblLoading, _HTMLElement);

	    function RblLoading() {
	        _classCallCheck(this, RblLoading);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RblLoading).apply(this, arguments));
	    }

	    _createClass(RblLoading, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.backgroundColor = this.getAttribute("background-color") || "#FFF";
	            this.color = this.getAttribute("color") || "#000";
	            this.shadowRoot.innerHTML = "\n            <style>\n                .loader {\n                    position: absolute;\n                    background-color: " + this.backgroundColor + ";\n                    top: 0;\n                    bottom: 0;\n                    width: 100%;\n                    color: " + this.color + ";\n                    display: flex;\n                    flex-direction: column;\n                    justify-content: center;\n                    align-items: center;\n                    font-size: 32px;\n                }\n                .loader.hidden {\n                    display: none;\n                }\n                .spinner {\n                    width: 40px;\n                    height: 40px;\n                    margin: 100px auto;\n                    background-color: " + this.color + ";\n                    border-radius: 100%;\n                    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n                    animation: sk-scaleout 1.0s infinite ease-in-out;\n                }\n\n                @-webkit-keyframes sk-scaleout {\n                    0% { -webkit-transform: scale(0) }\n                    100% {\n                        -webkit-transform: scale(1.0);\n                        opacity: 0;\n                    }\n                }\n\n                @keyframes sk-scaleout {\n                    0% {\n                        -webkit-transform: scale(0);\n                        transform: scale(0);\n                    } 100% {\n                        -webkit-transform: scale(1.0);\n                        transform: scale(1.0);\n                        opacity: 0;\n                    }\n                }\n            </style>\n            <div class=\"loader hidden\">\n                <div class=\"spinner\"></div>\n            </div>\n        ";
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this.shadowRoot.querySelector(".loader").className = "loader";
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            this.shadowRoot.querySelector('.loader').className = "loader hidden";
	        }
	    }]);

	    return RblLoading;
	}(HTMLElement);

	document.registerElement('rbl-loading', RblLoading);

/***/ },
/* 8 */
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

	var ResourceItem = exports.ResourceItem = function (_HTMLElement) {
	    _inherits(ResourceItem, _HTMLElement);

	    function ResourceItem() {
	        _classCallCheck(this, ResourceItem);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResourceItem).apply(this, arguments));
	    }

	    _createClass(ResourceItem, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.baseUrl = "http://swapi.co/api/";
	            this.id = null;
	            this.type = null;
	            this.data = null;
	            this.innerHTML = "\n            <rbl-loading id=\"loading\" color=\"#ff6\" background-color=\"#000\"></rbl-loading>\n            <h1 id=\"title\"></h1>\n        ";
	            this.$loader = this.querySelector('#loading');
	        }
	    }, {
	        key: "attributeChangedCallback",
	        value: function attributeChangedCallback(name) {
	            var value = this.getAttribute(name);
	            switch (name) {
	                case "id":
	                    this.id = value;
	                    this.render();
	                    break;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            console.log("TYPE:", this.type);
	            this.$loader.show();
	            if (this.id !== null && this.type !== null) {
	                var xhr;

	                (function () {
	                    var $title = _this2.querySelector("#title");
	                    xhr = new XMLHttpRequest();

	                    xhr.onreadystatechange = function () {
	                        if (xhr.readyState == 4 && xhr.status == 200) {
	                            try {
	                                var json = JSON.parse(xhr.response);
	                                $title.innerHTML = json.name;
	                                _this2.data = json;
	                                console.log("DATA:", _this2.data);
	                                _this2.$loader.hide();
	                            } catch (e) {
	                                console.error("Couldn't parse API response:", e);
	                            }
	                        }
	                    };
	                    xhr.open("GET", _this2.baseUrl + _this2.type + "/" + _this2.id);
	                    xhr.send();
	                })();
	            }
	        }
	    }]);

	    return ResourceItem;
	}(HTMLElement);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PeopleResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var PeopleResource = exports.PeopleResource = function (_ResourceItem) {
	    _inherits(PeopleResource, _ResourceItem);

	    function PeopleResource() {
	        _classCallCheck(this, PeopleResource);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PeopleResource).apply(this, arguments));
	    }

	    _createClass(PeopleResource, [{
	        key: "attachedCallback",

	        //createdCallback() {
	        //    super.createdCallback();
	        //
	        //}
	        value: function attachedCallback() {
	            this.type = "people";
	            //super.render();
	        }
	        //attributeChangedCallback(name) {
	        //    const value = this.getAttribute(name);
	        //    switch (name) {
	        //        case "type":
	        //            this.type = value;
	        //            super.render();
	        //            break;
	        //    }
	        //}
	        //attributeChangedCallback(name) {
	        //    //switch (name) {
	        //    //    case "rbl-url-params":
	        //    //        try {
	        //    //            var params = JSON.parse(this.getAttribute(name));
	        //    //            this.id = params.id || null;
	        //    //            this.type = params.type || null;
	        //    //        } catch (e) {
	        //    //            console.log("Couldn't parse params.");
	        //    //        }
	        //    //        this.render();
	        //    //        break;
	        //    //}
	        //}
	        //render() {
	        //    this.$loader.show();
	        //    if (this.id !== null && this.type !== null) {
	        //        let $title = this.querySelector("#title");
	        //        var xhr = new XMLHttpRequest();
	        //        xhr.onreadystatechange = () => {
	        //            if (xhr.readyState == 4 && xhr.status == 200) {
	        //                try {
	        //                    const json = JSON.parse(xhr.response);
	        //                    $title.innerHTML = json.name;
	        //                    this.data = json;
	        //                    console.log("DATA:", this.data);
	        //                    this.$loader.hide();
	        //                } catch (e) {
	        //                    console.error("Couldn't parse API response:", e);
	        //                }
	        //            }
	        //        };
	        //        xhr.open("GET", this.baseUrl + this.type + "/" + this.id);
	        //        xhr.send();
	        //    }
	        //}

	    }]);

	    return PeopleResource;
	}(_resourceItem.ResourceItem);

/***/ }
/******/ ]);