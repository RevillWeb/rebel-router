'use strict';

System.register(['lib/rebel-router.js', 'sections/page1.js'], function (_export) {
  var RebelRouter, Page1, MainRouter;
  return {
    setters: [function (_libRebelRouterJs) {
      RebelRouter = _libRebelRouterJs.RebelRouter;
    }, function (_sectionsPage1Js) {
      Page1 = _sectionsPage1Js.Page1;
    }],
    execute: function () {
      MainRouter = new RebelRouter();
      console.log("PAGE: ", Page1.template);
      MainRouter.add(Page1);
    }
  };
});