// Savour Lagos Kitchen - JavaScript
// Features: footer year, mobile menu toggle, menu category filter, contact form validation.

// ----- 1. Footer year (variables + DOM) -----
var yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ----- 2. Mobile navigation toggle (event handling) -----
var navToggle = document.getElementById("navToggle");
var mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ----- 3. Interactive feature: filter the menu by category -----
var filterButtons = document.querySelectorAll(".filter-btn");
var menuCards = document.querySelectorAll("#menuGrid .card");
var filterStatus = document.getElementById("filterStatus");

function filterMenu(category) {
  var shown = 0;
  menuCards.forEach(function (card) {
    var match = category === "all" || card.dataset.category === category;
    card.classList.toggle("hidden", !match);
    if (match) shown++;
  });
  if (filterStatus) {
    var label = category === "all" ? "all" : category;
    filterStatus.textContent = "Showing " + shown + (shown === 1 ? " dish" : " dishes") + " (" + label + ")";
  }
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    filterMenu(button.dataset.filter);
  });
});

// ----- 4. Contact form validation -----
var form = document.getElementById("contactForm");

function setError(input, message) {
  var field = input.closest(".field");
  field.classList.remove("valid");
  field.classList.add("invalid");
  field.querySelector(".error").textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function setValid(input) {
  var field = input.closest(".field");
  field.classList.remove("invalid");
  field.classList.add("valid");
  field.querySelector(".error").textContent = "";
  input.setAttribute("aria-invalid", "false");
}

// Each function returns true when the field is valid
function validateName() {
  var input = document.getElementById("fullName");
  var value = input.value.trim();
  if (value === "") { setError(input, "Please enter your full name."); return false; }
  if (value.length < 3) { setError(input, "Name must be at least 3 characters."); return false; }
  if (!/^[A-Za-z\s'.-]+$/.test(value)) { setError(input, "Name can only contain letters and spaces."); return false; }
  setValid(input);
  return true;
}

function validateEmail() {
  var input = document.getElementById("email");
  var value = input.value.trim();
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (value === "") { setError(input, "Please enter your email address."); return false; }
  if (!pattern.test(value)) { setError(input, "Enter a valid email, e.g. name@example.com."); return false; }
  setValid(input);
  return true;
}

function validateSubject() {
  var input = document.getElementById("subject");
  var value = input.value.trim();
  if (value === "") { setError(input, "Please enter a subject."); return false; }
  if (value.length < 5) { setError(input, "Subject must be at least 5 characters."); return false; }
  setValid(input);
  return true;
}

function validateMessage() {
  var input = document.getElementById("message");
  var value = input.value.trim();
  if (value === "") { setError(input, "Please write a message."); return false; }
  if (value.length < 15) { setError(input, "Message must be at least 15 characters (" + value.length + " so far)."); return false; }
  setValid(input);
  return true;
}

if (form) {
  var validators = {
    fullName: validateName,
    email: validateEmail,
    subject: validateSubject,
    message: validateMessage
  };
  var feedback = document.getElementById("formFeedback");

  // Live feedback: validate each field when the user leaves it
  Object.keys(validators).forEach(function (id) {
    var input = document.getElementById(id);
    input.addEventListener("blur", validators[id]);
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("invalid")) validators[id]();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    // Run every validator (no short-circuit, so all errors show at once)
    var results = Object.keys(validators).map(function (id) { return validators[id](); });
    var allValid = results.every(Boolean);

    if (allValid) {
      feedback.className = "form-feedback success";
      feedback.textContent = "Thank you, " + document.getElementById("fullName").value.trim().split(" ")[0] +
        "! Your form passed validation. (This is a demo, so no message was actually sent.)";
      form.reset();
      form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("valid"); });
    } else {
      feedback.className = "form-feedback fail";
      feedback.textContent = "Please fix the highlighted fields and try again.";
      form.querySelector(".invalid input, .invalid textarea").focus();
    }
  });
}
