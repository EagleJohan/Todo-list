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

    //Create checkbox for mark as complete

    //Create input for input value

    //Create delete button

    //Append all previous objects to listelement

    //Apend to list of todos
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
  e.defaultPrevented();

  addTodo();
});
