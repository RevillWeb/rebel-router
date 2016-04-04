/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {ResourceItem} from "../resource-item.js";
export class StarshipsResource extends ResourceItem {
    attachedCallback() {
        this.type = "starships";
        this.renderChild = () => {
            this.$stats.innerHTML = StarshipsResource.renderTemplate(this.data);
        };
    }
    static renderTemplate(data) {
        return `
            <div class="stats-section">
                <div class="section">
                    <p><label><span class="icon icon-coins"></span></label> <span>${data.cost_in_credits}</span></p>
                </div>
                <div class="section">
                    <p><label><span class="icon icon-shield4"></span></label> ${data.starship_class}</p>
                </div>
            </div>
            <div class="stats-section">
                <div class="section build">
                    <p><label>Length:</label> ${data.length}</p>
                    <span class="icon icon-rocket"></span>
                    <p><label>Cargo Capacity:</label> ${data.cargo_capacity}</p>
                    <p><label>Passengers:</label> ${data.passengers}</p>
                </div>
                <div class="section">
                    <p><label>Model:</label> ${data.model}</p>
                    <p><label>Crew:</label> ${data.crew}</p>
                    <p><label>Hyperdrive Rating:</label> ${data.hyperdrive_rating}</p>
                    <p><label>Manufacturer:</label> <br />${data.manufacturer}</p>
                </div>
            </div>`;
    }
}