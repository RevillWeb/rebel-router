export class RebelRouter {
    constructor() {
        this.urls = {};
        window.onhashchange = (event) => {
            if (event.newURL != event.oldURL) {
                if (this.urls[event.newURL] !== undefined) {
                    this.urls[event.newURL](RebelRouter.getPathFromUrl());
                }
            }
        };
    }
    add(ViewClass) {
        console.log("VIEW CLASS: ", ViewClass);
    }
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }
}

class RebelViewContainer extends HTMLElement {
    //render(template, data) {
    //    //insert into DOM
    //    console.log("TEMPLATE: ", template);
    //    console.log("DATA: ", data);
    //}
    //    super.onUrlMatch(this.url, function(currentUrl) {
    ////Need to render the view
    //console.log("NEED TO RENDER THE VIEW: " + currentUrl);
    //});
}


export class RebelView extends HTMLElement {
    constructor(url, template) {
        super();
        this.url = url;
        this.template = template;
    }
}