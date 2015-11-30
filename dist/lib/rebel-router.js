'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

System.register(['../lib/rebel-core.js'], function (_export) {
    var RebelCore, _createClass, RebelRouter, RebelView;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_libRebelCoreJs) {
            RebelCore = _libRebelCoreJs;
        }],
        execute: function () {
            _createClass = (function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            _export('RebelRouter', RebelRouter = (function () {
                function RebelRouter() {
                    _classCallCheck(this, RebelRouter);

                    this.paths = {};
                    return this;
                }

                _createClass(RebelRouter, [{
                    key: 'add',
                    value: function add(path, ViewClass) {
                        var name = ViewClass.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
                        document.registerElement(name, ViewClass);
                        this.paths[path] = name;
                        return this;
                    }
                }, {
                    key: 'create',
                    value: function create(name) {
                        name = name.toLowerCase();

                        if (RebelCore.validElementTag(name) === true) {
                            var $constructor = document.registerElement(name, RebelView);
                            var $view = new $constructor();
                            $view.paths = this.paths;
                            return $view;
                        } else {
                            throw new Error("Invalid router name provided");
                        }
                    }
                }], [{
                    key: 'getPathFromUrl',
                    value: function getPathFromUrl() {
                        var result = window.location.href.match(/#(.*)$/);

                        if (result !== null) {
                            return result[1];
                        }
                    }
                }]);

                return RebelRouter;
            })());

            _export('RebelRouter', RebelRouter);

            RebelView = (function (_HTMLElement) {
                _inherits(RebelView, _HTMLElement);

                function RebelView() {
                    _classCallCheck(this, RebelView);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelView).apply(this, arguments));
                }

                _createClass(RebelView, [{
                    key: 'createdCallback',
                    value: function createdCallback() {
                        this.createShadowRoot();
                    }
                }, {
                    key: 'attachedCallback',
                    value: function attachedCallback() {
                        var _this2 = this;

                        this.render();

                        window.onhashchange = function (event) {
                            if (event.newURL != event.oldURL) {
                                _this2.render();
                            }
                        };
                    }
                }, {
                    key: 'currentTemplate',
                    value: function currentTemplate() {
                        var path = RebelRouter.getPathFromUrl();

                        for (var key in this._paths) {
                            console.log(key);
                            var regexString = key.replace(/{.*}\/?/, "[^\/]+/?") + "$";
                            console.log(regexString);
                            var regex = new RegExp(regexString);

                            if (regex.test(path)) {
                                return this._paths[key];
                            }
                        }

                        return false;
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        this.shadowRoot.innerHTML = "";
                        var templateName = this.currentTemplate();

                        if (templateName !== false) {
                            var $template = document.createElement(templateName);
                            $template.setAttribute("rebel-url-params", JSON.stringify({
                                "test": 123
                            }));
                            this.shadowRoot.appendChild($template);
                        }
                    }
                }, {
                    key: 'paths',
                    set: function set(value) {
                        this._paths = value;
                    }
                }]);

                return RebelView;
            })(HTMLElement);
        }
    };
});