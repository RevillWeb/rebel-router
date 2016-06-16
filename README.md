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

#Getting started

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

4. Create a router instance, configure routes and specify options

```javascript
const routes = {
    "/about": AboutPage,
    "default": HomePage
};

const options = {
    "animation": false, //DEFAULT: false
    "shadowRoot": false //DEFAULT: false
};

RebelRouter.create("main", routes);
```

5. Add your view to your document

```html
    <rebel-router instance="main"></rebel-router>
```

A complete tutorial on how to build applications with rebel-router can be found [here](https://github.com/RevillWeb/rebel-router-examples/tree/master/simple-example).

#Usage

This section of the document full details the API for rebel-router.

##Methods

There is currently only one method available as part of rebel-router which is used to create new instances of a router.

###RebelRouter.create(name, routes, options)

Creates a new router instance.

####Arguments

| Argument Name | Required | Type   | Example     | Comments                                              |
| -------------- | -------- | ------ | ----------- | ----------------------------------------------------- |
| name      |   Yes     | String | main | If the component should convert all tags to lowercase |
| routes      |   Yes     | Object | ```javascript
                                                                        {
                                                                            "/info": InfoPage,
                                                                            "/resources/{resource}": ResourcesList,
                                                                            "/resource/people/{id}": PeopleResource,
                                                                            "/resource/starships/{id}": StarshipsResource,
                                                                            "/resource/vehicles/{id}":  VehiclesResource,
                                                                            "/resource/species/{id}": SpeciesResource,
                                                                            "/resource/planets/{id}": PlanetsResource,
                                                                            "default": HomePage
                                                                        }
                                                                        ``` | If the component should convert all tags to uppercase |
| options     |   No     | Object | ```javascript
                                    {
                                        "animation": false,
                                        "ShadowDOM": false,  
                                    }
                                    ``` | If the component should allow duplicate tags          |



1) **name**

The unique name of the router instance. (e.g. `main`, `admin`, etc.)

2) **routes**

An object containing all the routes and associated view classes where the key is the route and the value is the view class. Use `{}` to dictate URL params (e.g. "/user/{id}") and `default` to specify a fallback route if no other routes are matched.

*Example:*

```javascript
{
    "/info": InfoPage,
    "/resources/{resource}": ResourcesList,
    "/resource/people/{id}": PeopleResource,
    "/resource/starships/{id}": StarshipsResource,
    "/resource/vehicles/{id}":  VehiclesResource,
    "/resource/species/{id}": SpeciesResource,
    "/resource/planets/{id}": PlanetsResource,
    "default": HomePage
}
```

3) **options**

An object containing option configuration options for the router instance.

1. `animation` - Whether you want animation support to enable you to use CSS enables for route transitions. Default: false
2. `shadowDOM` - Whether you want the router to automatically place your views within a sub-DOM tree. Default: false

*Example:* 

```javascript
{
    "animation": false,
    "ShadowDOM": false,  
}
```

####Returns

This method doesn't return anything.

####Example

```javascript
const routes = {
    "/info": InfoPage,
    "/resources/{resource}": ResourcesList,
    "/resource/people/{id}": PeopleResource,
    "/resource/starships/{id}": StarshipsResource,
    "/resource/vehicles/{id}":  VehiclesResource,
    "/resource/species/{id}": SpeciesResource,
    "/resource/planets/{id}": PlanetsResource,
    "default": HomePage
};

const options = {
    animation: true
};

RebelRouter.create("main", routes, options);
```

##Elements

This section of the document outlines all of the DOM elements available for use as part of the rebel-router.

###rebel-router

This element is used to insert a pre-configured router instance into the DOM.

####Attributes

| Attribute Name | Required | Type   | Example     | Comments                                              |
| -------------- | -------- | ------ | ----------- | ----------------------------------------------------- |
| instance       |   Yes    | String | main, admin | The unique name of the instance you have already configured via the `RebelRouter.create()` method. |

####Example

```html
<rebel-router instance="main"></rebel-router>
```

###rebel-back-a

An extended HTML anchor element which is used to trigger a back animation for router instances which have animation enabled.

####Attributes

| Attribute Name | Required | Type   | Example     | Comments                                              |
| -------------- | -------- | ------ | ----------- | ----------------------------------------------------- |
| href           |   Yes    | String | `#/users` | The path of the route the anchor element should navigate too. |

####Example

```html
    <a href="#/user/1" is="rebel-back-a"><span class="icon icon-arrow-left2"></span> Back</a>
```

#To Do

* History API Support - I've not found any real need for this yet and it creates an extra level of friction due to the requirement of server side configuration. But this router is aimed at ultra-modern applications so it should be implemented at some point
* Intercept transition - A nice feature of many routers is the ability to do work and resolve when finished before a route transition completes allowing you to set-up data from the next page