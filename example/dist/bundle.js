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

	var _people = __webpack_require__(4);

	var _starships = __webpack_require__(6);

	var _vehicles = __webpack_require__(10);

	var _species = __webpack_require__(11);

	var _planets = __webpack_require__(12);

	var _info = __webpack_require__(7);

	var _rebelRepeater = __webpack_require__(8);

	var _rebelLoading = __webpack_require__(9);

	//Configure the main app router with the main resource list page and the info page.
	var MainRouter = new _rebelRouter.RebelRouter("main-view"); /**
	                                                             * Created by Leon Revill on 03/03/16.
	                                                             * Blog: http://www.revilweb.com
	                                                             * GitHub: https://github.com/RevillWeb
	                                                             * Twitter: @RevillWeb
	                                                             */

	MainRouter.add("/info", _info.InfoPage).add("/resources/{resource}", _resourceList.ResourcesList).add("/resource/people/{id}", _people.PeopleResource).add("/resource/starships/{id}", _starships.StarshipsResource).add("/resource/vehicles/{id}", _vehicles.VehiclesResource).add("/resource/species/{id}", _species.SpeciesResource).add("/resource/planets/{id}", _planets.PlanetsResource).setDefault(_home.HomePage);

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
	            this.template = "<div class=\"home-container\">\n            <h2>REBEL ROUTER</h2>\n            <p>This simple demo application provides an example of Rebel Router in action, a router designed to make building ultra-modern web applications easy without the need for monolithic frameworks.</p>\n            <p>Simply make use of JavaScript modules and web components to easily write modular organised code that won't tie you in to a specific set of technologies.</p>\n            <h3>DEMO</h3>\n            <p>This demo makes use of the superb <a href=\"https://swapi.co/\" target=\"_blank\">Star Wars API</a> to provide a simple but real world use for the router. Navigate through the pages in the menu above and discover all kinds of things about the Star Wars universe you didn't know.</p>\n            <div class=\"controls\">\n                <a href=\"\" class=\"btn\"><span class=\"icon icon-github\"></span> Demo Source</a>\n                <a href=\"https://github.com/RevillWeb/rebel-router\" target=\"_blank\" class=\"btn\"><span class=\"icon icon-github\"></span> Rebel Router</a>\n            </div>\n        </div>";
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

	'use strict';

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
	        key: 'createdCallback',
	        value: function createdCallback() {
	            var _this2 = this;

	            this.baseUrl = "http://swapi.co/api/";
	            this.type = null;
	            this.page = 1;
	            this.response = null;
	            this.innerHTML = '\n            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>\n            <h1 id="title"></h1>\n            <ul class="resource-list">\n                <rbl-repeater id="list-row"></rbl-repeater>\n            </ul>\n            <div class="list-controls">\n                <button class="btn" id="previous"><span class="icon icon-arrow-left2"></span> Preview</button>\n                <div class="num" id="page-num">1</div>\n                <button class="btn" id="next">Next <span class="icon icon-arrow-right2"></span></button>\n            </div>\n        ';
	            this.$loader = this.querySelector('#loading');
	            this.$next = this.querySelector('#next');
	            this.$next.addEventListener("click", function () {
	                if (_this2.response.next !== null) {
	                    _this2.getData(ResourcesList.getPageNumber(_this2.response.next));
	                }
	            });
	            this.$previous = this.querySelector('#previous');
	            this.$previous.addEventListener("click", function () {
	                if (_this2.response.previous !== null) {
	                    _this2.getData(ResourcesList.getPageNumber(_this2.response.previous));
	                }
	            });
	            this.$pageNum = this.querySelector('#page-num');
	        }
	    }, {
	        key: 'attachedCallback',
	        value: function attachedCallback() {
	            var _this3 = this;

	            this.querySelector(".resource-list").addEventListener("click", function (event) {
	                var url = event.target.dataset.url;
	                if (url.substr(-1) === '/') {
	                    url = url.substr(0, url.length - 1);
	                }
	                var parts = url.split("/");
	                var id = parts[parts.length - 1];
	                window.location.hash = "/resource/" + _this3.type + "/" + id;
	            });
	            this.getData();
	        }
	    }, {
	        key: 'attributeChangedCallback',
	        value: function attributeChangedCallback(name) {
	            switch (name) {
	                case "resource":
	                    this.type = this.getAttribute("resource");
	                    this.getData();
	                    break;
	            }
	        }
	    }, {
	        key: 'getTypeIcon',
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
	        key: 'getData',
	        value: function getData(page) {
	            var _this4 = this;

	            if (this.type !== null) {
	                var $title = this.querySelector("#title");
	                $title.innerHTML = "<span class='icon " + this.getTypeIcon() + "'></span>" + this.type.charAt(0).toUpperCase() + this.type.slice(1);
	                var xhr = new XMLHttpRequest();
	                this.$loader.show();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4 && xhr.status == 200) {
	                        try {
	                            _this4.response = JSON.parse(xhr.response);
	                            _this4.render();
	                        } catch (e) {
	                            console.error("Couldn't parse API response:", e);
	                        }
	                    }
	                };
	                if (page !== undefined) {
	                    this.page = page;
	                }
	                xhr.open("GET", this.baseUrl + this.type + "?page=" + this.page);
	                xhr.send();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var $list = this.querySelector("#list-row");
	            if ($list !== null) {
	                $list.setTemplate('<li><a href="javascript:void(0)" class="resource-click" data-url="${url}">${name}</a></li>');
	                this.$next.className = this.$next.className.replace(" disabled", "");
	                if (this.response.next === null) {
	                    this.$next.className += " disabled";
	                }
	                this.$previous.className = this.$previous.className.replace(" disabled", "");
	                if (this.response.previous === null) {
	                    this.$previous.className += " disabled";
	                }
	                $list.setContent(this.response.results);
	                this.$pageNum.innerHTML = this.page;
	                this.$loader.hide();
	            }
	        }
	    }], [{
	        key: 'getPageNumber',
	        value: function getPageNumber(url) {
	            return url.split("?")[1].split("=")[1];
	        }
	    }]);

	    return ResourcesList;
	}(HTMLElement);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PeopleResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(5);

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
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.type = "people";
	            this.renderChild = function () {
	                _this2.$stats.innerHTML = PeopleResource.renderTemplate(_this2.data);
	            };
	        }
	    }], [{
	        key: "renderTemplate",
	        value: function renderTemplate(data) {
	            var genderIcon = "transgender-alt";
	            if (data.gender == "male") {
	                genderIcon = "male";
	            } else if (data.gender == "female") {
	                genderIcon = "female";
	            }
	            return "\n            <div class=\"stats-section\">\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-" + genderIcon + "\"></span></label> <span>" + data.gender + "</span></p>\n                </div>\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-calendar5\"></span></label> " + data.birth_year + "</p>\n                </div>\n            </div>\n            <div class=\"stats-section\">\n                <div class=\"section build\">\n                    <p><label>Height:</label> " + data.height + "</p>\n                    <span class=\"icon icon-man\"></span>\n                    <p><label>Mass:</label> " + data.mass + "</p>\n                </div>\n                <div class=\"section\">\n                    <p><label>Eye Colour:</label> " + data.eye_color + "</p>\n                    <p><label>Hair Colour:</label> " + data.hair_color + "</p>\n                    <p><label>Skin Colour:</label> " + data.skin_color + "</p>\n                </div>\n            </div>";
	        }
	    }]);

	    return PeopleResource;
	}(_resourceItem.ResourceItem);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

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
	        key: 'createdCallback',
	        value: function createdCallback() {
	            this.baseUrl = "http://swapi.co/api/";
	            this.id = null;
	            this.type = null;
	            this.renderChild = null;
	            this.data = {};
	            this.innerHTML = '\n            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>\n            <a href="#" id="back-btn"><span class="icon icon-arrow-left2"></span> Back</a>\n            <h1 id="title"></h1>\n            <div id="stats"></div>\n        ';
	            this.$loader = this.querySelector('#loading');
	            this.$stats = this.querySelector('#stats');
	        }
	    }, {
	        key: 'attributeChangedCallback',
	        value: function attributeChangedCallback(name) {
	            var value = this.getAttribute(name);
	            switch (name) {
	                case "id":
	                    this.id = value;
	                    this.getData();
	                    break;
	            }
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var _this2 = this;

	            this.$loader.show();
	            if (this.id !== null && this.type !== null) {
	                var xhr;

	                (function () {
	                    var $title = _this2.querySelector("#title");
	                    var $back = _this2.querySelector("#back-btn");
	                    $back.setAttribute("href", "#/resources/" + _this2.type);
	                    xhr = new XMLHttpRequest();

	                    xhr.onreadystatechange = function () {
	                        if (xhr.readyState == 4 && xhr.status == 200) {
	                            try {
	                                var json = JSON.parse(xhr.response);
	                                $title.innerHTML = json.name;
	                                _this2.data = json;
	                                if (_this2.renderChild !== null) {
	                                    _this2.renderChild();
	                                }
	                                _this2.$loader.hide();
	                                $back.className = "back-btn show";
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StarshipsResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var StarshipsResource = exports.StarshipsResource = function (_ResourceItem) {
	    _inherits(StarshipsResource, _ResourceItem);

	    function StarshipsResource() {
	        _classCallCheck(this, StarshipsResource);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(StarshipsResource).apply(this, arguments));
	    }

	    _createClass(StarshipsResource, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.type = "starships";
	            this.renderChild = function () {
	                _this2.$stats.innerHTML = StarshipsResource.renderTemplate(_this2.data);
	            };
	        }
	    }], [{
	        key: "renderTemplate",
	        value: function renderTemplate(data) {
	            return "\n            <div class=\"stats-section\">\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-coins\"></span></label> <span>" + data.cost_in_credits + "</span></p>\n                </div>\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-shield4\"></span></label> " + data.starship_class + "</p>\n                </div>\n            </div>\n            <div class=\"stats-section\">\n                <div class=\"section build\">\n                    <p><label>Length:</label> " + data.length + "</p>\n                    <span class=\"icon icon-rocket\"></span>\n                    <p><label>Cargo Capacity:</label> " + data.cargo_capacity + "</p>\n                    <p><label>Passengers:</label> " + data.passengers + "</p>\n                </div>\n                <div class=\"section\">\n                    <p><label>Model:</label> " + data.model + "</p>\n                    <p><label>Crew:</label> " + data.crew + "</p>\n                    <p><label>Hyperdrive Rating:</label> " + data.hyperdrive_rating + "</p>\n                    <p><label>Manufacturer:</label> <br />" + data.manufacturer + "</p>\n                </div>\n            </div>";
	        }
	    }]);

	    return StarshipsResource;
	}(_resourceItem.ResourceItem);

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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.VehiclesResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var VehiclesResource = exports.VehiclesResource = function (_ResourceItem) {
	    _inherits(VehiclesResource, _ResourceItem);

	    function VehiclesResource() {
	        _classCallCheck(this, VehiclesResource);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(VehiclesResource).apply(this, arguments));
	    }

	    _createClass(VehiclesResource, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.type = "vehicles";
	            this.renderChild = function () {
	                _this2.$stats.innerHTML = VehiclesResource.renderTemplate(_this2.data);
	            };
	        }
	    }], [{
	        key: "renderTemplate",
	        value: function renderTemplate(data) {
	            return "\n            <div class=\"stats-section\">\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-coins\"></span></label> <span>" + data.cost_in_credits + "</span></p>\n                </div>\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-shield4\"></span></label> " + data.vehicle_class + "</p>\n                </div>\n            </div>\n            <div class=\"stats-section\">\n                <div class=\"section build\">\n                    <p><label>Length:</label> " + data.length + "</p>\n                    <span class=\"icon icon-truck\"></span>\n                    <p><label>Cargo Capacity:</label> " + data.cargo_capacity + "</p>\n                    <p><label>Passengers:</label> " + data.passengers + "</p>\n                </div>\n                <div class=\"section\">\n                    <p><label>Model:</label> " + data.model + "</p>\n                    <p><label>Crew:</label> " + data.crew + "</p>\n                    <p><label>Manufacturer:</label> <br />" + data.manufacturer + "</p>\n                </div>\n            </div>";
	        }
	    }]);

	    return VehiclesResource;
	}(_resourceItem.ResourceItem);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SpeciesResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var SpeciesResource = exports.SpeciesResource = function (_ResourceItem) {
	    _inherits(SpeciesResource, _ResourceItem);

	    function SpeciesResource() {
	        _classCallCheck(this, SpeciesResource);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SpeciesResource).apply(this, arguments));
	    }

	    _createClass(SpeciesResource, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.type = "species";
	            this.renderChild = function () {
	                _this2.$stats.innerHTML = SpeciesResource.renderTemplate(_this2.data);
	            };
	        }
	    }], [{
	        key: "renderTemplate",
	        value: function renderTemplate(data) {
	            return "\n            <div class=\"stats-section\">\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-lips\"></span></label> <span>" + data.language + "</span></p>\n                </div>\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-calendar5\"></span></label> " + data.average_lifespan + "</p>\n                </div>\n            </div>\n            <div class=\"stats-section\">\n                <div class=\"section build\">\n                    <p><label>Av. Height:</label> " + data.average_height + "</p>\n                    <span class=\"icon icon-man\"></span>\n                    <p><label>Classification:</label> " + data.classification + "</p>\n                </div>\n                <div class=\"section\">\n                    <p><label>Eye Colours:</label> " + data.eye_colors + "</p>\n                    <p><label>Hair Colours:</label> " + data.hair_colors + "</p>\n                    <p><label>Skin Colours:</label> " + data.skin_colors + "</p>\n                </div>\n            </div>";
	        }
	    }]);

	    return SpeciesResource;
	}(_resourceItem.ResourceItem);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PlanetsResource = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _resourceItem = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Leon Revill on 07/03/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Blog: http://www.revilweb.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GitHub: https://github.com/RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Twitter: @RevillWeb
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var PlanetsResource = exports.PlanetsResource = function (_ResourceItem) {
	    _inherits(PlanetsResource, _ResourceItem);

	    function PlanetsResource() {
	        _classCallCheck(this, PlanetsResource);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanetsResource).apply(this, arguments));
	    }

	    _createClass(PlanetsResource, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.type = "planets";
	            this.renderChild = function () {
	                _this2.$stats.innerHTML = PlanetsResource.renderTemplate(_this2.data);
	            };
	        }
	    }], [{
	        key: "renderTemplate",
	        value: function renderTemplate(data) {
	            return "\n            <div class=\"stats-section\">\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-arrow-down16\"></span></label> <span>" + data.gravity + "</span></p>\n                </div>\n                <div class=\"section\">\n                    <p><label><span class=\"icon icon-tree\"></span></label> " + data.terrain + "</p>\n                </div>\n            </div>\n            <div class=\"stats-section\">\n                <div class=\"section build\">\n                    <p><label>Diameter:</label> " + data.diameter + "</p>\n                    <span class=\"icon icon-planet2\"></span>\n                    <p><label>Climate:</label> " + data.climate + "</p>\n\n                </div>\n                <div class=\"section\">\n                <p><label>Population:</label> " + data.population + "</p>\n                    <p><label>Surface Water:</label> " + data.surface_water + "</p>\n                    <p><label>Orbital Period:</label> " + data.orbital_period + "</p>\n                    <p><label>Rotation Period:</label> " + data.rotation_period + "</p>\n                </div>\n            </div>";
	        }
	    }]);

	    return PlanetsResource;
	}(_resourceItem.ResourceItem);

/***/ }
/******/ ]);