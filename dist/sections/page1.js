'use strict';

System.register(['../components/random-list.comp.js'], function (_export) {
    var RandomList, _createClass, Page1;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_componentsRandomListCompJs) {
            RandomList = _componentsRandomListCompJs.RandomList;
        }],
        execute: function () {
            _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            _export('Page1', Page1 = (function (_HTMLElement) {
                _inherits(Page1, _HTMLElement);

                function Page1() {
                    _classCallCheck(this, Page1);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page1).apply(this, arguments));
                }

                _createClass(Page1, [{
                    key: 'createdCallback',
                    value: function createdCallback() {
                        this.createShadowRoot();
                        this.template = '<p>This is page one! Go to <a href="#/page2">Page Two</a>.</p>';
                    }
                }, {
                    key: 'attachedCallback',
                    value: function attachedCallback() {
                        this.render();
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        this.shadowRoot.innerHTML = this.template;
                    }
                }]);

                return Page1;
            })(HTMLElement));

            _export('Page1', Page1);
        }
    };
});