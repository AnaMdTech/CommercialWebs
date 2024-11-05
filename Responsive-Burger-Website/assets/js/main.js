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
const observer = new IntersectionObserver(
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

observer.observe(homeSection);

/*=============== SHOW SCROLL UP ===============*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*=============== SCROLL REVEAL ANIMATION ===============*/
