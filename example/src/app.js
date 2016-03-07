/**
 * Created by Leon Revill on 03/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {RebelRouter} from '../../src/rebel-router.js';
import {HomePage} from './pages/home.js';

let MainRouter = new RebelRouter("main-view");
MainRouter.setDefault(HomePage);
//document.body.appendChild(MainRouter);