"use strict";

// MOBILE NAVIGATION: toggle the menu and close it after a selection or outside click.
const menuButton = document.getElementById("menu-toggle");
const navigationMenu = document.getElementById("nav-menu");

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!menuIsOpen));
    navigationMenu.classList.toggle("menu-open", !menuIsOpen);
  });

  navigationMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (!navigationMenu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) closeMenu();
  });
}

function closeMenu() {
  if (!menuButton || !navigationMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigationMenu.classList.remove("menu-open");
}

// DARK MODE: update the page theme and remember the visitor's preference.
const themeButton = document.getElementById("dark-mode-btn");
let settings = loadSettings();

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("dark-mode", isDark);

  if (themeButton) {
    themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeButton.setAttribute("aria-pressed", String(isDark));
  }
}

applyTheme(settings.theme);

if (themeButton) {
  themeButton.addEventListener("click", function () {
    settings.theme = document.documentElement.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(settings.theme);
    saveSettings(settings);
  });
}

// VISIT HISTORY: update the last-visit timestamp without losing other settings.
settings.lastVisit = new Date().toISOString();
saveSettings(settings);

// DYNAMIC PROJECTS: build the project cards from this array instead of hard-coding them in HTML.
const projects = [
  {
    title: "T-shirt Designing",
    description: "Creating customized clothing through digital design.",
    image: "assets/project1.jpg",
    imageAlt: "T-shirt design project"
  },
  {
    title: "Broadcasting",
    description: "Developing communication and presenting skills through broadcasting.",
    image: "assets/project3.jpg",
    imageAlt: "Broadcasting project"
  },
  {
    title: "Filmmaking",
    description: "Creating stories through film, editing, and visual production.",
    image: "assets/project2.jpg",
    imageAlt: "Filmmaking project"
  }
];

const projectContainer = document.getElementById("project-container");

if (projectContainer) {
  if (projects.length === 0) {
    projectContainer.textContent = "No projects are available yet.";
  } else {
    const projectCards = document.createDocumentFragment();

    projects.forEach(function (project) {
      if (!project || !project.title || !project.description) return;

      const card = document.createElement("article");
      card.classList.add("project-card");

      if (project.image) {
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.imageAlt || project.title;
        image.classList.add("project-img");
        card.appendChild(image);
      }

      const title = document.createElement("h3");
      title.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      card.append(title, description);
      projectCards.appendChild(card);
    });

    projectContainer.appendChild(projectCards);
  }
}

// CONTACT FORM: validate input locally. This demo does not send an email.
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("form-status");

  const errorElements = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    message: document.getElementById("message-error")
  };

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    let isValid = true;

    Object.values(errorElements).forEach(function (element) {
      if (element) element.textContent = "";
    });
    formStatus.textContent = "";

    if (!name) {
      errorElements.name.textContent = "Please enter your name.";
      isValid = false;
    } else if (name.length > 100) {
      errorElements.name.textContent = "Name must be 100 characters or fewer.";
      isValid = false;
    }

    if (!email) {
      errorElements.email.textContent = "Please enter your email.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorElements.email.textContent = "Please enter a valid email address.";
      isValid = false;
    } else if (email.length > 254) {
      errorElements.email.textContent = "Email must be 254 characters or fewer.";
      isValid = false;
    }

    if (!message) {
      errorElements.message.textContent = "Please enter a message.";
      isValid = false;
    } else if (message.length > 2000) {
      errorElements.message.textContent = "Message must be 2,000 characters or fewer.";
      isValid = false;
    }

    if (isValid) {
      formStatus.textContent = "Your information passed validation. This demo does not send the message.";
      contactForm.reset();
    }
  });

  // Clear an individual error as soon as its field contains valid information.
  [nameInput, emailInput, messageInput].forEach(function (input) {
    input.addEventListener("input", function () {
      const error = errorElements[input.id];
      if (error && input.value.trim()) error.textContent = "";
      if (formStatus.textContent) formStatus.textContent = "";
    });
  });
}
