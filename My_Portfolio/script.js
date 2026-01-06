// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});


// Active Nav Link on Scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});


// Contact Form Elements
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


// EmailJS Init (ONLY ONCE)
emailjs.init("S21fCk9WzVlB0Bc3-");


// Contact Form Validation + Email
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear errors
  document.querySelectorAll(".error-message").forEach((msg) => {
    msg.classList.remove("show");
    msg.textContent = "";
  });

  successMessage.classList.remove("show");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true;

  if (!name || name.length < 2) {
    showError("nameError", "Name must be at least 2 characters");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError("emailError", "Please enter a valid email");
    isValid = false;
  }

  if (!message || message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    emailjs
      .send("service_575555c", "template_jab8cvm", {
        from_name: name,
        reply_to: email,
        message: message,
      })
      .then(() => {
        successMessage.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 5000);
      })
      .catch(() => {
        alert("Failed to send message. Please try again.");
      });
  }
});

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.add("show");
}


// Smooth Scroll Offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const element = document.querySelector(href);
      const navHeight = navbar.offsetHeight;
      const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        20;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  });
});


// Scroll Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
);

document
  .querySelectorAll(".project-card, .feature-card, .skill-category")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });


// Button Ripple Effect
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// Get In Touch Button
const getInTouchBtn = document.querySelector(".btn-cta");
getInTouchBtn.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");
  const navHeight = navbar.offsetHeight;

  const position =
    contactSection.getBoundingClientRect().top +
    window.scrollY -
    navHeight -
    20;

  window.scrollTo({ top: position, behavior: "smooth" });
});


// Theme Toggle

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
}
