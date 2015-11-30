import {RandomList} from '../components/random-list.comp.js';

export class Page1 extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.template = `<p>This is page one! Go to <a href="#/page2">Page Two</a>.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
}
