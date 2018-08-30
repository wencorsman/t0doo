const taskElement = document.querySelector('#task');

const eventHandler = {
    complete: function() {
        // let id = 
    }
}

class TaskElement extends HTMLElement {
    constructor() {
        super();
        this.appendChild(taskElement.cloneNode(true));
    }
}

window.onload = function () {
    customElements.define('task-element', TaskElement);
}