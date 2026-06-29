const navLinks = document.querySelectorAll(".nav-links a");
const footerLinks = document.querySelectorAll(".footer-links a");
const sections = document.querySelectorAll("section");
const themeButton = document.querySelector(".theme-button");
const skillBars = document.querySelectorAll(".progress span");

sections.forEach((section) => {
  section.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((section) => {
  revealObserver.observe(section);
});

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const finalWidth = bar.getAttribute("data-width");
        bar.style.width = finalWidth;
      }
    });
  },
  {
    threshold: 0.4,
  }
);

skillBars.forEach((bar) => {
  const finalWidth = bar.style.width;
  bar.setAttribute("data-width", finalWidth);
  bar.style.width = "0";
  skillObserver.observe(bar);
});

window.addEventListener("scroll", () => {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
});

[...navLinks, ...footerLinks].forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((navLink) => navLink.classList.remove("active-link"));

    const matchingLink = document.querySelector(
      `.nav-links a[href="${link.getAttribute("href")}"]`
    );

    if (matchingLink) {
      matchingLink.classList.add("active-link");
    }
  });
});

const backToTopButton = document.createElement("button");
backToTopButton.textContent = "↑";
backToTopButton.className = "back-to-top";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeButton.textContent = "☾";
  } else {
    themeButton.textContent = "☼";
  }
});