/**
 * Created by Leon Revill on 03/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {RebelRouter} from '../../src/rebel-router.js';
import {HomePage} from './pages/home.js';
import {ResourcesList} from './pages/resource-list.js';
import {PeopleResource} from './pages/resources/people.js';
import {StarshipsResource} from './pages/resources/starships.js';
import {VehiclesResource} from './pages/resources/vehicles.js';
import {SpeciesResource} from './pages/resources/species.js';
import {PlanetsResource} from './pages/resources/planets.js';
import {InfoPage} from './pages/info.js';
import {RblRepeater} from '../../src/rebel-repeater.js';
import {RblLoading} from './../../src/rebel-loading.js';

//Configure the main app router with the main resource list page and the info page.
let MainRouter = new RebelRouter("main-view");
MainRouter
    .add("/info", InfoPage)
    .add("/resources/{resource}", ResourcesList)
    .add("/resource/people/{id}", PeopleResource)
    .add("/resource/starships/{id}", StarshipsResource)
    .add("/resource/vehicles/{id}", VehiclesResource)
    .add("/resource/species/{id}", SpeciesResource)
    .add("/resource/planets/{id}", PlanetsResource)
    .setDefault(HomePage);