/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {ResourceItem} from "../resource-item.js";
export class PeopleResource extends ResourceItem {
    //createdCallback() {
    //    super.createdCallback();
    //
    //}
    attachedCallback() {
        this.type = "people";
        //super.render();
    }
    //attributeChangedCallback(name) {
    //    const value = this.getAttribute(name);
    //    switch (name) {
    //        case "type":
    //            this.type = value;
    //            super.render();
    //            break;
    //    }
    //}
    //attributeChangedCallback(name) {
    //    //switch (name) {
    //    //    case "rbl-url-params":
    //    //        try {
    //    //            var params = JSON.parse(this.getAttribute(name));
    //    //            this.id = params.id || null;
    //    //            this.type = params.type || null;
    //    //        } catch (e) {
    //    //            console.log("Couldn't parse params.");
    //    //        }
    //    //        this.render();
    //    //        break;
    //    //}
    //}
    //render() {
    //    this.$loader.show();
    //    if (this.id !== null && this.type !== null) {
    //        let $title = this.querySelector("#title");
    //        var xhr = new XMLHttpRequest();
    //        xhr.onreadystatechange = () => {
    //            if (xhr.readyState == 4 && xhr.status == 200) {
    //                try {
    //                    const json = JSON.parse(xhr.response);
    //                    $title.innerHTML = json.name;
    //                    this.data = json;
    //                    console.log("DATA:", this.data);
    //                    this.$loader.hide();
    //                } catch (e) {
    //                    console.error("Couldn't parse API response:", e);
    //                }
    //            }
    //        };
    //        xhr.open("GET", this.baseUrl + this.type + "/" + this.id);
    //        xhr.send();
    //    }
    //}
}