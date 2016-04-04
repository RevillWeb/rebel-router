/**
 * Created by Leon Revill on 07/03/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class RblLoading extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.backgroundColor = this.getAttribute("background-color") || "#FFF";
        this.color = this.getAttribute("color") || "#000";
        this.shadowRoot.innerHTML = `
            <style>
                .loader {
                    position: absolute;
                    background-color: ${this.backgroundColor};
                    top: 0;
                    bottom: 0;
                    width: 100%;
                    color: ${this.color};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 32px;
                }
                .loader.hidden {
                    display: none;
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    margin: 100px auto;
                    background-color: ${this.color};
                    border-radius: 100%;
                    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
                    animation: sk-scaleout 1.0s infinite ease-in-out;
                }

                @-webkit-keyframes sk-scaleout {
                    0% { -webkit-transform: scale(0) }
                    100% {
                        -webkit-transform: scale(1.0);
                        opacity: 0;
                    }
                }

                @keyframes sk-scaleout {
                    0% {
                        -webkit-transform: scale(0);
                        transform: scale(0);
                    } 100% {
                        -webkit-transform: scale(1.0);
                        transform: scale(1.0);
                        opacity: 0;
                    }
                }
            </style>
            <div class="loader hidden">
                <div class="spinner"></div>
            </div>
        `;
    }
    show() {
        this.shadowRoot.querySelector(".loader").className = "loader";
    }
    hide() {
        this.shadowRoot.querySelector('.loader').className = "loader hidden";
    }
}

document.registerElement('rbl-loading', RblLoading);