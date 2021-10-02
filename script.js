/*==========Global variables==========*/
const form = document.getElementById("form");
const input = document.getElementById("input-todo");
const todos = document.getElementById("todos");
const buttonCompleteAll = document.getElementById("complete-all-btn");
const footer = document.getElementById("footer");
const buttonFilterNone = document.getElementById("filter-all");
const buttonFilterActive = document.getElementById("filter-active");
const buttonFilterCompleted = document.getElementById("filter-completed");
const todosRemaining = document.getElementById("todos-remaining");
const buttonClearCompleted = document.getElementById("clear-completed");

/*==========Functions==========*/

function loadTodos() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));
  if (localTodos.length > 0) {
    localTodos.forEach((item) => {
      if (item.text.length > 0) {
        addTodo(item.text, item.completed);
      }
    });
  }
}
// Add todo
function addTodo(inputValue, completed = false) {
  const template = document.getElementById("li-template");
  const uList = document.getElementById("todos");
  const listElement = document.querySelector("li");

  const listObjects = document.querySelectorAll("li");
  const numberOfListObjects = listObjects.length;
  if (numberOfListObjects === 0) {
    uList.appendChild(template.cloneNode(true).content);
  } else {
    console.log("Li already exists");
  }

  //Create listelement
  //   const listElement = document.createElement("li");

  //   if (completed) {
  //     listElement.classList.add("completed");
  //   }

  //Create container for todos and delete and checkbox
  //   const container = document.createElement("div");
  //Create checkbox for mark as complete
  //   const checkbox = document.createElement("input");
  //   checkbox.setAttribute("type", "checkbox");
  const checkbox = document.querySelector(".completed-box");
  checkbox.addEventListener("click", () => {
    // Toggle completed
    listElement.classList.toggle("completed");
    updateTodo();
  });

  //Create input for input value
  //   const inputTodo = document.createElement("input");
  const inputTodo = document.querySelector(".reg-todo");
  //   inputTodo.setAttribute("type", "text");
  inputTodo.value = inputValue;
  inputTodo.readOnly = true;
  inputTodo.addEventListener("dblclick", () => {
    // inputTodo.removeAttribute("readOnly");
    inputTodo.readOnly = false;
  });
  inputTodo.addEventListener("focusout", () => {
    inputTodo.readOnly = true;
  });
  inputTodo.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      inputTodo.readOnly = true;
    }
  });

  //Create delete button
  const buttonDelete = document.querySelector(".btn-delete");
  //   buttonDelete.type = "button";
  //   const deleteIcon = document.createElement("i");
  //   deleteIcon.classList.add("fas", "fa-times", "fa-2x");
  //   buttonDelete.appendChild(deleteIcon);

  //Delete button event
  buttonDelete.addEventListener("click", () => {
    listElement.remove();
  });

  //Append all previous objects to listelement
  //   container.appendChild(checkbox);
  //   container.appendChild(inputTodo);
  //   container.appendChild(buttonDelete);

  //Apend to list of todos
  //   listElement.appendChild(container);
  //   todos.appendChild(listElement);

  updateTodo();

  document.getElementById("complete-all-btn").style.opacity = 1;
  input.value = "";
}

// Update todo list
function updateTodo() {
  //Get all list elements from unordered list
  const listElements = document.querySelectorAll("li");

  const todosArray = [];

  listElements.forEach((element) => {
    todosArray.push({
      text: element.children[0].children[1].value,
      completed: element.classList.contains("completed") ? true : false,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todosArray));

  //How many of the list elements has the class completed
  const completedElements = document.querySelectorAll(".completed").length;
  const count = listElements.length - completedElements;

  //Update todos remaining
  todosRemaining.textContent = `${count} item${count > 1 ? "s" : ""} left`;

  //If there is any todo, remove hidden class from footer
  if (listElements.length > 0) {
    footer.classList.remove("hidden");
  }

  //If there is a completed todo, remove hidden from clear-completed
  if (completedElements > 0) {
    buttonClearCompleted.classList.remove("hidden");
  } else {
    buttonClearCompleted.classList.add("hidden");
  }

  //Checks the checkbox if it is completed
  listElements.forEach((element) => {
    if (element.classList.contains("completed")) {
      //called first child of first child which should be checkbox
      element.children[0].children[0].checked = true;
    } else {
      element.children[0].children[0].checked = false;
    }
  });
}

// Toggle all todos as completed
function toggleAllTodos() {
  //Get all list elements from unordered list
  const listElements = document.querySelectorAll("li");
  const countCompletedElements = document.querySelectorAll(".completed").length;

  //if all elements is not completed
  //Add class completed on all
  if (listElements.length === countCompletedElements) {
    listElements.forEach((element) => {
      if (element.classList.contains("completed")) {
        element.classList.remove("completed");
      }
    });
  } else {
    //else remove all completed
    listElements.forEach((element) => {
      if (!element.classList.contains("completed")) {
        element.classList.add("completed");
      }
    });
  }

  updateTodo();
}

// No filter
function removeFilter() {
  const listElement = document.querySelectorAll("li");

  listElement.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
  });

  location.hash = "";

  updateTodo();
}
// Filter by active
function filterByActive() {
  const listElement = document.querySelectorAll("li");

  listElement.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
  });
  location.hash = "active";

  updateTodo();
}
// Filter by completed
function filterByCompleted() {
  const listElement = document.querySelectorAll("li");

  listElement.forEach((element) => {
    if (!element.classList.contains("completed")) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
  });

  location.hash = "completed";
  updateTodo();
}
// Clear all marked as completed
function removeAllCompleted() {
  const listElement = document.querySelectorAll("li");

  listElement.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.remove();
    }
  });
  updateTodo();
}

/*==========Event handlers==========*/
// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo(input.value);
});

buttonCompleteAll.addEventListener("click", toggleAllTodos);

buttonFilterNone.addEventListener("click", removeFilter);
buttonFilterActive.addEventListener("click", filterByActive);
buttonFilterCompleted.addEventListener("click", filterByCompleted);
window.addEventListener("hashchange", (e) => {
  const hash = location.hash.toString().substring(1);
  console.log(hash);
  if (hash === "active") {
    filterByActive();
  } else if (hash === "completed") {
    filterByCompleted();
  } else {
    removeFilter();
  }
});

buttonClearCompleted.addEventListener("click", removeAllCompleted);

loadTodos();
