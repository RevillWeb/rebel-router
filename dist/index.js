'use strict';

System.register(['lib/rebel-router.js', 'sections/page1.js', 'sections/page2.js'], function (_export) {
  var RebelRouter, Page1, Page2, MainRouter, $router;
  return {
    setters: [function (_libRebelRouterJs) {
      RebelRouter = _libRebelRouterJs.RebelRouter;
    }, function (_sectionsPage1Js) {
      Page1 = _sectionsPage1Js.Page1;
    }, function (_sectionsPage2Js) {
      Page2 = _sectionsPage2Js.Page2;
    }],
    execute: function () {
      MainRouter = new RebelRouter();
      $router = MainRouter.add("/page1", Page1).add("/page2", Page2).go();
      document.body.appendChild($router);
    }
  };
});