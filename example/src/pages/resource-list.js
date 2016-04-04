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
        this.page = 1;
        this.response = null;
        this.innerHTML = `
            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>
            <h1 id="title"></h1>
            <ul class="resource-list">
                <rbl-repeater id="list-row"></rbl-repeater>
            </ul>
            <div class="list-controls">
                <button class="btn" id="previous"><span class="icon icon-arrow-left2"></span> Preview</button>
                <div class="num" id="page-num">1</div>
                <button class="btn" id="next">Next <span class="icon icon-arrow-right2"></span></button>
            </div>
        `;
        this.$loader = this.querySelector('#loading');
        this.$next = this.querySelector('#next');
        this.$next.addEventListener("click", () => {
            if (this.response.next !== null) {
                this.getData(ResourcesList.getPageNumber(this.response.next));
            }
        });
        this.$previous = this.querySelector('#previous');
        this.$previous.addEventListener("click", () => {
            if (this.response.previous !== null) {
                this.getData(ResourcesList.getPageNumber(this.response.previous));
            }
        });
        this.$pageNum = this.querySelector('#page-num');
    }
    static getPageNumber(url) {
        return url.split("?")[1].split("=")[1];
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
        this.getData();
    }
    attributeChangedCallback(name) {
        switch (name) {
            case "resource":
                this.type = this.getAttribute("resource");
                this.getData();
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
    getData(page) {
        if (this.type !== null) {
            let $title = this.querySelector("#title");
            $title.innerHTML = "<span class='icon " + this.getTypeIcon() + "'></span>" + this.type.charAt(0).toUpperCase() + this.type.slice(1);
            var xhr = new XMLHttpRequest();
            this.$loader.show();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        this.response = JSON.parse(xhr.response);
                        this.render();
                    } catch (e) {
                        console.error("Couldn't parse API response:", e);
                    }
                }
            };
            if (page !== undefined) {
                this.page = page;
            }
            xhr.open("GET", this.baseUrl + this.type + "?page=" + this.page);
            xhr.send();
        }
    }
    render() {
        const $list = this.querySelector("#list-row");
        if ($list !== null) {
            $list.setTemplate('<li><a href="javascript:void(0)" class="resource-click" data-url="${url}">${name}</a></li>');
            this.$next.className = this.$next.className.replace(" disabled", "");
            if (this.response.next === null) {
                this.$next.className += " disabled";
            }
            this.$previous.className = this.$previous.className.replace(" disabled", "");
            if (this.response.previous === null) {
                this.$previous.className += " disabled";
            }
            $list.setContent(this.response.results);
            this.$pageNum.innerHTML = this.page;
            this.$loader.hide();
        }
    }
}