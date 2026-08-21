/**
 * Skye8 JavaScript Practical Assessment
 * Task 1 - Interactive Expense Calculator
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("expense-form"),
  name: document.getElementById("expense-name"),
  amount: document.getElementById("expense-amount"),
  list: document.getElementById("expense-list"),
  total: document.getElementById("expense-total"),
  count: document.getElementById("expense-count"),
  empty: document.getElementById("expense-empty"),
};

/** @type {{ id: string, name: string, amount: number }[]} */
let expenses = [];

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
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

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {}

// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  return 0;
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {}

function init() {
  // TODO [T1-07]: Bind the form submit and the delete delegation, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
