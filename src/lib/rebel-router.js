import * as RebelCore from '../lib/rebel-core.js';

export class RebelRouter {
    constructor() {
        this.paths = {};
        return this;
    }
    add(path, ViewClass) {
        let name = ViewClass.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z0-9])/g, '$1-$2').toLowerCase();
        document.registerElement(name, ViewClass);
        this.paths[path] = name;
        return this;
    }
    create(name) {
        name = name.toLowerCase();
        if (RebelCore.validElementTag(name) === true) {
            let $constructor = document.registerElement(name, RebelView);
            let $view = new $constructor();
            $view.paths = this.paths;
            return $view;
        } else {
            throw new Error("Invalid router name provided");
        }
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
    currentTemplate() {
        const path = RebelRouter.getPathFromUrl();
        for (const key in this._paths) {
            console.log(key);
            const regexString = key.replace(/{.*}\/?/, "[^\/]+/?") + "$";
            console.log(regexString);
            const regex = new RegExp(regexString);
            if (regex.test(path)) {
                return this._paths[key];
            }
        }
        return false;
    }
    render() {
        this.shadowRoot.innerHTML = "";
        const templateName = this.currentTemplate();
        if (templateName !== false) {
            let $template = document.createElement(templateName);
            $template.setAttribute("rebel-url-params", JSON.stringify({"test": 123}));
            this.shadowRoot.appendChild($template);
        }
    }
    set paths(value) {
        this._paths = value;
    }
}