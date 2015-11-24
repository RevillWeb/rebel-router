import {RebelRouter} from 'lib/rebel-router.js';
import {Page1} from 'sections/page1.js';

let MainRouter = new RebelRouter();
console.log("PAGE: ", Page1);
MainRouter.add(Page1);

