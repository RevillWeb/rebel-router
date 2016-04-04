/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {ResourceItem} from "../resource-item.js";
export class PeopleResource extends ResourceItem {
    attachedCallback() {
        this.type = "people";
        this.renderChild = () => {
            this.$stats.innerHTML = PeopleResource.renderTemplate(this.data);
        };
    }
    static renderTemplate(data) {
        let genderIcon = "transgender-alt";
        if (data.gender == "male") {
            genderIcon = "male";
        } else if (data.gender == "female") {
            genderIcon = "female";
        }
        return `
            <div class="stats-section">
                <div class="section">
                    <p><label><span class="icon icon-${genderIcon}"></span></label> <span>${data.gender}</span></p>
                </div>
                <div class="section">
                    <p><label><span class="icon icon-calendar5"></span></label> ${data.birth_year}</p>
                </div>
            </div>
            <div class="stats-section">
                <div class="section build">
                    <p><label>Height:</label> ${data.height}</p>
                    <span class="icon icon-man"></span>
                    <p><label>Mass:</label> ${data.mass}</p>
                </div>
                <div class="section">
                    <p><label>Eye Colour:</label> ${data.eye_color}</p>
                    <p><label>Hair Colour:</label> ${data.hair_color}</p>
                    <p><label>Skin Colour:</label> ${data.skin_color}</p>
                </div>
            </div>`;
    }
}