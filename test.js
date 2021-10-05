//Add todo
function addTodo(inputValue, completed = false) {
  const template = document.getElementById("li-template");
  const uList = document.getElementById("todos");
  const clone = template.cloneNode(true).content;

  console.log(clone);
  console.log(template.content.children[0].children[0]);
  uList.appendChild(template.cloneNode(true).content);

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
