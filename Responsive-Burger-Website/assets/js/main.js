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

// Cart Modal
// const cart = [];
// const cartItems = document.getElementById("cart-items");
// const cartTotal = document.getElementById("cart-total");

// document.querySelectorAll(".order-btn").forEach((button) => {
//   button.addEventListener("click", () => {
//     const item = button.getAttribute("data-item");
//     const price = parseFloat(button.getAttribute("data-price"));

//     cart.push({ item, price });
//     updateCart();
//   });
// });

// function updateCart() {
//   cartItems.innerHTML = cart
//     .map(
//       (item) => `<img src="${item.item}.png" alt="${item.item}">
//     <p>${item.item}: $${item.price}</p>`
//     )
//     .join("");
//   const total = cart.reduce((sum, item) => sum + item.price, 0);
//   cartTotal.textContent = total.toFixed(2);
// }

// // Trigger payment (You'd typically call a backend API here)
// document.getElementById("checkout-btn").addEventListener("click", () => {
//   alert("Proceeding to payment...");
//   // Redirect to payment page or payment gateway here
// });

// // Close cart modal
// document.getElementById("cart-close").addEventListener("click", () => {
//   document.getElementById("cart").classList.remove("show-modal");
// });

// // Open cart modal
// document.querySelectorAll(".order-btn").forEach((button) => {
//   button.addEventListener("click", () => {
//     cart.classList.add("show");
//   });
// });

// // cart icon functionality
// const cartIcon = document.getElementById("cart-icon");
// const cartCount = document.getElementById("cart-count");
// console.log(cartCount);

// // Array to store cart items
// const cartItems = [];
// const cartItemsContainer = document.getElementById("cart-items");
// const totalPriceValue = document.getElementById("total-price-value");

// document.querySelectorAll(".order-btn").forEach((button) => {
//   button.addEventListener("click", () => {
//     // Increment cart count display
//     cartCount.textContent++;

//     // Collect item details from button attributes
//     const itemName = button.dataset.item;
//     const itemPrice = parseFloat(button.dataset.price);
//     const itemImgSrc = button.dataset.img;

//     // Create item object with its data
//     const cartItem = {
//       name: itemName,
//       price: itemPrice,
//       img: itemImgSrc,
//     };

//     // Add item to cart array
//     cartItems.push(cartItem);

//     // Render cart item in modal
//     renderCartItem(cartItem);

//     // Update total price
//     updateTotalPrice();
//   });
// });

// // Function to render cart item in the modal
// function renderCartItem(item) {
//   // Create a div to hold the cart item structure
//   const itemDiv = document.createElement("div");
//   itemDiv.classList.add("cart__item");

//   itemDiv.innerHTML = `
//     <img src="${item.img}" alt="${item.name}" class="cart__item-img">
//     <div class="cart__item-info">
//       <h3 class="cart__item-name">${item.name}</h3>
//       <span class="cart__item-price">$${item.price.toFixed(2)}</span>
//     </div>
//     <button class="remove-item-btn">Remove</button>
//   `;

//   // Add event listener to the remove button
//   itemDiv.querySelector(".remove-item-btn").addEventListener("click", () => {
//     // Remove item from cartItems array
//     const index = cartItems.indexOf(item);
//     if (index > -1) cartItems.splice(index, 1);

//     // Remove item from the DOM
//     itemDiv.remove();

//     // Update total price
//     updateTotalPrice();
//   });

//   // Append the item to the cart items container
//   cartItemsContainer.appendChild(itemDiv);
// }

// // Function to update the total price in the cart footer
// function updateTotalPrice() {
//   const total = cartItems.reduce((sum, item) => sum + item.price, 0);
//   totalPriceValue.textContent = total.toFixed(2);
// }
// Cart Modal Toggle
// const cartModal = document.getElementById("cart-modal");
// const closeCartButton = document.getElementById("close-cart");

// document.querySelectorAll(".order-btn").forEach((button) => {
//   button.addEventListener("click", () => {
//     const itemName = button.dataset.item;
//     const itemPrice = parseFloat(button.dataset.price);
//     const itemImg = button.dataset.img;

//     addToCart(itemName, itemPrice, itemImg);
//     updateCart();
//   });
// });

// closeCartButton.addEventListener("click", () => {
//   cartModal.classList.remove("show");
// });

// function toggleCart() {
//   cartModal.classList.toggle("show");
// }

// // Cart Array to Store Items
// let cartItems = [];

// // Add Item to Cart Function
// function addToCart(name, price, imgSrc) {
//   const existingItem = cartItems.find((item) => item.name === name);
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cartItems.push({ name, price, imgSrc, quantity: 1 });
//   }
// }

// // Update Cart Modal Display
// function updateCart() {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const totalPriceValue = document.getElementById("total-price-value");
//   cartItemsContainer.innerHTML = "";

//   let total = 0;
//   cartItems.forEach((item) => {
//     const itemTotal = item.price * item.quantity;
//     total += itemTotal;

