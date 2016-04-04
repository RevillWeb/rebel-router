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
        this.data = null;
        this.innerHTML = `
            <rbl-loading id="loading" color="#ff6" background-color="#000"></rbl-loading>
            <h1 id="title"></h1>
        `;
        this.$loader = this.querySelector('#loading');
    }
    attributeChangedCallback(name) {
        const value = this.getAttribute(name);
        switch (name) {
            case "id":
                this.id = value;
                this.render();
                break;
        }
    }
    render() {
        console.log("TYPE:", this.type);
        this.$loader.show();
        if (this.id !== null && this.type !== null) {
            let $title = this.querySelector("#title");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        const json = JSON.parse(xhr.response);
                        $title.innerHTML = json.name;
                        this.data = json;
                        console.log("DATA:", this.data);
                        this.$loader.hide();
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