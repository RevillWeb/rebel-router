'use strict';

System.register(['lib/rebel-router.js', 'sections/page1.js', 'sections/page2.js', 'sections/page3.js'], function (_export) {
                    var RebelRouter, Page1, Page2, Page3, $mainView;
                    return {
                                        setters: [function (_libRebelRouterJs) {
                                                            RebelRouter = _libRebelRouterJs.RebelRouter;
                                        }, function (_sectionsPage1Js) {
                                                            Page1 = _sectionsPage1Js.Page1;
                                        }, function (_sectionsPage2Js) {
                                                            Page2 = _sectionsPage2Js.Page2;
                                        }, function (_sectionsPage3Js) {
                                                            Page3 = _sectionsPage3Js.Page3;
                                        }],
                                        execute: function () {
                                                            $mainView = new RebelRouter().add(["/page1/id/{id}/name/{name}", "/page1"], Page1).add("/page2", Page2).add("/page3/{id}", Page3).create("main-view");
                                                            document.body.appendChild($mainView);
                                        }
                    };
});