//     const cartItemElement = document.createElement("div");
//     cartItemElement.classList.add("cart__item");
//     cartItemElement.innerHTML = `
//       <img src="${item.imgSrc}" class="cart__item-img" alt="${item.name}">
//       <div class="cart__item-info">
//         <p class="cart__item-name">${item.name}</p>
//         <p class="cart__item-price">$${item.price} x ${
//       item.quantity
//     } = $${itemTotal.toFixed(2)}</p>
//       </div>
//       <button class="remove-item-btn" onclick="removeItemFromCart('${
//         item.name
//       }')">Remove</button>
//     `;
//     cartItemsContainer.appendChild(cartItemElement);
//   });

//   totalPriceValue.textContent = total.toFixed(2);
// }

// // Remove Item from Cart
// function removeItemFromCart(name) {
//   cartItems = cartItems.filter((item) => item.name !== name);
//   updateCart();
// }

// // Open Cart Modal When "Proceed to Payment" Button is Clicked
// const checkoutBtn = document.getElementById("checkout-btn");
// checkoutBtn.addEventListener("click", () => {
//   if (cartItems.length > 0) {
//     alert("Proceeding to payment!");
//     cartItems = []; // Clear the cart after checkout
//     updateCart();
//   } else {
//     alert("Your cart is empty!");
//   }
// });
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

// Initialize cart count as integer
cartCount.textContent = 0;

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("show-cart");
});

cartClose.addEventListener("click", () => {
  cartTab.classList.remove("show-cart");
});

// Cart Array to Store Items
let cartItems = [];
let fullName, contact, address, notes;

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

    console.log(itemName, itemPrice, itemImg);

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
const messageContainer = document.createElement("div");
messageContainer.classList.add("message-container");
messageContainer.style.cssText = `
    background-color: var(--first-color);
    color: var(--title-color)
    text-align: center;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  `;
messageContainer.textContent = "Your cart is empty!";
checkoutBtn.addEventListener("click", function (e) {
  // Prevent form submission if modal is open
  e.preventDefault();
  // Check if cart is empty and if messageContainer is already there
  if (cartItems.length === 0) {
    // Append the message container if it’s not already there
    if (!cartItemsContainer.contains(messageContainer)) {
      cartItemsContainer.append(messageContainer);
    }
    return;
  } else {
    // Remove the message container if it’s there and the cart is not empty
    if (cartItemsContainer.contains(messageContainer)) {
      cartItemsContainer.removeChild(messageContainer);
    }
  }

  // Open modal
  checkoutModal.style.display = "block";
  // close cartTab
  cartTab.classList.remove("show-cart");
  // Apply Overlay
  overlay.style.display = "block";
  document.getElementById("full-name").focus();
});

// Close Checkout modal
closeCheckout.addEventListener("click", function () {
  // Close modal
  checkoutModal.style.display = "none";
  // Open cartTab
  // cartTab.classList.add("show-cart");
  // Remove Overlay
  overlay.style.display = "none";
});

// Close Checkout modal on outside click
overlay.addEventListener("click", function () {
  // Close modal
  checkoutModal.style.display = "none";
  // Open cartTab
  // cartTab.classList.add("show-cart");
  // Remove Overlay
  overlay.style.display = "none";
});

// Process The User Data
function processUserData() {
  fullName = document.getElementById("full-name").value;
  contact = document.getElementById("contact-number").value;
  address = document.getElementById("address").value;
  notes = document.getElementById("notes").value;
  // Clear the User Data

  // console.log(fullName, contact, address, notes);
  // validate
  // if (fullName === "" || contact === "" || address === "") {
  //   console.log("Please fill in all required fields.");
  //   return;
  // }

  // Show success message
  successModal.style.display = "grid";
  successMessageGenerator();
  // Overlay
  // overlay.style.display = "block";
  // Clear Items Array
  cartItems = [];
  cartCount.textContent = 0;
  renderCartItems();
  calcTotalPrice(); // Update total price after removing
  // Close Checkout modal
  checkoutModal.style.display = "none";
}

// processUserData();

// Place Order
placeOrderBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Process User Data
  processUserData();
  // Clear input fields
  // Close Checkout modal
  // checkoutModal.style.display = "none";
  // Display Success Message
  // document.getElementById("success-message").style.display = "block";
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
           fullName.split(" ")[0][0].toUpperCase() +
           fullName.split(" ")[0].slice(1)
         }, your order is successfully placed!</h2>
         <p>Thank you for your order.</p>
         <a href="#" class="check-status-btn">Check Status</a>
      </div>
`;

  // Display Success Message
  document.getElementById("success-modal").appendChild(successMessage);

  const checkStatusBtn = successMessage.querySelector(".check-status-btn");
  checkStatusBtn.addEventListener("click", function () {
    successModal.style.display = "none";
    overlay.style.display = "none";
    fullName = contact = address = notes = "";

    // Redirect to check status page
  });
}
