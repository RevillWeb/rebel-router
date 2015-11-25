'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

System.register([], function (_export) {
    var _createClass, RebelRouter, RebelView, RebelTemplate;

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
        setters: [],
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
                    key: 'go',
                    value: function go() {
                        var $constructor = document.registerElement("rebel-view", RebelView);
                        var $view = new $constructor();
                        $view.paths = this.paths;
                        return $view;
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
                    key: 'render',
                    value: function render() {
                        var path = RebelRouter.getPathFromUrl();

                        if (this._paths[path] !== undefined) {
                            this.shadowRoot.innerHTML = "<" + this._paths[path] + "></" + this._paths[path] + ">";
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

            _export('RebelTemplate', RebelTemplate = (function (_HTMLElement2) {
                _inherits(RebelTemplate, _HTMLElement2);

                function RebelTemplate() {
                    _classCallCheck(this, RebelTemplate);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelTemplate).apply(this, arguments));
                }

                _createClass(RebelTemplate, [{
                    key: 'attachedCallback',
                    value: function attachedCallback() {
                        this.render();
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        this.createShadowRoot().innerHTML = this.template;
                    }
                }]);

                return RebelTemplate;
            })(HTMLElement));

            _export('RebelTemplate', RebelTemplate);
        }
    };
});