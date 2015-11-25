import {RebelTemplate} from '../lib/rebel-router.js';

export class Page2 extends RebelTemplate {
    createdCallback() {
        this.template = `<p>This is page two! Go to <a href="#/page1">Page One</a>.</p>`;
    }
}
