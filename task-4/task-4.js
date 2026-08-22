/**
 * Skye8 JavaScript Practical Assessment
 * Task 4 - Product Search, Filter and Sort
 *
 * Safe beginner version with debug messages
 */
"use strict";

console.log("=== Task 4 script started ===");

var els = {
  search: document.getElementById("product-search"),
  category: document.getElementById("category-filter"),
  price: document.getElementById("price-filter"),
  sort: document.getElementById("sort-select"),
  grid: document.getElementById("product-grid"),
  count: document.getElementById("product-count"),
  empty: document.getElementById("product-empty"),
};

// Check if elements exist
for (var key in els) {
  if (!els[key]) {
    console.error("Missing element:", key);
  }
}

// Check if PRODUCTS exists
if (typeof PRODUCTS === "undefined") {
  console.error("PRODUCTS is not defined! Check that data.js is loading.");
} else {
  console.log("PRODUCTS loaded successfully. Total products:", PRODUCTS.length);
}

// TODO [T4-01]
function applySearch(products, term) {
  if (!term || term.trim() === "") {
    return products;
  }
  var lowerTerm = term.toLowerCase().trim();
  return products.filter(function (product) {
    return product.name.toLowerCase().indexOf(lowerTerm) !== -1;
  });
}

// TODO [T4-02]
function applyFilters(products, category, priceBand) {
  var result = products;

  if (category && category !== "") {
    result = result.filter(function (product) {
      return product.category === category;
    });
  }

  if (priceBand && priceBand !== "") {
    result = result.filter(function (product) {
      var price = product.price;

      if (priceBand === "0-50000") {
        return price < 50000;
      }
      if (priceBand === "50000-150000") {
        return price >= 50000 && price <= 150000;
      }
      if (priceBand === "150000-500000") {
        return price >= 150000 && price <= 500000;
      }
      if (priceBand === "500000-") {
        return price > 500000;
      }
      return true;
    });
  }

  return result;
}

// TODO [T4-03]
function applySort(products, sortValue) {
  if (!sortValue || sortValue === "") {
    return products;
  }

  var copy = products.slice(); // important: make a copy

  if (sortValue === "price-asc") {
    copy.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  if (sortValue === "price-desc") {
    copy.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return copy;
}

// TODO [T4-04]
function getVisible() {
  if (typeof PRODUCTS === "undefined") {
    return [];
  }

  var term = els.search.value;
  var category = els.category.value;
  var priceBand = els.price.value;
  var sortValue = els.sort.value;

  var result = PRODUCTS;
  result = applySearch(result, term);
  result = applyFilters(result, category, priceBand);
  result = applySort(result, sortValue);

  return result;
}

// TODO [T4-05]
function createProductCard(product) {
  var card = document.createElement("article");
  card.className = "card product-card";

  var title = document.createElement("h3");
  title.className = "product-card__title";
  title.textContent = product.name;

  var category = document.createElement("p");
  category.className = "product-card__category";
  category.textContent = product.category;

  var price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = product.price.toLocaleString() + " XAF";

  var rating = document.createElement("p");
  rating.className = "product-card__rating";
  rating.textContent = "Rating: " + product.rating;

  var stock = document.createElement("p");
  stock.className = "product-card__stock";
  stock.textContent = product.inStock ? "In stock" : "Out of stock";

  card.appendChild(title);
  card.appendChild(category);
  card.appendChild(price);
  card.appendChild(rating);
  card.appendChild(stock);

  return card;
}

// TODO [T4-06]
function renderProducts(products) {
  while (els.grid.firstChild) {
    els.grid.removeChild(els.grid.firstChild);
  }

  for (var i = 0; i < products.length; i++) {
    var card = createProductCard(products[i]);
    els.grid.appendChild(card);
  }
}

// TODO [T4-07]
function renderCount(count) {
  els.count.textContent = count;
}

// TODO [T4-08]
function renderEmptyState(count) {
  if (count === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}

function updateView() {
  var visible = getVisible();
  console.log("Visible products:", visible.length);
  renderProducts(visible);
  renderCount(visible.length);
  renderEmptyState(visible.length);
}

// TODO [T4-09]
function init() {
  console.log("=== init() running ===");

  els.search.addEventListener("input", updateView);
  els.category.addEventListener("change", updateView);
  els.price.addEventListener("change", updateView);
  els.sort.addEventListener("change", updateView);

  updateView();
}

document.addEventListener("DOMContentLoaded", init);
