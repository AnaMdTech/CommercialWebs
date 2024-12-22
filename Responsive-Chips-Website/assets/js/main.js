/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const cartLink = document.getElementById("cart-link");

/* MENU TOGGLE */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    cartLink.style.display = "none";
  });
}

/* MENU HIDDEN */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    cartLink.style.display = "block";
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  navMenu.classList.remove("show-menu");
  cartLink.style.display = "block";
};

navLink.forEach((link) => link.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const header = document.getElementById("header");
const homeSection = document.getElementById("home");

const headerObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) {
      header.classList.add("shadow-header");
    } else {
      header.classList.remove("shadow-header");
    }
  },
  {
    root: null,
    threshold: 0.9,
    rootMargin: "0px",
  }
);

headerObserver.observe(homeSection);

/*=============== SWIPER FAVORITES ===============*/

/*=============== SHOW SCROLL UP ===============*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*=============== SCROLL REVEAL ANIMATION ===============*/
