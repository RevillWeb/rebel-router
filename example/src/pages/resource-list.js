/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class ResourcesList extends HTMLElement {
    createdCallback() {
        this.baseUrl = "http://swapi.co/api/";
        this.type = null;
        this.innerHTML = `
            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>
            <h1 id="title"></h1>
            <ul class="resource-list">
                <rbl-repeater id="list-row"></rbl-repeater>
            </ul>
        `;
    }
    attachedCallback() {
        this.querySelector(".resource-list").addEventListener("click", (event) => {
            var url = event.target.dataset.url;
            if(url.substr(-1) === '/') {
                url = url.substr(0, url.length - 1);
            }
            var parts = url.split("/");
            var id = parts[parts.length - 1];
            window.location.hash = "/resource/" + this.type + "/" + id;
        });
        this.render();
    }
    attributeChangedCallback(name) {
        switch (name) {
            case "resource":
                this.type = this.getAttribute("resource");
                this.render();
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
            const $loader = this.querySelector('#loading');
            $loader.show();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        const json = JSON.parse(xhr.response);
                        if (json.results !== undefined && json.results.length > 0) {
                            const $list = this.querySelector("#list-row");
                            if ($list !== null) {
                                $list.setTemplate('<li><a href="javascript:void(0)" class="resource-click" data-url="${url}">${name}</a></li>');
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