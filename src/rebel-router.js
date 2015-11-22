class Router {
    constructor() {
        window.onhashchange = function(event) {
            if (event.newURL != event.oldURL) {

            }
        };
    }
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }
}

class RouterContainer extends HTMLElement {
    attachedCallback() {

    }
}