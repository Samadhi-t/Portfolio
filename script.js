const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const headerSubtitle = document.querySelector("header p");

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
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  revealObserver.observe(section);
});

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;

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

const subtitleText = "ICT Undergraduate | Aspiring DevOps Professional";
let index = 0;

function typeText() {
  if (index < subtitleText.length) {
    headerSubtitle.textContent += subtitleText.charAt(index);
    index++;
    setTimeout(typeText, 55);
  }
}

if (headerSubtitle) {
  headerSubtitle.textContent = "";
  typeText();
}

const backToTopButton = document.createElement("button");
backToTopButton.textContent = "↑";
backToTopButton.className = "back-to-top";
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
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