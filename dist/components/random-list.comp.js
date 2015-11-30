"use strict";

System.register([], function (_export) {
    var _createClass, RandomList;

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

            _export("RandomList", RandomList = (function () {
                function RandomList() {
                    _classCallCheck(this, RandomList);
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
            })());

            _export("RandomList", RandomList);

            document.registerElement("random-list", RandomList);
        }
    };
});