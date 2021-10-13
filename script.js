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
  if (localStorage.getItem("todos") === null) {
  } else {
    const localTodos = JSON.parse(localStorage.getItem("todos"));

    if (localTodos.length > 0) {
      localTodos.forEach((item) => {
        if (item.text.length > 0) {
          addTodo(item.text, item.completed);
        }
      });
    }
  }
}

function addTodo(inputValue, completed = false) {
  //Create listelement
  const listElement = document.createElement("li");
  listElement.classList.add("list-todo");
  //Create container for todos and delete and checkbox
  const container = document.createElement("div");
  container.classList.add("list-object");
  //Create checkbox for mark as complete
  const checkboxContainer = document.createElement("span");

  checkboxContainer.classList.add("checkbox-container");
  //An empty checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("completed-box");
  checkboxContainer.appendChild(checkbox);
  //Completed checkbox
  const checkMark = document.createElement("span");
  checkMark.classList.add("checkmark");
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-check");
  checkMark.appendChild(icon);
  //Append children to element
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkMark);
  checkbox.addEventListener("click", () => {
    listElement.classList.toggle("completed");
    checkMark.classList.toggle("checkedmark");

    updateTodo();
  });
  //Add completed classes if completed
  if (completed) {
    listElement.classList.add("completed");
    checkMark.classList.toggle("checkedmark");
  }

  //Create delete button
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn-delete");
  buttonDelete.type = "button";
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-times", "fa-2x");
  buttonDelete.appendChild(deleteIcon);
  //Delete button event
  buttonDelete.addEventListener("click", () => {
    listElement.remove();
    updateTodo();
  });

  //Create input for input value
  const inputTodo = document.createElement("input");
  inputTodo.setAttribute("type", "text");
  inputTodo.classList.add("reg-todo");
  inputTodo.setAttribute("value", inputValue);
  inputTodo.readOnly = true;
  inputTodo.addEventListener("dblclick", () => {
    // inputTodo.removeAttribute("readOnly");
    inputTodo.readOnly = false;
    //Hide checkbox and deletebutton
    buttonDelete.style.display = "none";
    checkboxContainer.style.visibility = "hidden";
  });
  inputTodo.addEventListener("focusout", () => {
    inputTodo.readOnly = true;

    buttonDelete.style.display = "inline-block";
    checkboxContainer.style.visibility = "visible";
    inputTodo.setAttribute("value", inputTodo.value);

    updateTodo();
  });
  inputTodo.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      inputTodo.readOnly = true;

      buttonDelete.style.display = "inline-block";
      checkboxContainer.style.visibility = "visible";
      inputTodo.setAttribute("value", inputTodo.value);

      updateTodo();
    }
  });
  // inputTodo.addEventListener("change", () => {
  //   updateTodo();
  // });

  //Append all previous objects to listelement
  container.appendChild(checkboxContainer);
  container.appendChild(inputTodo);
  container.appendChild(buttonDelete);

  //Apend to list of todos
  listElement.appendChild(container);
  todos.appendChild(listElement);

  updateTodo();
}

// Update todo list
function updateTodo() {
  //Get all list elements from unordered list
  const listElements = document.querySelectorAll(".list-todo");

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

  //If there is any todo, toggle visibility styling
  if (listElements.length > 0) {
    footer.style.display = "flex";
    buttonCompleteAll.style.opacity = "0.4";
  } else {
    footer.style.display = "none";
    buttonCompleteAll.style.opacity = "0";
  }

  if (completedElements > 0) {
    buttonCompleteAll.style.opacity = "1";
  }

  //If there is a completed todo, change visibility styling
  if (completedElements > 0) {
    buttonClearCompleted.style.visibility = "visible";
  } else {
    buttonClearCompleted.style.visibility = "hidden";
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

  listElements.forEach((element) => {
    if (element.children[0].children[1].value.length < 1) {
      element.remove();
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
        element.children[0].children[0].children[1].classList.toggle(
          "checkedmark",
          false
        );
      }
    });
  } else {
    //else remove all completed
    listElements.forEach((element) => {
      if (!element.classList.contains("completed")) {
        element.classList.add("completed");
        element.children[0].children[0].children[1].classList.toggle(
          "checkedmark",
          true
        );
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

function onHash() {
  const hash = location.hash.toString().substring(1);
  if (hash === "active") {
    filterByActive();
  } else if (hash === "completed") {
    filterByCompleted();
  } else {
    removeFilter();
  }
}

/*==========Event handlers==========*/
// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo(input.value);
  input.value = "";
});

buttonCompleteAll.addEventListener("click", toggleAllTodos);

buttonFilterNone.addEventListener("click", removeFilter);
buttonFilterActive.addEventListener("click", filterByActive);
buttonFilterCompleted.addEventListener("click", filterByCompleted);
window.addEventListener("hashchange", (e) => {
  const hash = location.hash.toString().substring(1);
  if (hash === "active") {
    filterByActive();
  } else if (hash === "completed") {
    filterByCompleted();
  } else {
    removeFilter();
  }
});
window.addEventListener("hashchange", onHash);
window.addEventListener("load", onHash);

buttonClearCompleted.addEventListener("click", removeAllCompleted);

loadTodos();
