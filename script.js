/*==========Global variables==========*/
const form = document.getElementById("form");
const input = document.getElementById("input-todo");
const todos = document.getElementById("todos");
const buttonCompleteAll = document.getElementById("complete-all-btn");
const footer = document.getElementById("footer");
const buttonFilterAll = document.getElementById("filter-all");
const buttonFilterActive = document.getElementById("filter-active");
const buttonFilterCompleted = document.getElementById("filter-completed");
const todosRemaining = document.getElementById("todos-remaining");
const buttonClearCompleted = document.getElementById("clear-completed");

/*==========Functions==========*/
// Add todo
function addTodo(){
    //Create listelement
    const listElement = document.createElement("li");

    //Create container for todos and delete and checkbox
    const container = document.createElement("div");

    //Create checkbox for mark as complete
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox")
    checkbox.addEventListener("click", () => {
        listElement.classList.toggle("completed");
    })

    //Create input for input value
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.value = input.value;
    inputTodo.disabled = true;

    //Create delete button
    const buttonDelete = document.createElement("button")
    buttonDelete.type = "button";
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-times", "fa-2x");
    buttonDelete.appendChild(deleteIcon);
    //Delete button event
    buttonDelete.addEventListener("click", () => {
        listElement.remove();
    })


    //Append all previous objects to listelement
    container.appendChild(checkbox);
    container.appendChild(inputTodo);
    container.appendChild(buttonDelete);

    //Apend to list of todos
    listElement.appendChild(container);
    todos.appendChild(listElement);
}

// Update todo list

// Toggle all todos as completed

// Toggle completed

// Remove filter

// Filter by active

// Filter by completed

// Clear all marked as completed

/*==========Event handlers==========*/
// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});
