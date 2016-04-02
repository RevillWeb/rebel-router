/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class ResourceList extends HTMLElement {
    createdCallback() {
        this.baseUrl = "http://swapi.co/api/";
        this.type = null;
        this.innerHTML = `
            <data-loading></data-loading>
            <h1 id="title"></h1>
            <ul class="resource-list">
                <rbl-repeater id="list-row"></rbl-repeater>
            </ul>
        `;
    }
    attachedCallback() {
        this.render();
    }
    attributeChangedCallback(name) {
        switch (name) {
            case "rbl-url-params":
                try {
                    var params = JSON.parse(this.getAttribute(name));
                    this.type = params.resource || null;
                    this.render();
                } catch (e) {

                }
                break;
        }
    }
    getTypeIcon() {
        switch (this.type) {
            case "people":
                return "icon-user5";
                break;
            case "starships":
                return "icon-rocket";
                break;
            case "vehicles":
                return "icon-truck";
                break;
            case "species":
                return "icon-eye";
                break;
            case "planets":
                return "icon-planet2";
                break;
            default:
                return "";
        }
    }
    render() {
        if (this.type !== null) {
            let $title = this.querySelector("#title");
            $title.innerHTML = "<span class='icon " + this.getTypeIcon() + "'></span>" + this.type.charAt(0).toUpperCase() + this.type.slice(1);
            var xhr = new XMLHttpRequest();
            const $loader = this.querySelector('data-loading');
            $loader.show();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        const json = JSON.parse(xhr.response);
                        if (json.results !== undefined && json.results.length > 0) {
                            const $list = this.querySelector("#list-row");
                            if ($list !== null) {
                                console.log("RESULTS:", json.results);
                                $list.setTemplate('<li><a href="#">${name}</a></li>');
                                $list.setContent(json.results);
                                $loader.hide();
                            }
                        }
                    } catch (e) {
                        console.error("Couldn't parse API response:", e);
                    }
                }
            };
            xhr.open("GET", this.baseUrl + this.type);
            xhr.send();
        }
    }
}