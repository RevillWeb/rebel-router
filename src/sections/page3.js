export class Page3 extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.template = `<p>This is page three! Go to <a href="#/page1">Page One</a>.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
    attributeChangedCallback(name, value) {
        console.log("NAME: ", name);
        switch (name) {
            case "rebel-url-params":
                console.log("VALUE: ", value);
                break;
        }
    }
}