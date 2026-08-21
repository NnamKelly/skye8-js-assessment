"use strict";

const els = {
  form: document.getElementById("expense-form"),
  name: document.getElementById("expense-name"),
  amount: document.getElementById("expense-amount"),
  list: document.getElementById("expense-list"),
  total: document.getElementById("expense-total"),
  count: document.getElementById("expense-count"),
  empty: document.getElementById("expense-empty"),
  nameError: document.getElementById("expense-name-error"),
  amountError: document.getElementById("expense-amount-error"),
};

let expenses = [];

// validation
function validateExpense(name, amount) {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Expense name is required";
  }

  if (amount === "" || amount === null || amount === undefined) {
    errors.amount = "Amount is required";
  } else {
    const num = Number(amount);
    if (isNaN(num)) {
      errors.amount = "Amount must be a number";
    } else if (num <= 0) {
      errors.amount = "Amount must be greater than zero";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors,
  };
}
// add expenses
function addExpense(name, amount) {
  const newExpense = {
    id: Date.now().toString(),
    name: name.trim(),
    amount: Number(amount),
  };

  expenses.push(newExpense);
  renderExpenses();
  renderSummary();
}

// remove expense
function removeExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  renderExpenses();
  renderSummary();
}

// calculate total
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

// render list
function renderExpenses() {
  // Clear old list
  while (els.list.firstChild) {
    els.list.removeChild(els.list.firstChild);
  }

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const li = document.createElement("li");
    li.className = "list-item";

    // Name + Amount
    const info = document.createElement("div");
    info.className = "list-item__info";

    const nameEl = document.createElement("span");
    nameEl.className = "list-item__title";
    nameEl.textContent = expense.name;

    const amountEl = document.createElement("span");
    amountEl.className = "list-item__meta";
    amountEl.textContent = "₦" + expense.amount.toFixed(2);

    info.appendChild(nameEl);
    info.appendChild(amountEl);

    // Delete button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--danger btn--sm";
    btn.textContent = "Delete";
    btn.dataset.id = expense.id; // modern way

    li.appendChild(info);
    li.appendChild(btn);
    els.list.appendChild(li);
  }
}

//render summary and empty state
function renderSummary() {
  const total = calculateTotal();
  const count = expenses.length;

  // Update numbers
  if (count === 0) {
    els.total.textContent = "-";
  } else {
    els.total.textContent = "₦" + total.toFixed(2);
  }
  els.count.textContent = count;

  // Show / hide empty state
  if (count === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}

//helpers
function clearErrors() {
  els.nameError.textContent = "";
  els.amountError.textContent = "";
}

function showErrors(errors) {
  if (errors.name) {
    els.nameError.textContent = errors.name;
  }
  if (errors.amount) {
    els.amountError.textContent = errors.amount;
  }
}

// start
function init() {
  // Safety check – if any element is missing, stop and warn
  for (let key in els) {
    if (!els[key]) {
      console.error("Missing element:", key);
      return;
    }
  }

  // Form submit
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = els.name.value;
    const amount = els.amount.value;

    const result = validateExpense(name, amount);

    if (!result.valid) {
      showErrors(result.errors);
      return;
    }

    addExpense(name, amount);
    els.form.reset();
    els.name.focus();
  });

  // Delete button clicks
  els.list.addEventListener("click", function (event) {
    if (event.target.matches("button[data-id]")) {
      const id = event.target.dataset.id;
      removeExpense(id);
    }
  });

  // First render
  renderExpenses();
  renderSummary();
}

document.addEventListener("DOMContentLoaded", init);
