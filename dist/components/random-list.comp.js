"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

System.register(["../lib/rebel-router.js"], function (_export) {
    var RebelTemplate, _createClass, RandomList;

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
            RebelTemplate = _libRebelRouterJs.RebelTemplate;
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

            _export("RandomList", RandomList = (function (_RebelTemplate) {
                _inherits(RandomList, _RebelTemplate);

                function RandomList() {
                    _classCallCheck(this, RandomList);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(RandomList).apply(this, arguments));
                }

                _createClass(RandomList, [{
                    key: "createdCallback",
                    value: function createdCallback() {
                        this.template = "<ul id=\"list\"></ul><button onclick=\"" + this.addItem() + "\">Add Item</button>";
                    }
                }, {
                    key: "addItem",
                    value: function addItem() {
                        var $item = document.createElement("li");
                        $item.innerHTML = "Item!";
                    }
                }]);

                return RandomList;
            })(RebelTemplate));

            _export("RandomList", RandomList);

            document.registerElement("random-list", RandomList);
        }
    };
});