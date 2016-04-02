/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class HomePage extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.template = `<p>This is the home page. <a href="/about" is="rebel-history">About</a> <a href="/contact" is="rebel-history">contact</a></p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
}