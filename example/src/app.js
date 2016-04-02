/**
 * Created by Leon Revill on 03/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {RebelRouter} from '../../src/rebel-router.js';
import {HomePage} from './pages/home.js';
import {ResourceList} from './pages/resource-list.js';
import {InfoPage} from './pages/info.js';
import {RblRepeater} from '../../src/rebel-repeater.js';
import {Loader} from './components/loader.js';

//Configure the main app router with the main resource list page and the info page.
let MainRouter = new RebelRouter("main-view");
MainRouter
    .add("/info", InfoPage)
    .add("/resource/{resource}", ResourceList)
    .setDefault(HomePage);