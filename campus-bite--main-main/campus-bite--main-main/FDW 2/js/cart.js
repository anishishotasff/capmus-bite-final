document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "cart") {
    guardCartAccess();
    initCartPage();
  }
  if (page === "order-confirmation") {
    renderOrderConfirmation();
  }
});

function guardCartAccess() {
  const session = window.FDW.getActiveUser();
  if (!session || session.type !== "user") {
    window.location.href = "login.html";
  }
}

function initCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const taxEl = document.getElementById("cartTax");
  const deliveryEl = document.getElementById("cartDelivery");
  const totalEl = document.getElementById("cartTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  function renderCart() {
    const cart = window.FDW.getCart();
    const foods = window.FDW.getFoods();
    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-state">
          <p>Your cart is empty. Browse dishes to add them here.</p>
          <a class="btn btn-primary" href="user-dashboard.html">Browse menu</a>
        </div>
      `;
      subtotalEl.textContent = "₹0";
      taxEl.textContent = "₹0";
      deliveryEl.textContent = "₹0";
      totalEl.textContent = "₹0";
      return;
    }

    let subtotal = 0;
    container.innerHTML = cart
      .map((item) => {
        const food = foods.find((entry) => entry.id === item.id);
        const lineTotal = food.price * item.qty;
        subtotal += lineTotal;
        return `
          <article class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <img src="${food.image}" alt="${food.name}" loading="lazy" />
              <div>
                <h3>${food.name}</h3>
                <p class="cart-meta">${food.category}</p>
                <p class="price">₹${food.price}</p>
              </div>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-stepper" data-stepper="${item.id}">
                <button data-step="-">−</button>
                <span>${item.qty}</span>
                <button data-step="+">+</button>
              </div>
              <strong>${window.FDW.formatCurrency(lineTotal)}</strong>
              <button class="remove" data-remove="${item.id}">Remove</button>
            </div>
          </article>
        `;
      })
      .join("");

    const delivery = subtotal >= 499 ? 0 : cart.length ? 35 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;

    subtotalEl.textContent = window.FDW.formatCurrency(subtotal);
    taxEl.textContent = window.FDW.formatCurrency(tax);
    deliveryEl.textContent = window.FDW.formatCurrency(delivery);
    totalEl.textContent = window.FDW.formatCurrency(total);
  }

  container?.addEventListener("click", (event) => {
    const removeBtn = event.target.closest("[data-remove]");
    if (removeBtn) {
      window.FDW.removeFromCart(removeBtn.dataset.remove);
      renderCart();
      return;
    }
    const stepperBtn = event.target.closest("[data-step]");
    if (stepperBtn) {
      const parent = event.target.closest("[data-stepper]");
      const id = parent?.dataset.stepper;
      if (!id) return;
      const cart = window.FDW.getCart();
      const target = cart.find((item) => item.id === id);
      if (!target) return;
      const direction = stepperBtn.dataset.step;
      const nextQty = direction === "+" ? target.qty + 1 : Math.max(0, target.qty - 1);
      window.FDW.updateCartQuantity(id, nextQty);
      renderCart();
    }
  });

  placeOrderBtn?.addEventListener("click", async () => {
    const cart = window.FDW.getCart();
    if (!cart.length) {
      alert("Add dishes to cart before placing an order.");
      return;
    }
    
    const user = window.FDW.getActiveUser();
    const foods = window.FDW.getFoods();
    let subtotal = 0;
    const items = cart.map((entry) => {
      const food = foods.find((item) => item.id === entry.id);
      const lineTotal = food.price * entry.qty;
      subtotal += lineTotal;
      return {
        ...food,
        qty: entry.qty,
        lineTotal,
      };
    });
    const delivery = subtotal >= 499 ? 0 : 35;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax + delivery;
    const orderId = `SR-${Math.floor(Math.random() * 90000 + 10000)}`;
    
    const order = {
      orderId,
      items,
      subtotal,
      delivery,
      tax,
      total,
      placedAt: Date.now(),
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || ''
    };
    
    // Save order to Firebase if available
    if (window.FDW.state.useFirebase && FirebaseService && user?.uid) {
      const result = await FirebaseService.createOrder(user.uid, order);
      if (result.success) {
        order.firebaseOrderId = result.orderId;
      }
    }
    
    window.FDW.setLatestOrder(order);
    window.FDW.clearCart();
    window.location.href = "order-confirmation.html";
  });

  renderCart();
}

function renderOrderConfirmation() {
  const order = window.FDW.getLatestOrder();
  if (!order) {
    window.location.href = "user-dashboard.html";
    return;
  }
  const idEl = document.getElementById("orderId");
  const itemsEl = document.getElementById("orderItems");
  const totalEl = document.getElementById("orderTotal");
  const breakdownEl = document.getElementById("orderBreakdown");

  idEl.textContent = order.orderId;
  itemsEl.textContent = `${order.items.length} dishes`;
  totalEl.textContent = window.FDW.formatCurrency(order.total);

  breakdownEl.innerHTML = order.items
    .map(
      (item) => `
      <div>
        <span>${item.name} × ${item.qty}</span>
        <strong>${window.FDW.formatCurrency(item.lineTotal)}</strong>
      </div>
    `
    )
    .join("");

  breakdownEl.insertAdjacentHTML(
    "beforeend",
    `
      <div><span>Subtotal</span><strong>${window.FDW.formatCurrency(order.subtotal)}</strong></div>
      <div><span>Delivery</span><strong>${window.FDW.formatCurrency(order.delivery)}</strong></div>
      <div><span>Tax</span><strong>${window.FDW.formatCurrency(order.tax)}</strong></div>
      <div><span>Total Paid</span><strong>${window.FDW.formatCurrency(order.total)}</strong></div>
    `
  );

  window.FDW.clearLatestOrder();
}

