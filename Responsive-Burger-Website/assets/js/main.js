/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* MENU SHOW */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* MENU HIDDEN */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  navMenu.classList.remove("show-menu");
};

navLink.forEach((link) => link.addEventListener("click", linkAction));

/*=============== ADD SHADOW HEADER ===============*/
const header = document.getElementById("header");
const homeSection = document.getElementById("home");

//! THE OLD WAY TO DO THIS
// const scrollHeader = () => {
//   window.scrollY >= 50
//     ? header.classList.add("scroll-header")
//     : header.classList.remove("scroll-header");
// };

// window.addEventListener("scroll", scrollHeader);

//! THE NEW WAY TO DO THIS
const headerObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) {
      header.classList.add("shadow-header");
    } else {
      header.classList.remove("shadow-header");
    }
  },
  {
    root: null,
    threshold: 1,
  }
);

headerObserver.observe(homeSection);

/*=============== SHOW SCROLL UP ===============*/
//! The Old Way of doing this
// const scrollUp = () => {
//   const scrollUp = document.getElementById("scroll-up");
//   if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
//   else scrollUp.classList.remove("show-scroll");
// };

// window.addEventListener("scroll", scrollUp);

//! The New Way of doing this
const scrollUpBtn = document.getElementById("scroll-up");

const scrollUpBtnObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      scrollUpBtn.classList.add("show-scroll");
    } else {
      scrollUpBtn.classList.remove("show-scroll");
    }
  },
  {
    root: null,
    threshold: 0.5,
  }
);

scrollUpBtnObserver.observe(homeSection);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
//! Old Way of doing this
// const sections = document.querySelectorAll("section[id]");
// // console.log(sections);

// const scrollActive = () => {
//   const scrollDown = window.scrollY;

//   sections.forEach((current) => {
//     const sectionHeight = current.offsetHeight,
//       sectionTop = current.offsetTop - 58,
//       sectionId = current.getAttribute("id"),
//       sectionsClass = document.querySelector(
//         ".nav__menu a[href*=" + sectionId + "]"
//       );

//     if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
//       sectionsClass.classList.add("active-link");
//     } else {
//       sectionsClass.classList.remove("active-link");
//     }
//   });
// };

// window.addEventListener("scroll", scrollActive);

//! New Way of doing this
const sections = document.querySelectorAll("section[id]");
const options = {
  root: null, // viewport
  threshold: 0.6, // trigger when 50% of section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (entry.isIntersecting) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
  reset: true, // reset the animation on each scroll
});

sr.reveal(`.home__data`);
sr.reveal(`.home__dish`, { delay: 500, distance: "100px", origin: "bottom" });
sr.reveal(`.home__burger`, { delay: 1200, distance: "100px", duration: 1500 });
sr.reveal(`.home__ingredient`, {
  delay: 1600,
  interval: 100,
});
sr.reveal(`.recipe__img, .delivery__img, .contact__img`, { origin: "left" });
sr.reveal(`.recipe__data, .delivery__data, .contact__data`, {
  origin: "right",
});
sr.reveal(`.popular__card`, { interval: 100 });
