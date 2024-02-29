let todoInput = document.querySelector("textarea");
let addBtn = document.querySelector("#add-btn");
let todoContainer = document.querySelector(".todo-container");

let todoList = [];

function initialLoad() {
    if (!localStorage.getItem('todos')) { return; }
    todoList = JSON.parse(localStorage.getItem('todos')).todoList;
    updateUI();
}

initialLoad();

function addTodo() {
    const todo = todoInput.value;
    if (!todo) { return; }

    console.log('Added todo: ', todo);
    todoList.push(todo);
    todoInput.value = ''; // resets to empty
    updateUI();
}

function editTodo(index) {
    todoInput.value = todoList[index];
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false; }
        return true;
    });
    updateUI();
}

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false; }
        return true;
    });
    updateUI();
}

function updateUI() {
    let newInnerHTML = '';

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
        <p>${todoElement}</p>
        <div class="btnContainer">
            <button id="btn-edit" onclick="editTodo(${todoIndex})">
            <img  id="edit-img" src="css/img/edit.png" alt="Edit Todo">
            </button>
            <button id="btn-delete" onclick="deleteTodo(${todoIndex})">
            <img id="delete-img" src="css/img/delete.png" alt="Delete Todo">
            </button>
        </div>
    </div>
        `;
    });

    todoContainer.innerHTML = newInnerHTML;

    // to save to localstorage
    localStorage.setItem('todos', JSON.stringify({ todoList }));
}

addBtn.addEventListener('click', addTodo);
