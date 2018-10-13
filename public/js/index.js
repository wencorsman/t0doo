

// ────────────────────────────────────────────────────────────────────────────────
// Todo code
// ────────────────────────────────────────────────────────────────────────────────


const taskElement = document.querySelector('[hidden] > .task');
const taskListDom = document.querySelector('.task-list');
const createTask = _ => taskElement.cloneNode(true);
const add = _ => taskListDom.appendChild(createTask());
const toArray = els => Array.prototype.slice.call(els);


toArray(document.querySelectorAll('[data-button]')).forEach(el => {

    el.addEventListener('click', event => {

        let button = event.target.closest('[data-button]');
        eval(button.dataset.button);

    });

});


const addTask = task => {
    let taskDom = createTask();
    taskDom.children[0].innerText = task.icon;
    taskDom.children[1].innerText = task.title;
    taskDom.children[2].innerText = task.assign;
    taskListDom.appendChild(taskDom);
}


const sort = _ => {

    let arr = toArray(taskListDom.cloneNode(true).children);

    const lower = (el, ch) => el.children[ch].innerText.toLowerCase();

    arr.sort((a, b) => {
        return _ == 1 && lower(a, 0) > lower(b, 0) && 1
            || _ == 2 && lower(a, 0) < lower(b, 0) && 1
            || _ == 3 && lower(a, 1) > lower(b, 1) && 1
            || _ == 4 && lower(a, 1) < lower(b, 1) && 1
            || _ == 5 && lower(a, 2) > lower(b, 2) && 1
            || _ == 6 && lower(a, 2) < lower(b, 2) && 1
            || -1;
    });

    taskListDom.innerHTML = '';

    arr.forEach(el => taskListDom.appendChild(el))

}


const save = _ => {
    let data = [];
    for (let i = 0; i < taskListDom.children.length; i++) {
        let task = taskListDom.children[i];
        data.push({
            icon: task.children[0].innerText,
            title: task.children[1].innerText,
            assign: task.children[2].innerText
        });
    }

    fetch('/save', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(text => JSON.parse(text))
        .catch(error => console.log(error.message));

}

const load = _ => {
    fetch('/load')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(list => list.forEach(task => addTask(task)));
}

window.onload = load;