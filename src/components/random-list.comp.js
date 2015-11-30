export class RandomList {
    createdCallback() {
        this.template = `<ul id="list"></ul><button onclick="${this.addItem()}">Add Item</button>`;
    }
    addItem() {
        var $item = document.createElement("li");
        $item.innerHTML = "Item!";
        //this.shadowRoot.querySelector('#list').appendChild($item);
    }
}

document.registerElement("random-list", RandomList);
