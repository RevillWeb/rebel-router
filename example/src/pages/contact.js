/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class ContactPage extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.template = `<p>This is the contact page. <a href="/" is="rebel-history">Home</a></p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = this.template;
    }
}