// Handle Signup Form Submission
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Simple validation
  if (!name || !email) {
    alert("Please fill in all fields");
    return;
  }

  // Success message
  alert(`Thank you, ${name}! We'll send updates to ${email}`);

  form.reset();
}

// Dark Mode Toggle
function toggleTheme() {
  const html = document.documentElement;
  const toggleBtn = document.querySelector(".theme-toggle");

  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (toggleBtn) {
    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  }
}


// Mobile Menu Toggle
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Landing page loaded successfully");


  // Theme Init
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);

  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    toggleBtn.addEventListener("click", toggleTheme);
  }


  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", toggleMenu);

    // Close menu when link clicked (UX improvement)
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Feature Card Hover Effect
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});
