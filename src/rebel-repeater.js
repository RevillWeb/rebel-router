/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

export class RblRepeater extends HTMLElement {
    createdCallback() {
        this.content = [];
        this.template = this.innerHTML;
        if (this.getAttribute('shadow') == "true") {
            this.createShadowRoot();
        }
    }
    attachedCallback() {

        this.render();
    }
    render() {
        const element = this.getAttribute('element');
        let html = (element !== null ) ? "<" + element.toLowerCase() + ">" : "";
        if (Array.isArray(this.content)) {
            this.content.forEach((item) => {
                html += RblRepeater.interpolate(this.template, item);
            });
        } else {
            throw new Error("Content should be an Array of objects.");
        }
        html += (element !== null ) ? "</" + element.toLowerCase() + ">" : "";
        if (this.getAttribute('shadow') == "true") {
            this.shadowRoot.innerHTML = html;
            this.innerHTML = "";
        } else {
            this.innerHTML = html;
        }
    }
    setContent(content) {
        this.content = content;
        this.render();
    }
    setTemplate(template) {
        this.template = template;
        this.render();
    }
    attributeChangedCallback(name) {
        switch (name) {
            case "content":
                this.content = RblRepeater.fromJson(this.getAttribute('content'));
                this.render();
                break;
        }
    }
    static interpolate(template, obj) {
        if (typeof obj == "object") {
            for (var key in obj) {
                const find = "${" + key + "}";
                if (template.indexOf(find) > -1) {
                    template = template.replace(find, obj[key]);
                    delete obj[key];
                }
            }
        }
        return template;
    }
    static fromJson(str) {
        let obj = null;
        if (typeof str == "string") {
            try {
                obj = JSON.parse(str);
            } catch (e) {
                throw new Error("Invalid JSON string provided. ");
            }
        }
        return obj;
    }
}

document.registerElement("rbl-repeater", RblRepeater);