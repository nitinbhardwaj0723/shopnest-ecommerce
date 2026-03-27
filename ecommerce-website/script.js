const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 4,
    name: "Backpack",
    price: 1499,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa"
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 999,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 1799,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d"
  },
  {
    id: 7,
    name: "Smartphone",
    price: 59999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
   {
    id: 8,
    name: "Laptop",
    price: 31999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  }
];

const productList = document.getElementById("product-list");
const cartSidebar = document.getElementById("cart-sidebar");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Show products
function displayProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}?w=500" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update cart
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}?w=300" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <div class="qty-controls">
            <button onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total;
}

// Change quantity
function changeQty(id, change) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  updateCart();
}

// Remove item
function removeItem(id) {
  cart = cart.filter(product => product.id !== id);
  updateCart();
}

// Cart toggle
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Initial load
displayProducts();
updateCart();