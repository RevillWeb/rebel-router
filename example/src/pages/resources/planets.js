/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
import {ResourceItem} from "../resource-item.js";
export class PlanetsResource extends ResourceItem {
    attachedCallback() {
        this.type = "planets";
        this.renderChild = () => {
            this.$stats.innerHTML = PlanetsResource.renderTemplate(this.data);
        };
    }
    static renderTemplate(data) {
        return `
            <div class="stats-section">
                <div class="section">
                    <p><label><span class="icon icon-arrow-down16"></span></label> <span>${data.gravity}</span></p>
                </div>
                <div class="section">
                    <p><label><span class="icon icon-tree"></span></label> ${data.terrain}</p>
                </div>
            </div>
            <div class="stats-section">
                <div class="section build">
                    <p><label>Diameter:</label> ${data.diameter}</p>
                    <span class="icon icon-planet2"></span>
                    <p><label>Climate:</label> ${data.climate}</p>

                </div>
                <div class="section">
                <p><label>Population:</label> ${data.population}</p>
                    <p><label>Surface Water:</label> ${data.surface_water}</p>
                    <p><label>Orbital Period:</label> ${data.orbital_period}</p>
                    <p><label>Rotation Period:</label> ${data.rotation_period}</p>
                </div>
            </div>`;
    }
}