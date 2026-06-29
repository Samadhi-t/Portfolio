const navLinks = document.querySelectorAll(".nav-links a");
const footerLinks = document.querySelectorAll(".footer-links a");
const sections = document.querySelectorAll("section");
const themeButton = document.querySelector(".theme-button");
const skillBars = document.querySelectorAll(".progress span");
const counters = document.querySelectorAll(".counter");
const typingText = document.querySelector(".typing-text");

const animatedElements = document.querySelectorAll(
  ".hero-content, .hero-card, .about-image, .about-content, .education-card, .skill-card, .project-card, .contact-card"
);

const typingWords = [
  "full-stack development.",
  "database management.",
  "DevOps practices.",
  "modern web technologies."
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, characterIndex - 1);
    characterIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, characterIndex + 1);
    characterIndex++;
  }

  let typingSpeed = isDeleting ? 45 : 80;

  if (!isDeleting && characterIndex === currentWord.length) {
    typingSpeed = 1200;
    isDeleting = true;
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    typingSpeed = 300;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

animatedElements.forEach((element, index) => {
  element.classList.add("scroll-animate");
  element.style.transitionDelay = `${index * 25}ms`;
});

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-show");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

animatedElements.forEach((element) => {
  animationObserver.observe(element);
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
    threshold: 0.45,
  }
);

skillBars.forEach((bar) => {
  const finalWidth = bar.style.width;
  bar.setAttribute("data-width", finalWidth);
  bar.style.width = "0";
  skillObserver.observe(bar);
});

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const speed = 500 / target;

    const updateCounter = () => {
      if (current < target) {
        current++;
        counter.textContent = current;
        setTimeout(updateCounter, speed);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });

  countersStarted = true;
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
      }
    });
  },
  {
    threshold: 0.4,
  }
);

if (counters.length > 0) {
  counterObserver.observe(document.querySelector(".hero-stats"));
}

window.addEventListener("scroll", () => {
  let currentSection = "home";

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

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  });
}

document.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  document.body.style.backgroundPosition = `${x * 35}px ${y * 35}px`;
});