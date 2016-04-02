/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class HomePage extends HTMLElement {
    createdCallback() {
        this.template = `<p>This is the home page.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = this.template;
    }
}