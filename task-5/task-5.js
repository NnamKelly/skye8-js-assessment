/**
 * Skye8 JavaScript Practical Assessment
 * Task 5 - Interactive Sales Dashboard
 *
 * Simple beginner-friendly version
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var els = {
  search: document.getElementById("sales-search"),
  category: document.getElementById("sales-category"),
  sort: document.getElementById("sales-sort"),
  tableBody: document.getElementById("sales-table-body"),
  kpiRevenue: document.getElementById("kpi-revenue"),
  kpiOrders: document.getElementById("kpi-orders"),
  kpiUnits: document.getElementById("kpi-units"),
  kpiAov: document.getElementById("kpi-aov"),
  kpiTopProduct: document.getElementById("kpi-top-product"),
  kpiTopCategory: document.getElementById("kpi-top-category"),
  empty: document.getElementById("sales-empty"),
};

// Helper: format money nicely
function formatMoney(amount) {
  return amount.toLocaleString() + " XAF";
}

// TODO [T5-01]: Filter by search term
function applySearch(records, term) {
  if (!term || term.trim() === "") {
    return records;
  }

  var lowerTerm = term.toLowerCase().trim();

  return records.filter(function (record) {
    return record.product.toLowerCase().indexOf(lowerTerm) !== -1;
  });
}

// TODO [T5-02]: Filter by category
function applyFilters(records, category) {
  if (!category || category === "") {
    return records;
  }

  return records.filter(function (record) {
    return record.category === category;
  });
}

// TODO [T5-03]: Sort a COPY of the array
function applySort(records, sortValue) {
  if (!sortValue || sortValue === "") {
    return records;
  }

  // Always work on a copy
  var copy = records.slice();

  if (sortValue === "revenue-desc") {
    copy.sort(function (a, b) {
      return b.quantity * b.price - a.quantity * a.price;
    });
  }

  if (sortValue === "revenue-asc") {
    copy.sort(function (a, b) {
      return a.quantity * a.price - b.quantity * b.price;
    });
  }

  if (sortValue === "date-desc") {
    copy.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  if (sortValue === "date-asc") {
    copy.sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
  }

  if (sortValue === "quantity-desc") {
    copy.sort(function (a, b) {
      return b.quantity - a.quantity;
    });
  }

  return copy;
}

// TODO [T5-04]: Compose search + filter + sort
function getVisible() {
  var term = els.search.value;
  var category = els.category.value;
  var sortValue = els.sort.value;

  var result = SALES;
  result = applySearch(result, term);
  result = applyFilters(result, category);
  result = applySort(result, sortValue);

  return result;
}

// TODO [T5-05]: Calculate total revenue
function calcRevenue(records) {
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total = total + records[i].quantity * records[i].price;
  }
  return total;
}

// TODO [T5-06]: Calculate total units
function calcUnits(records) {
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total = total + records[i].quantity;
  }
  return total;
}

// TODO [T5-07]: Best-selling product by units
function findTopProduct(records) {
  if (records.length === 0) {
    return "-";
  }

  var productUnits = {};

  for (var i = 0; i < records.length; i++) {
    var name = records[i].product;
    var qty = records[i].quantity;

    if (!productUnits[name]) {
      productUnits[name] = 0;
    }
    productUnits[name] = productUnits[name] + qty;
  }

  var topName = "-";
  var topUnits = -1;

  for (var name in productUnits) {
    if (productUnits[name] > topUnits) {
      topUnits = productUnits[name];
      topName = name;
    }
  }

  return topName;
}

// TODO [T5-08]: Best-selling category by revenue
function findTopCategory(records) {
  if (records.length === 0) {
    return "-";
  }

  var categoryRevenue = {};

  for (var i = 0; i < records.length; i++) {
    var cat = records[i].category;
    var revenue = records[i].quantity * records[i].price;

    if (!categoryRevenue[cat]) {
      categoryRevenue[cat] = 0;
    }
    categoryRevenue[cat] = categoryRevenue[cat] + revenue;
  }

  var topCat = "-";
  var topRev = -1;

  for (var cat in categoryRevenue) {
    if (categoryRevenue[cat] > topRev) {
      topRev = categoryRevenue[cat];
      topCat = cat;
    }
  }

  return topCat;
}

// TODO [T5-09]: Update all six KPIs (from the filtered set!)
function renderKPIs(records) {
  var count = records.length;

  if (count === 0) {
    els.kpiRevenue.textContent = "-";
    els.kpiOrders.textContent = "0";
    els.kpiUnits.textContent = "0";
    els.kpiAov.textContent = "-";
    els.kpiTopProduct.textContent = "-";
    els.kpiTopCategory.textContent = "-";
    return;
  }

  var revenue = calcRevenue(records);
  var units = calcUnits(records);
  var aov = revenue / count;

  els.kpiRevenue.textContent = formatMoney(revenue);
  els.kpiOrders.textContent = count;
  els.kpiUnits.textContent = units;
  els.kpiAov.textContent = formatMoney(Math.round(aov));
  els.kpiTopProduct.textContent = findTopProduct(records);
  els.kpiTopCategory.textContent = findTopCategory(records);
}

// TODO [T5-10]: Build the table rows
function renderTable(records) {
  // Clear old rows
  while (els.tableBody.firstChild) {
    els.tableBody.removeChild(els.tableBody.firstChild);
  }

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var revenue = record.quantity * record.price;

    var tr = document.createElement("tr");

    var cells = [
      record.date,
      record.product,
      record.category,
      record.quantity,
      formatMoney(record.price),
      formatMoney(revenue),
      record.region,
    ];

    for (var j = 0; j < cells.length; j++) {
      var td = document.createElement("td");
      td.textContent = cells[j];
      tr.appendChild(td);
    }

    els.tableBody.appendChild(tr);
  }

  // Empty state
  if (records.length === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}

// Populate category dropdown from the dataset
function populateCategories() {
  var categories = [];

  for (var i = 0; i < SALES.length; i++) {
    var cat = SALES[i].category;
    if (categories.indexOf(cat) === -1) {
      categories.push(cat);
    }
  }

  // Sort alphabetically for nicer look
  categories.sort();

  for (var i = 0; i < categories.length; i++) {
    var option = document.createElement("option");
    option.value = categories[i];
    option.textContent = categories[i];
    els.category.appendChild(option);
  }
}

// Main update function
function updateView() {
  var visible = getVisible();
  renderKPIs(visible);
  renderTable(visible);
}

// TODO [T5-11]: Start the application
function init() {
  // 1. Fill the category dropdown
  populateCategories();

  // 2. Bind controls
  els.search.addEventListener("input", updateView);
  els.category.addEventListener("change", updateView);
  els.sort.addEventListener("change", updateView);

  // 3. First render
  updateView();
}

document.addEventListener("DOMContentLoaded", init);
