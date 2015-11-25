import {RebelRouter} from 'lib/rebel-router.js';
import {Page1} from 'sections/page1.js';
import {Page2} from 'sections/page2.js';

let MainRouter = new RebelRouter();
let $router = MainRouter.add("/page1", Page1).add("/page2", Page2).go();
document.body.appendChild($router);

