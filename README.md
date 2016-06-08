#rebel-router

A lightweight JavaScript router written for ultra-modern web applications where web components are first class citizens.

#What?

Rebel-router is a JavaScript router written using the latest version of JavaScript aimed at making building ultra-modern web applications using modules, classes and web components easier.

[REBEL-ROTUER DEMO](http://revillweb.github.io/rebel-router-demo/)

##Features

* Light-weight
* Zero dependencies
* Nested routes
* Animation support
* Built on web components

##Platform Support


#Why?

The latest features of JavaScript (ES2015-17) provide solutions to problems web developers have been struggling with for years. This includes native support for modules, true encapsulation with web components and a reliance on monolithic frameworks to really build anything scalable. Rebel-router allows the developer to write web components which represent views and provides an easy way to tie these views to a URL path with easy access to any parameters. This provides some flexible structure in writing vanilla JavaScript applications without frameworks.

#Getting started

Rebel-router is designed to be used when building applications using the latest version of JavaScript, not while using ES5.

1. Install rebel-router into your project from npm

``` npm install rebel-router ```

2. Create your views using ES2015 classes

```javascript
#home.js
export class HomePage extends HTMLElement {
    createdCallback() {
        this.template = `<p>This is my home page.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = this.template;
    }
}
```

```
#about.js
export class AboutPage extends HTMLElement {
    createdCallback() {
        this.template = `<p>This is my about page.</p>`;
    }
    attachedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = this.template;
    }
}
```

3. Import your views into your main application file

```
#app.js
import {HomePage} from './home.js';
import {AboutPage} from './about.js';
```

4. Create a router instance and configure routes

```
let MainRouter = new RebelRouter("main-view", {animation: true});
MainRouter.add("/about", AboutPage).setDefault(HomePage);
```