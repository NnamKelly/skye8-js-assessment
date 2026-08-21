/**
 * Skye8 JavaScript Practical Assessment
 * Task 2 - Student Grade Manager
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("student-form"),
  name: document.getElementById("student-name"),
  score: document.getElementById("student-score"),
  list: document.getElementById("student-list"),
  average: document.getElementById("stat-average"),
  highest: document.getElementById("stat-highest"),
  lowest: document.getElementById("stat-lowest"),
  count: document.getElementById("stat-count"),
  empty: document.getElementById("student-empty"),
};

/** @type {{ id: string, name: string, score: number, grade: string }[]} */
let students = [];
{
  id: ("1724240000000", (name = "Jane Doe"), (score = 85), (grade = "A"));
}

// TODO [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
// Check if all elements exist
function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
// TODO [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a
// score above 100.
function validateStudent(name, score) {
  return { valid: false, errors: {} };
}

// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {}

// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {
  return { average: "-", highest: "-", lowest: "-", count: 0 };
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
