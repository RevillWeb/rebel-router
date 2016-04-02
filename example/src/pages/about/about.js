/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {AboutTab1} from './tab1.js'
import {AboutTab2} from './tab2.js'
import {RebelRouter} from '../../../../src/rebel-router.js'
export class AboutPage extends HTMLElement {
    createdCallback() {
        this.template = `<div class="page-container">
            <h2>About</h2>
            <nav class="page-nav">
                <a href="/about/tab1" is="rebel-history">Tab 1</a>
                <a href="/about/tab2" is="rebel-history">Tab 2</a>
            </nav>
            <div class="content">
                <rebel-view name="about-view"></rebel-view>
            </div>
        </div>`;
    }
    attachedCallback() {
        let AboutRouter = new RebelRouter("about-view", {"mode": "history"});
        AboutRouter
            .add("/about/tab2", AboutTab2)
            .setDefault(AboutTab1);
        this.render();
    }
    render() {
        this.innerHTML = this.template;
    }
}