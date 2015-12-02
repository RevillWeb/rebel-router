import {RebelRouter} from 'lib/rebel-router.js';
import {Page1} from 'sections/page1.js';
import {Page2} from 'sections/page2.js';
import {Page3} from 'sections/page3.js';

let $mainView = new RebelRouter()
                    .add(["/page1/id/{id}/name/{name}", "/page1"], Page1)
                    .add("/page2", Page2)
                    .add("/page3/{id}", Page3)
                    .create("main-view");

document.body.appendChild($mainView);

