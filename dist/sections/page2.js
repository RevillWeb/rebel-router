"use strict";


System.register(["../lib/rebel-router.js"], function (_export) {
    var RebelView, Page2;

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
            _export("Page2", Page2 = (function (_RebelView) {
                _inherits(Page2, _RebelView);

                function Page2() {
                    _classCallCheck(this, Page2);

                    var template = "<p>This is page one.</p>";
                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page2).call(this, "/page1", template));
                }

                return Page2;
            })(RebelView));

            _export("Page2", Page2);
        }
    };
});