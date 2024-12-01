// JavaScript to manage active navbar link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelector('.nav-link.active').classList.remove('active');
    this.classList.add('active');
  });
});

// Array to store cart items
let cartItems = [];

// Function to add an item to the cart
function addToCart(product, price, image, description = 'This is some text inside of a div block.', color = 'Main') {
  cartItems.push({ product, price, image, description, color, quantity: 1 });
  updateCart();
  updateCartCount(); // Update the cart count in the navbar
}

// Function to remove an item from the cart based on index
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  updateCartCount(); // Update the cart count in the navbar
}

// Function to update the cart UI
function updateCart() {
  const cartModalBody = document.getElementById('cart-modal-body');
  const cartSubtotal = document.getElementById('cart-subtotal');
  cartModalBody.innerHTML = ''; // Clear previous cart items

  let subtotal = 0;
  cartItems.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    // Create cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'mb-3', 'd-flex', 'align-items-start');
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.product}" class="img-thumbnail me-3" style="width: 50px; height: 50px;">
            <div class="cart-item-info">
                <p class="mb-1"><strong>${item.product}</strong></p>
                <p class="mb-1">${item.description}</p>
                <p class="mb-1">Color: ${item.color}</p>
                <button class="btn btn-link text-danger p-0" onclick="removeFromCart(${index})">Remove</button>
            </div>
            <div class="cart-item-quantity ms-auto d-flex align-items-center">
                <input type="number" class="form-control form-control-sm" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px; text-align: center;">
            </div>
        `;
    cartModalBody.appendChild(cartItem);
  });

  cartSubtotal.textContent = `$${subtotal.toFixed(2)} USD`;
}

// Function to update quantity of a specific item
function updateQuantity(index, newQuantity) {
  cartItems[index].quantity = parseInt(newQuantity);
  updateCart();
}

// Function to update the cart count in the navbar
function updateCartCount() {
  const cartLink = document.getElementById('cart-button');
  cartLink.textContent = `Cart (${cartItems.length})`;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function () {
    const product = this.getAttribute('data-product');
    const price = parseFloat(this.getAttribute('data-price'));
    const image = this.getAttribute('data-image');
    addToCart(product, price, image);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      // Change button text to "Added to the Cart"
      this.textContent = "Added to the Cart";
      this.style.backgroundColor = 'transparent';
      this.style.color = 'black';
      this.style.cursor = 'default';
      this.disabled = true; // Optionally disable the button to prevent further clicks
    });
  });
});