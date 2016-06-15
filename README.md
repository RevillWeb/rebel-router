<div align="center">
<img src="http://i.imgur.com/aKQ3Mmi.png" alt="IDE" />
</div>
<p>&nbsp;</p>
A lightweight JavaScript router written for ultra-modern web applications where web components are first class citizens. Rebel-router is designed to make building modern applications using ES2015 and beyond easier while not tying you into a specific framework or technology stack. Rebel-router allows you to write web components to represent your views so you can make full use of the view controller pattern based on nothing more than browser standards.
<p>&nbsp;</p>
<div align="center"><a href="http://revillweb.github.io/rebel-router-demo/" target="_blank"><img src="http://i.imgur.com/Y1TfcAT.png" /></a>&nbsp;<a href="https://github.com/RevillWeb/rebel-router-examples/tree/master/simple-example" target="_blank"><img src="http://i.imgur.com/4Dccydy.png" /></a></div>

##Features

* Light-weight
* Zero dependencies
* Nested routes
* Animation support
* Built on web components

##Examples

* [Simple Example](https://github.com/RevillWeb/rebel-router-examples/tree/master/simple-example)
* Using URL parameters
* Using animations
* Nested routing example
* [Complete demo](http://revillweb.github.io/rebel-router-demo/)

##Platform Support

While some browsers do not support the full specification for web components you will need to include the [webcomponents.js](https://github.com/webcomponents/webcomponentsjs) pollyfill.


| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_64x64.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Latest* ✔ | Latest ✔ | Latest ✔ | IE 11 ✔ | Latest ✔ | Latest* ✔ |
*Includes both Mobile & Desktop versions.


#Why?

The latest features of JavaScript (ES2015-17) provide solutions to problems web developers have been struggling with for years. This includes native support for modules, true encapsulation with web components and a reliance on monolithic frameworks to really build anything scalable. Rebel-router allows the developer to write web components which represent views and provides an easy way to tie these views to a URL path with easy access to any parameters. This provides some flexible structure in writing vanilla JavaScript applications without frameworks.

#Usage

Rebel-router is designed to be used when building applications using the latest version of JavaScript and will need transpiling down to ES5 using [babel](https://babeljs.io/) or similar.

1. Install rebel-router into your project from npm

``` npm install rebel-router ```

2. Create your views as web components

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

```javascript
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

```javascript
#app.js
import {HomePage} from './home.js';
import {AboutPage} from './about.js';
```

4. Create a router instance and configure routes

```javascript
let MainRouter = new RebelRouter("main");
MainRouter.add("/about", AboutPage).setDefault(HomePage);
```

5. Add your view to your document

```html
    <rebel-router instance="main"></rebel-router>
```

A complete tutorial on how to build applications with rebel-router can be found [here](https://github.com/RevillWeb/rebel-router-examples/tree/master/simple-example).

#To Do

* History API Support - I've not found any real need for this yet and it creates an extra level of friction due to the requirement of server side configuration. But this router is aimed at ultra-modern applications so it should be implemented at some point
* Intercept transition - A nice feature of many routers is the ability to do work and resolve when finished before a route transition completes allowing you to set-up data from the next page