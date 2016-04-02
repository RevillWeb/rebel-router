/**
 * Created by Leon Revill on 03/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {RebelRouter} from '../../src/rebel-router.js';
import {HomePage} from './pages/home.js';
import {AboutPage} from './pages/about/about.js';
import {ContactPage} from './pages/contact.js';

let MainRouter = new RebelRouter("main-view", {"mode": "history"});
MainRouter
    .add("/about", AboutPage)
    .add("/contact", ContactPage)
    .setDefault(HomePage);