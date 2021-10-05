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
const count = 0;

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

  const listObjects = document.querySelectorAll("li");
  const numberOfListObjects = listObjects.length;
  if (numberOfListObjects === 0) {
    uList.appendChild(template.cloneNode(true).content);
  } else {
    uList.append(template.cloneNode(true).content);
  }
  let checkboxes = document.querySelectorAll(".completed-box");
  let lastChkBox = checkboxes[checkboxes.length - 1];

  let deletButtons = document.querySelectorAll(".btn-delete");
  let lastDelBtn = deletButtons[deletButtons.length - 1];

  let listElements = document.querySelectorAll("li");
  let lastListEl = listElements[listElements.length - 1];

  let regTodos = document.querySelectorAll(".reg-todo");
  let lastRegTodo = regTodos[regTodos.length - 1];

  let checkmarks = document.querySelectorAll(".checkmark");
  let lastCheckmark = checkmarks[checkmarks.length - 1];

  lastChkBox.addEventListener("click", () => {
    // Toggle completed
    lastListEl.classList.toggle("completed");
    lastCheckmark.classList.toggle("checkedmark");

    updateTodo();
  });

  lastRegTodo.value = inputValue;
  lastRegTodo.readOnly = true;
  lastRegTodo.addEventListener("dblclick", () => {
    // inputTodo.removeAttribute("readOnly");
    lastRegTodo.readOnly = false;
  });
  lastRegTodo.addEventListener("focusout", () => {
    lastRegTodo.readOnly = true;
  });
  lastRegTodo.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      lastRegTodo.readOnly = true;
    }
  });

  //Delete button event
  lastDelBtn.addEventListener("click", () => {
    lastListEl.remove();
  });

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
    buttonClearCompleted.classList.remove("invisible");
  } else {
    buttonClearCompleted.classList.add("invisible");
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
  console.log(hash);
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
window.addEventListener("hashchange", onHash);
window.addEventListener("load", onHash);

buttonClearCompleted.addEventListener("click", removeAllCompleted);

loadTodos();
