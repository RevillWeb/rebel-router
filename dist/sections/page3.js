"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

System.register([], function (_export) {
    var _createClass, Page3;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
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

            _export("Page3", Page3 = (function (_HTMLElement) {
                _inherits(Page3, _HTMLElement);

                function Page3() {
                    _classCallCheck(this, Page3);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page3).apply(this, arguments));
                }

                _createClass(Page3, [{
                    key: "createdCallback",
                    value: function createdCallback() {
                        this.createShadowRoot();
                        this.template = "<p>This is page three! Go to <a href=\"#/page1\">Page One</a>.</p>";
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
                }, {
                    key: "attributeChangedCallback",
                    value: function attributeChangedCallback(name, value) {
                        console.log("NAME: ", name);

                        switch (name) {
                            case "rebel-url-params":
                                console.log("VALUE: ", value);
                                break;
                        }
                    }
                }]);

                return Page3;
            })(HTMLElement));

            _export("Page3", Page3);
        }
    };
});