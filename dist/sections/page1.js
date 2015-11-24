"use strict";


System.register(["../lib/rebel-router.js"], function (_export) {
    var RebelView, _createClass, Page1;

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
        setters: [function (_libRebelRouterJs) {
            RebelView = _libRebelRouterJs.RebelView;
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

            _export("Page1", Page1 = (function (_RebelView) {
                _inherits(Page1, _RebelView);

                function Page1() {
                    _classCallCheck(this, Page1);

                    var template = "<p>This is page one.</p>";
                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page1).call(this, "/page1", template));
                }

                _createClass(Page1, [{
                    key: "attachedCallback",
                    value: function attachedCallback() {}
                }]);

                return Page1;
            })(RebelView));

            _export("Page1", Page1);
        }
    };
});