/**
 * Skye8 JavaScript Practical Assessment
 * Task 3 - Persistent To-Do Application
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
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
{
  id: ("1724241234567",
    (text = "Buy milk"),
    (completed = false),
    (createdAt = "2026-08-21T14:30:00.000Z"));
}

// TODO [T3-01]: Load state from localStorage under STORAGE_KEY.
// Parse with JSON.parse inside a try/catch. Corrupt or absent data
// must produce an empty array, never a thrown error.
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

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
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

// TODO [T3-04]: Add a new task to state, save, and re-render.
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
// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
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
// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  saveState();
  renderTodos();
  renderStats();
}
// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
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

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
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
// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
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

function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.
}

document.addEventListener("DOMContentLoaded", init);
