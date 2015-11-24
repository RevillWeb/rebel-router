import {RebelView} from '../lib/rebel-router.js';

export class Page2 extends RebelView {
    constructor() {
        let template = `<p>This is page one.</p>`;
        super("/page1", template);
    }
}