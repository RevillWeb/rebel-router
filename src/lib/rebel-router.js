export class RebelRouter {
    constructor() {
        this.paths = {};
    }
    add(path, ViewClass) {
        let name = ViewClass.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        document.registerElement(name, ViewClass);
        this.paths[path] = name;
        return this;
    }
    go() {
        let $constructor = document.registerElement("rebel-view", RebelView);
        let $view = new $constructor();
        $view.paths = this.paths;
        return $view;
    }
    static getPathFromUrl() {
        var result = window.location.href.match(/#(.*)$/);
        if (result !== null) {
            return result[1];
        }
    }

}

class RebelView extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
    }
    attachedCallback() {
        this.render();
        window.onhashchange = (event) => {
            if (event.newURL != event.oldURL) {
                this.render();
            }
        };
    }
    render() {
        const path = RebelRouter.getPathFromUrl();
        if (this._paths[path] !== undefined) {
            this.shadowRoot.innerHTML = "<" + this._paths[path] + "></" + this._paths[path] + ">";
        }
    }
    set paths(value) {
        this._paths = value;
    }
}


export class RebelTemplate extends HTMLElement {
    attachedCallback() {
        this.render();
    }
    render() {
        this.createShadowRoot().innerHTML = this.template;
    }
}