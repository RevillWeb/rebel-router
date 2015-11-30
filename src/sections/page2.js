export class Page2 extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.template = `<p>This is page two! Go to <a href="#/page1">Page One</a>.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
}