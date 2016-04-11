/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class HomePage extends HTMLElement {
    createdCallback() {
        this.template = `<div class="home-container">
            <h2>REBEL ROUTER</h2>
            <p>This simple demo application provides an example of Rebel Router in action, a router designed to make building ultra-modern web applications easy without the need for monolithic frameworks.</p>
            <p>Simply make use of JavaScript modules and web components to easily write modular organised code that won't tie you in to a specific set of technologies.</p>
            <h3>DEMO</h3>
            <p>This demo makes use of the superb <a href="https://swapi.co/" target="_blank">Star Wars API</a> to provide a simple but real world use for the router. Navigate through the pages in the menu above and discover all kinds of things about the Star Wars universe you didn't know.</p>
            <div class="controls">
                <a href="" class="btn"><span class="icon icon-github"></span> Demo Source</a>
                <a href="https://github.com/RevillWeb/rebel-router" target="_blank" class="btn"><span class="icon icon-github"></span> Rebel Router</a>
            </div>
        </div>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = this.template;
    }
}