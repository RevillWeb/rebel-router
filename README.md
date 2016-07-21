#Minimalistic JavaScript router for Web Components

<div align="center"><img src="http://i.imgur.com/8CPaGEG.png"></div>

Inspired by React Router, works in plain HTML.

- [Demo](http://revillweb.github.io/rebel-router-demo/)
- [Simple example](https://github.com/RevillWeb/rebel-router-examples/tree/master/getting-started)

**Note:** Currently this is very much a work in progress. I'm working hard to add more desirable features such as History API support and getting the router field testing in real world applications.

#Getting started

Rebel-router is designed to be used when building applications using the latest version of JavaScript and will need transpiling down to ES5 using [babel](https://babeljs.io/) or similar.

1) Install rebel-router into your project from npm

``` npm install rebel-router ```

2) Create your views as web components

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

document.registerElement("home-page", HomePage);
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
document.registerElement("about-page", AboutPage);
```

3) Import your views into your main application file to register the elements.

```javascript
#app.js
import {HomePage} from './home.js';
import {AboutPage} from './about.js';
```

4) Add the router and specify configuration in your HTML file

```html
    <rebel-router animation="true" shadow="false" inherit="false">
        <rebel-route path="/about" component="about-page"></rebel-route>
        <rebel-route path="/info"><p>This is a simple info page.</p></rebel-route>
        <rebel-default component="home-page"></rebel-default>
    </rebel-router>
```

A simple tutorial on how to get started with **rebel-router** can be found [here](https://github.com/RevillWeb/rebel-router-examples/tree/master/getting-started).

##Features

* Light-weight
* Zero dependencies*
* Nested routes
* Animation support
* Built on web components

*Does currently require [webcomponents.js](https://github.com/webcomponents/webcomponentsjs) for older browser support.

##Examples

* [Getting started tutorial](https://github.com/RevillWeb/rebel-router-examples/tree/master/getting-started)
* [Accessing route parameters](https://github.com/RevillWeb/rebel-router-examples/tree/master/route-params)
* [Using nested routing](https://github.com/RevillWeb/rebel-router-examples/tree/master/nested-routing)
* Using animations
* [Complete demo](http://revillweb.github.io/rebel-router-demo/)

#What?

Rebel router is a lightweight JavaScript router written for ultra-modern web applications where web components are first class citizens. Rebel-router is designed to make building modern applications using ES2015 and beyond easier while not tying you into a specific framework or technology stack. Rebel-router allows you to write web components to represent your views so you can make full use of the view controller pattern based on nothing more than browser standards.

#Why?

The latest features of JavaScript (ES2015-17) provide solutions to problems web developers have been struggling with for years. This includes native support for modules, true encapsulation with web components and a reliance on monolithic frameworks to really build anything scalable. Rebel-router allows the developer to write web components which represent views and provides an easy way to tie these views to a URL path with easy access to any parameters. This provides some flexible structure in writing vanilla JavaScript applications without frameworks.

##Platform Support

While some browsers do not support the full specification for web components you will need to include the [webcomponents.js](https://github.com/webcomponents/webcomponentsjs) pollyfill.


| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_64x64.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Latest* ✔ | Latest ✔ | Latest ✔ | IE 11 ✔ | Latest ✔ | Latest* ✔ |
*Includes both Mobile & Desktop versions.

#Usage

This section of the document details the API for rebel-router.

##`<rebel-router></rebel-router>`

This element is used to insert a pre-configured router instance into the DOM.

###Attributes

| Attribute Name | Required | Type    | Example     | Default | Comments                                                                |
| -------------- | -------- | ------- | ----------- | ------- | ----------------------------------------------------------------------- |
| animation      |   No     | Boolean | true        | false   | Whether or not to enable animation for route transitions.               |
| shadow         |   No     | Boolean | false       | false   | Whether or not the router should be encapsulated within the shadow DOM. |
| inherit        |   No     | Boolean | false       | true    | Whether or not the router should inherit a parent routes path.          |

###Children

Configuration is specified via child elements of `<rebel-router>`.

###`<rebel-route></rebel-route>`

####Attributes

| Attribute Name | Required | Type    | Example     | Comments                                                                            |
| -------------- | -------- | ------- | ----------- | ----------------------------------------------------------------------------------- |
| path           |   Yes    | String  | /user/{id}  | The path to which the specified template or component should be rendered.           |
| component      |   No     | String  | about-page  | The registered element name of the component to be rendered for the specified path. |

####Children

If you do not wish to use a component to render your view for the specified path you are able to add arbitrary HTML to be used as the template. 

###`<rebel-default></rebel-default>`

###Attributes

| Attribute Name | Required | Type    | Example     | Comments                                                                            |
| -------------- | -------- | ------- | ----------- | ----------------------------------------------------------------------------------- |
| component      |   No     | String  | home-page   | The registered element name of the component to be rendered for the specified path. |

####Children

As with the route element you are also able to add arbitrary HTML to be used as the template. 

###Example

```html
<rebel-router animation="true" shadow="false" inherit="false">
    <rebel-route path="/info" component="info-page"></rebel-route>
    <rebel-route path="/resources/{resource}" component="resources-list"></rebel-route>
    <rebel-route path="/resource/people/{id}" component="people-resource"></rebel-route>
    <rebel-route path="/resource/starships/{id}" component="starships-resource"></rebel-route>
    <rebel-route path="/resource/vehicles/{id}" component="vehicles-resource"></rebel-route>
    <rebel-route path="/resource/species/{id}" component="species-resource"></rebel-route>
    <rebel-route path="/resource/planets/{id}" component="planets-resource"></rebel-route>
    <rebel-route path="/test/{id}">
        <p>This is a simple page template which can access the route params: ${id}.</p>
    </rebel-route>
    <rebel-default component="home-page"></rebel-default>
</rebel-router>
```

##`<rebel-back-a></rebel-back-a>`

An extended HTML anchor element which is used to trigger a back animation for router instances which have animation enabled.

###Attributes

| Attribute Name | Required | Type   | Example     | Comments                                              |
| -------------- | -------- | ------ | ----------- | ----------------------------------------------------- |
| href           |   Yes    | String | `#/users` | The path of the route the anchor element should navigate too. |

###Example

```html
    <a href="#/user/1" is="rebel-back-a"><span class="icon icon-arrow-left2"></span> Back</a>
```

#To Do

* History API Support - Where as I've not yet found any real need for this this router is aimed at ultra-modern applications now that the History API is widely supported this will be one of the next features added
* Intercept transition - A nice feature of many routers is the ability to do work and resolve when finished before a route transition completes allowing you to set-up data from the next page
* Write a comprehensive test suite to test all aspects of rebel-router and associated elements