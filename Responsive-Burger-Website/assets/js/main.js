/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* MENU SHOW */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    document.querySelector(".nav__link--cart").style.display = "none";
  });
}

/* MENU HIDDEN */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.querySelector(".nav__link--cart").style.display = "block";
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

/*=============== CART FUNCTIONALITY ===============*/
// cart icon functionality
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartTab = document.getElementById("cart-tab");
const cartClose = document.querySelector(".close");
const orderBtn = document.querySelectorAll(".order-btn");
const cartItemsContainer = document.querySelector(".listCart");
const removeItemBtn = document.querySelector(".remove");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");
const overlay = document.getElementById("overlay");
const placeOrderBtn = document.getElementById("place-order");
const successModal = document.getElementById("success-modal");
const clearCartBtn = document.getElementById("clear-cart"); // Clear Cart button

// Initialize cart count as integer
cartCount.textContent = 0;

// Create the message container once
const messageContainer = document.createElement("div");
messageContainer.classList.add("message-container");
messageContainer.style.cssText = `
  background-color: var(--first-color);
  color: var(--title-color);
  text-align: center;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;
messageContainer.textContent = "Your cart is empty!";

// Function to set the empty message styles
function setEmptyMessageStyle() {
  messageContainer.style.backgroundColor = "red";
  messageContainer.style.color = "white";
}

// Add the empty cart message to the cart container
function updateCartMessage() {
  if (cartItemsContainer.children.length === 0) {
    // Add the message if the cart is empty
    cartItemsContainer.append(messageContainer);
  }
}

// Cart icon functionality
cartIcon.addEventListener("click", () => {
  cartTab.classList.add("show-cart");

  // Check if there are items in the cart
  updateCartMessage();
});

cartClose.addEventListener("click", () => {
  cartTab.classList.remove("show-cart");
});

// Cart Array to Store Items
let cartItems = [];
let fullNameInput, contactInput, addressInput, notes;

// Add Item to Cart Function
function addToCart(itemName, itemPrice, itemImg, itemQuantity = 1) {
  // Check if item already exists in cart
  const existingItem = cartItems.find((item) => item.itemName === itemName);

  if (existingItem) {
    // Update the quantity and price if item already exists
    existingItem.itemQuantity += 1;
    existingItem.totalPrice =
      existingItem.itemPrice * existingItem.itemQuantity;
  } else {
    // Increment cart count for new item only
    cartCount.textContent = parseInt(cartCount.textContent) + 1;

    // Add item to cart array if it's new
    cartItems.push({
      itemName,
      itemPrice,
      itemImg,
      itemQuantity,
      totalPrice: itemPrice,
    });
  }

  // Render cart items
  renderCartItems();
  calcTotalPrice(); // Update total price after adding
}

// Render Cart Items in Modal
function renderCartItems() {
  // Clear previous items to avoid duplicates
  cartItemsContainer.innerHTML = "";

  // Render all items in the cart modal
  cartItems.forEach((item) => {
    const html = `
      <div class="item">
          <div class="image">
             <img src="${item.itemImg}" alt="Product Image">
          </div>
          <div class="name">
              ${item.itemName}
          </div>
          <div class="totalPrice">
              $${item.totalPrice.toFixed(2)}
          </div>
          <div class="quantity">
             <span class="minus" data-item="${item.itemName}">&lt;</span>
             <span>${item.itemQuantity}</span>
             <span class="plus" data-item="${item.itemName}">&gt;</span>
          </div>
          <div class="remove">
               <i class="ri-delete-bin-line delete" data-item="${
                 item.itemName
               }"></i>
          </div>
       </div>
    `;
    cartItemsContainer.insertAdjacentHTML("beforeend", html);
  });

  // After rendering items, check if the cart is empty
  updateCartMessage();
}

// Event Listener for Increment, Decrement, and Delete Buttons
cartItemsContainer.addEventListener("click", (event) => {
  const itemName = event.target.dataset.item;
  if (!itemName) return; // Ignore clicks outside buttons

  // Find the item in the cart
  const cartItem = cartItems.find((item) => item.itemName === itemName);

  if (event.target.classList.contains("plus")) {
    // Increment quantity and update total price
    cartItem.itemQuantity += 1;
    cartItem.totalPrice = cartItem.itemPrice * cartItem.itemQuantity;
  } else if (event.target.classList.contains("minus")) {
    if (cartItem.itemQuantity > 1) {
      // Decrement quantity and update total price if quantity is greater than 1
      cartItem.itemQuantity -= 1;
      cartItem.totalPrice = cartItem.itemPrice * cartItem.itemQuantity;
    } else {
      // Remove item from cart if quantity is 1
      cartItems = cartItems.filter((item) => item.itemName !== itemName);

      // Decrease cart count for removed items
      cartCount.textContent = parseInt(cartCount.textContent) - 1;
    }
  } else if (event.target.classList.contains("delete")) {
    // Remove item from cart
    cartItems = cartItems.filter((item) => item.itemName !== itemName);

    // Decrease cart count for removed items
    cartCount.textContent = parseInt(cartCount.textContent) - 1;
  }

  // Re-render cart items to show updated quantities and prices
  renderCartItems();
  calcTotalPrice(); // Update total price after removing
});

// Order Button Event Listeners
orderBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const itemName = button.dataset.item;
    const itemPrice = parseFloat(button.dataset.price);
    const itemImg = button.dataset.img;

    // Add item to cart
    addToCart(itemName, itemPrice, itemImg);
  });
});

// Calculate total price
function calcTotalPrice() {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  console.log("Total Price:", totalPrice);
  // Update total price in modal
  document.getElementById("total-price-value").textContent =
    totalPrice.toFixed(2);
}

// Open CheckOut modal
checkoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Check if the cart is empty
  if (cartItems.length === 0) {
    // Append the message container if it’s not already present
    if (!cartItemsContainer.contains(messageContainer)) {
      setEmptyMessageStyle();
      cartItemsContainer.append(messageContainer);
    }
    // Prevent opening the checkout modal when the cart is empty
    return;
  }

  // Open modal
  checkoutModal.style.display = "block";
  // Close cart tab
  cartTab.classList.remove("show-cart");
  // Apply overlay
  overlay.style.display = "block";
  // Focus on the full name field
  document.getElementById("full-name").focus();
});

// Close Checkout modal
closeCheckout.addEventListener("click", function () {
  // Close modal
  checkoutModal.style.display = "none";
  // Remove Overlay
  overlay.style.display = "none";
});

// Close Checkout modal on outside click
overlay.addEventListener("click", function () {
  // Close modal
  checkoutModal.style.display = "none";
  // Remove Overlay
  overlay.style.display = "none";
});

// Process The User Data
function validateField(inputElement) {
  if (!inputElement.value) {
    inputElement.style.border = "1px solid red";
    inputElement.classList.add("invalid");
    return false;
  }
  return true;
}

function processUserData() {
  fullNameInput = document.getElementById("full-name");
  contactInput = document.getElementById("contact-number");
  addressInput = document.getElementById("address");
  notes = document.getElementById("notes");

  // Validate User Data
  if (
    !validateField(fullNameInput) ||
    !validateField(contactInput) ||
    !validateField(addressInput)
  ) {
    return;
  }

  // Show success message
  successModal.style.display = "grid";
  successMessageGenerator();

  // Clear Cart and Update UI
  cartItems = [];
  cartCount.textContent = 0;
  renderCartItems();
  calcTotalPrice(); // Update total price after removing

  // Close Checkout modal
  checkoutModal.style.display = "none";
}

// Function to clear the red border and invalid class when typing
function clearValidationOnTyping(inputElement) {
  inputElement.addEventListener("input", function () {
    if (inputElement.value) {
      inputElement.style.border = ""; // Remove the red border
      inputElement.classList.remove("invalid"); // Remove the invalid class
    }
  });
}

// Attach event listeners to inputs for clearing validation
function attachValidationListeners() {
  const fullNameInput = document.getElementById("full-name");
  const contactInput = document.getElementById("contact-number");
  const addressInput = document.getElementById("address");

  clearValidationOnTyping(fullNameInput);
  clearValidationOnTyping(contactInput);
  clearValidationOnTyping(addressInput);
}

// Call the function to attach event listeners when the page loads
attachValidationListeners();

// Place Order
placeOrderBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Process User Data
  processUserData();
});

// success message function
function successMessageGenerator() {
  // Clear Success Message
  document.getElementById("success-modal").innerHTML = "";
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerHTML = `
      <div class="modal-content">
         <h2>Dear ${
           fullNameInput.value.split(" ")[0][0].toUpperCase() +
           fullNameInput.value.split(" ")[0].slice(1)
         }, your order is successfully placed!</h2>
         <p>Thank you for your order.</p>
         <a href="#" class="check-status-btn">Close</a>
      </div>
`;

  // Display Success Message
  document.getElementById("success-modal").appendChild(successMessage);

  const checkStatusBtn = successMessage.querySelector(".check-status-btn");
  checkStatusBtn.addEventListener("click", function (e) {
    e.preventDefault();
    successModal.style.display = "none";
    overlay.style.display = "none";
    fullNameInput.value =
      contactInput.value =
      addressInput.value =
      notes.value =
        "";
  });
}
