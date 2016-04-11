/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {ResourceItem} from "../resource-item.js";
export class SpeciesResource extends ResourceItem {
    attachedCallback() {
        this.type = "species";
        this.renderChild = () => {
            this.$stats.innerHTML = SpeciesResource.renderTemplate(this.data);
        };
    }
    static renderTemplate(data) {
        return `
            <div class="stats-section">
                <div class="section">
                    <p><label><span class="icon icon-lips"></span></label> <span>${data.language}</span></p>
                </div>
                <div class="section">
                    <p><label><span class="icon icon-calendar5"></span></label> ${data.average_lifespan}</p>
                </div>
            </div>
            <div class="stats-section">
                <div class="section build">
                    <p><label>Av. Height:</label> ${data.average_height}</p>
                    <span class="icon icon-man"></span>
                    <p><label>Classification:</label> ${data.classification}</p>
                </div>
                <div class="section">
                    <p><label>Eye Colours:</label> ${data.eye_colors}</p>
                    <p><label>Hair Colours:</label> ${data.hair_colors}</p>
                    <p><label>Skin Colours:</label> ${data.skin_colors}</p>
                </div>
            </div>`;
    }
}