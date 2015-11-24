import {RebelView} from '../lib/rebel-router.js';

export class Page1 extends RebelView {
    constructor() {
        let template = `<p>This is page one.</p>`;
        super("/page1", template);
    }
    attachedCallback() {
        //Do some awesome on page load stuff
    }
}