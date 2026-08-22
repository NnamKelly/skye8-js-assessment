/**
 * Skye8 JavaScript Practical Assessment
 * Task 3 - Persistent To-Do Application
 *
 * Simple beginner-friendly version
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var STORAGE_KEY = "skye8.task3.todos";

var els = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  list: document.getElementById("todo-list"),
  filterAll: document.getElementById("filter-all"),
  filterPending: document.getElementById("filter-pending"),
  filterCompleted: document.getElementById("filter-completed"),
  statTotal: document.getElementById("stat-total"),
  statCompleted: document.getElementById("stat-completed"),
  statPending: document.getElementById("stat-pending"),
  empty: document.getElementById("todo-empty"),
};

/** @type {{ id: string, text: string, completed: boolean, createdAt: string }[]} */
var todos = [];

/** @type {"all"|"pending"|"completed"} */
var currentFilter = "all";

// TODO [T3-01]: Load state from localStorage
function loadState() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }
    var parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    return [];
  }
}

// TODO [T3-02]: Save the current todos array
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// TODO [T3-03]: Validate the submitted text
function validateTodo(text) {
  if (!text || text.trim() === "") {
    return {
      valid: false,
      error: "Task cannot be empty",
    };
  }
  return {
    valid: true,
    error: "",
  };
}

// TODO [T3-04]: Add a new task
function addTodo(text) {
  var newTodo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-05]: Toggle completed status
function toggleTodo(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = !todos[i].completed;
      break;
    }
  }
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-06]: Remove a task
function removeTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-07]: Return the todos that match the current filter
function getFilteredTodos() {
  if (currentFilter === "pending") {
    return todos.filter(function (todo) {
      return todo.completed === false;
    });
  }
  if (currentFilter === "completed") {
    return todos.filter(function (todo) {
      return todo.completed === true;
    });
  }
  return todos; // "all"
}

// TODO [T3-08]: Build the task list
function renderTodos() {
  while (els.list.firstChild) {
    els.list.removeChild(els.list.firstChild);
  }

  var filtered = getFilteredTodos();

  for (var i = 0; i < filtered.length; i++) {
    var todo = filtered[i];

    var li = document.createElement("li");
    li.className = "list-item";
    if (todo.completed) {
      li.className = "list-item list-item--completed";
    }

    var info = document.createElement("div");
    info.className = "list-item__info";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.id = todo.id;

    var textSpan = document.createElement("span");
    textSpan.className = "list-item__title";
    textSpan.textContent = todo.text;

    info.appendChild(checkbox);
    info.appendChild(textSpan);

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger btn--sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = todo.id;

    li.appendChild(info);
    li.appendChild(deleteBtn);
    els.list.appendChild(li);
  }
}

// TODO [T3-09]: Update the counters and empty state
function renderStats() {
  var total = todos.length;
  var completed = 0;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      completed = completed + 1;
    }
  }

  var pending = total - completed;

  els.statTotal.textContent = total;
  els.statCompleted.textContent = completed;
  els.statPending.textContent = pending;

  var filtered = getFilteredTodos();
  if (filtered.length === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}

// Update filter buttons
function updateFilterButtons() {
  els.filterAll.setAttribute("aria-pressed", currentFilter === "all" ? "true" : "false");
  els.filterPending.setAttribute("aria-pressed", currentFilter === "pending" ? "true" : "false");
  els.filterCompleted.setAttribute(
    "aria-pressed",
    currentFilter === "completed" ? "true" : "false",
  );

  els.filterAll.classList.toggle("is-active", currentFilter === "all");
  els.filterPending.classList.toggle("is-active", currentFilter === "pending");
  els.filterCompleted.classList.toggle("is-active", currentFilter === "completed");
}

// TODO [T3-10]: Start the application
function init() {
  // Load saved tasks
  todos = loadState();

  // Form submit
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = els.input.value;
    var result = validateTodo(text);

    if (!result.valid) {
      return;
    }

    addTodo(text);
    els.form.reset();
    els.input.focus();
  });

  // Filter buttons
  els.filterAll.addEventListener("click", function () {
    currentFilter = "all";
    updateFilterButtons();
    renderTodos();
    renderStats();
  });

  els.filterPending.addEventListener("click", function () {
    currentFilter = "pending";
    updateFilterButtons();
    renderTodos();
    renderStats();
  });

  els.filterCompleted.addEventListener("click", function () {
    currentFilter = "completed";
    updateFilterButtons();
    renderTodos();
    renderStats();
  });

  // Delete button
  els.list.addEventListener("click", function (event) {
    if (event.target.matches("button[data-id]")) {
      var id = event.target.dataset.id;
      removeTodo(id);
    }
  });

  // Checkbox toggle
  els.list.addEventListener("change", function (event) {
    if (event.target.matches("input[type='checkbox'][data-id]")) {
      var id = event.target.dataset.id;
      toggleTodo(id);
    }
  });

  // First render
  updateFilterButtons();
  renderTodos();
  renderStats();
}

document.addEventListener("DOMContentLoaded", init);
