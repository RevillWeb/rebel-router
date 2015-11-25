import {RebelTemplate} from '../lib/rebel-router.js';
import {RandomList} from '../components/random-list.comp.js';

export class Page1 extends RebelTemplate {
    createdCallback() {
        this.template = `<p>This is page one! Go to <a href="#/page2">Page Two</a>.</p> <random-list></random-list>`;
    }
}
