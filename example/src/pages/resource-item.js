/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class ResourceItem extends HTMLElement {
    createdCallback() {
        this.baseUrl = "http://swapi.co/api/";
        this.id = null;
        this.type = null;
        this.renderChild = null;
        this.data = {};
        this.innerHTML = `
            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>
            <a href="#" id="back-btn"><span class="icon icon-arrow-left2"></span> Back</a>
            <h1 id="title"></h1>
            <div id="stats"></div>
        `;
        this.$loader = this.querySelector('#loading');
        this.$stats = this.querySelector('#stats');
    }
    attributeChangedCallback(name) {
        const value = this.getAttribute(name);
        switch (name) {
            case "id":
                this.id = value;
                this.getData();
                break;
        }
    }
    getData() {
        this.$loader.show();
        if (this.id !== null && this.type !== null) {
            let $title = this.querySelector("#title");
            let $back = this.querySelector("#back-btn");
            $back.setAttribute("href", "#/resources/" + this.type);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        const json = JSON.parse(xhr.response);
                        $title.innerHTML = json.name;
                        this.data = json;
                        if (this.renderChild !== null) {
                            this.renderChild();
                        }
                        this.$loader.hide();
                        $back.className = "back-btn show";
                    } catch (e) {
                        console.error("Couldn't parse API response:", e);
                    }
                }
            };
            xhr.open("GET", this.baseUrl + this.type + "/" + this.id);
            xhr.send();
        }
    }
}