"use strict";

System.register([], function (_export) {
    var _createClass, RebelRouter, RebelViewContainer, RebelView;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
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

            _export("RebelRouter", RebelRouter = (function () {
                function RebelRouter() {
                    var _this = this;

                    _classCallCheck(this, RebelRouter);

                    this.urls = {};

                    window.onhashchange = function (event) {
                        if (event.newURL != event.oldURL) {
                            if (_this.urls[event.newURL] !== undefined) {
                                _this.urls[event.newURL](RebelRouter.getPathFromUrl());
                            }
                        }
                    };
                }

                _createClass(RebelRouter, [{
                    key: "add",
                    value: function add(ViewClass) {
                        console.log("VIEW CLASS: ", ViewClass);
                    }
                }], [{
                    key: "getPathFromUrl",
                    value: function getPathFromUrl() {
                        var result = window.location.href.match(/#(.*)$/);

                        if (result !== null) {
                            return result[1];
                        }
                    }
                }]);

                return RebelRouter;
            })());

            _export("RebelRouter", RebelRouter);

            RebelViewContainer = (function (_HTMLElement) {
                _inherits(RebelViewContainer, _HTMLElement);

                function RebelViewContainer() {
                    _classCallCheck(this, RebelViewContainer);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelViewContainer).apply(this, arguments));
                }

                return RebelViewContainer;
            })(HTMLElement);

            _export("RebelView", RebelView = (function (_HTMLElement2) {
                _inherits(RebelView, _HTMLElement2);

                function RebelView(url, template) {
                    _classCallCheck(this, RebelView);

                    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(RebelView).call(this));

                    _this3.url = url;
                    _this3.template = template;
                    return _this3;
                }

                return RebelView;
            })(HTMLElement));

            _export("RebelView", RebelView);
        }
    };
});