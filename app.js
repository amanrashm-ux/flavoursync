(() => {
  const WHATSAPP_NUMBER = "918405917655";

  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid) return;

  const menuItems = [
    {
      id: "handi-mutton",
      name: "Handi Mutton Platter",
      category: "Non-Veg",
      tag: "Bestseller",
      price: 399,
      description: "Slow-cooked mutton gravy with four soft rotis, jeera rice, salad and house chutney.",
      meta: ["Rich gravy", "Serves 1", "Medium hot"],
      image: "assets/menu/handi-mutton.jpg"
    },
    {
      id: "chicken-masala",
      name: "Chicken Masala Combo",
      category: "Non-Veg",
      tag: "Popular",
      price: 299,
      description: "Chicken cooked in thick masala with basmati rice, salad and green chutney.",
      meta: ["Juicy chicken", "Serves 1", "Balanced spice"],
      image: "assets/menu/chicken-masala.jpg"
    },
    {
      id: "veg-thali",
      name: "Classic Veg Thali",
      category: "Veg",
      tag: "Wholesome",
      price: 239,
      description: "Paneer curry, dal, rice, rotis, salad and a rotating homestyle vegetable side.",
      meta: ["Vegetarian", "Serves 1", "Comfort meal"],
      image: "assets/menu/veg-thali.jpg"
    },
    {
      id: "biryani",
      name: "Dum Chicken Biryani",
      category: "Rice",
      tag: "Aromatic",
      price: 279,
      description: "Layered basmati rice, masala chicken, fried onions, raita and salan-style gravy.",
      meta: ["Rice bowl", "Raita", "Weekend fit"],
      image: "assets/menu/biryani.jpg"
    },
    {
      id: "paneer-combo",
      name: "Paneer Butter Combo",
      category: "Veg",
      tag: "Creamy",
      price: 259,
      description: "Paneer butter masala with jeera rice, two rotis, salad and pickle.",
      meta: ["Vegetarian", "Mild", "Creamy"],
      image: "assets/menu/paneer-combo.jpg"
    },
    {
      id: "kebab-box",
      name: "Tandoori Kebab Box",
      category: "Snacks",
      tag: "Starter",
      price: 249,
      description: "Smoky chicken kebabs with onion rings, lemon, mint chutney and masala dip.",
      meta: ["Snack", "Shareable", "Smoky"],
      image: "assets/menu/kebab-box.jpg"
    },
    {
      id: "dal-rice",
      name: "Dal Tadka Rice Bowl",
      category: "Rice",
      tag: "Daily",
      price: 179,
      description: "Yellow dal tadka, steamed rice, pickle, salad and crisp papad for a simple daily meal.",
      meta: ["Vegetarian", "Light", "Daily meal"],
      image: "assets/menu/dal-rice.jpg"
    },
    {
      id: "party-mutton",
      name: "Mutton Party Tray",
      category: "Bulk",
      tag: "Advance",
      price: 1499,
      description: "Larger mutton curry portion for shared meals. Best ordered in advance through WhatsApp.",
      meta: ["Bulk", "Advance", "Shared"],
      image: "assets/menu/party-mutton.jpg"
    }
  ];

  const comboMap = {
    "Office Lunch Box": ["veg-thali", "chicken-masala"],
    "Family Dinner Pack": ["handi-mutton", "chicken-masala", "veg-thali"]
  };

  const state = {
    filter: "All",
    search: "",
    orderMode: "asap",
    cart: loadCart()
  };

  const filters = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const cartButton = document.getElementById("cartButton");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const clearCart = document.getElementById("clearCart");
  const cartCount = document.getElementById("cartCount");
  const cartTitle = document.getElementById("cartTitle");
  const cartItems = document.getElementById("cartItems");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartPackaging = document.getElementById("cartPackaging");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("checkoutButton");
  const scheduleFields = document.getElementById("scheduleFields");

  function formatRs(value) {
    return `Rs ${Number(value).toLocaleString("en-IN")}`;
  }

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem("flavoursyncCart") || "[]");
      return new Map(saved.filter(([id, quantity]) => {
        return typeof id === "string" && Number.isFinite(quantity) && quantity > 0;
      }));
    } catch {
      return new Map();
    }
  }

  function isKnownItem(id) {
    return menuItems.some(item => item.id === id);
  }

  function removeStaleCartItems() {
    let changed = false;
    for (const id of state.cart.keys()) {
      if (!isKnownItem(id)) {
        state.cart.delete(id);
        changed = true;
      }
    }
    if (changed) saveCart();
  }

  function saveCart() {
    localStorage.setItem("flavoursyncCart", JSON.stringify([...state.cart.entries()]));
  }

  function openWhatsApp(message) {
    if (window.FlavourSync?.openWhatsApp) {
      window.FlavourSync.openWhatsApp(message);
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(url, "_blank", "noopener");
  }

  function showToast(message) {
    if (window.FlavourSync?.showToast) {
      window.FlavourSync.showToast(message);
    }
  }

  function categories() {
    return ["All", ...new Set(menuItems.map(item => item.category))];
  }

  function renderFilters() {
    filters.innerHTML = categories().map(category => `
      <button class="filter-chip ${state.filter === category ? "active" : ""}" type="button" data-filter="${category}">
        ${category}
      </button>
    `).join("");
  }

  function filteredItems() {
    const query = state.search.trim().toLowerCase();
    return menuItems.filter(item => {
      const matchesCategory = state.filter === "All" || item.category === state.filter;
      const searchable = `${item.name} ${item.category} ${item.description} ${item.meta.join(" ")}`.toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }

  function renderMenu() {
    const items = filteredItems();
    menuGrid.innerHTML = items.length ? items.map(item => `
      <article class="dish-card">
        <div class="dish-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async">
          <span class="dish-tag">${item.tag}</span>
          <span class="dish-category">${item.category}</span>
        </div>
        <div class="dish-body">
          <div class="dish-head">
            <h3>${item.name}</h3>
            <span class="price">${formatRs(item.price)}</span>
          </div>
          <p>${item.description}</p>
          <div class="dish-meta">${item.meta.map(meta => `<span>${meta}</span>`).join("")}</div>
          <button class="btn btn-soft add-item" type="button" data-id="${item.id}">
            <i data-lucide="plus"></i> Add to Order
          </button>
        </div>
      </article>
    `).join("") : `<div class="cart-empty full-field">No dishes match that search.</div>`;

    if (window.lucide) window.lucide.createIcons();
  }

  function addToCart(id, quantity = 1) {
    const item = menuItems.find(entry => entry.id === id);
    if (!item) return;
    const current = state.cart.get(id) || 0;
    state.cart.set(id, current + quantity);
    saveCart();
    renderCart();
    showToast(`${item.name} added to order`);
    openCart();
  }

  function setQuantity(id, quantity) {
    if (quantity <= 0) {
      state.cart.delete(id);
    } else {
      state.cart.set(id, quantity);
    }
    saveCart();
    renderCart();
  }

  function cartLines() {
    return [...state.cart.entries()].flatMap(([id, quantity]) => {
      const item = menuItems.find(entry => entry.id === id);
      if (!item) return [];
      return { ...item, quantity, lineTotal: item.price * quantity };
    });
  }

  function cartTotals() {
    const lines = cartLines();
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const packaging = itemCount > 0 ? Math.max(20, itemCount * 10) : 0;
    return { lines, itemCount, subtotal, packaging, total: subtotal + packaging };
  }

  function renderCart() {
    const { lines, itemCount, subtotal, packaging, total } = cartTotals();
    cartCount.textContent = String(itemCount);
    cartTitle.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
    cartSubtotal.textContent = formatRs(subtotal);
    cartPackaging.textContent = formatRs(packaging);
    cartTotal.textContent = formatRs(total);

    cartItems.innerHTML = lines.length ? lines.map(line => `
      <article class="cart-item">
        <img src="${line.image}" alt="${line.name}">
        <div>
          <h4>${line.name}</h4>
          <p>${formatRs(line.price)} each</p>
          <div class="cart-row">
            <div class="qty-control" aria-label="Quantity controls for ${line.name}">
              <button type="button" data-qty="${line.quantity - 1}" data-id="${line.id}" aria-label="Decrease ${line.name}">-</button>
              <span>${line.quantity}</span>
              <button type="button" data-qty="${line.quantity + 1}" data-id="${line.id}" aria-label="Increase ${line.name}">+</button>
            </div>
            <strong>${formatRs(line.lineTotal)}</strong>
          </div>
        </div>
      </article>
    `).join("") : `<div class="cart-empty">Your order is empty. Add dishes from the menu to prepare a WhatsApp checkout.</div>`;
    clearCart.disabled = !lines.length;
    checkoutButton.disabled = !lines.length;
  }

  function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function setOrderMode(mode) {
    state.orderMode = mode;
    document.querySelectorAll("[data-order-mode]").forEach(button => {
      button.classList.toggle("active", button.dataset.orderMode === mode);
    });
    scheduleFields.hidden = mode !== "schedule";
  }

  function buildOrderMessage() {
    const { lines, subtotal, packaging, total } = cartTotals();
    const name = document.getElementById("customerName").value.trim();
    const area = document.getElementById("customerArea").value.trim();
    const serviceType = document.getElementById("serviceType").value.trim();
    const spiceLevel = document.getElementById("spiceLevel").value.trim();
    const paymentPreference = document.getElementById("paymentPreference").value.trim();
    const notes = document.getElementById("orderNotes").value.trim();
    const date = document.getElementById("scheduledDate").value.trim();
    const time = document.getElementById("scheduledTime").value.trim();
    const orderLines = lines.map(line => `- ${line.name} x ${line.quantity} = ${formatRs(line.lineTotal)}`).join("\n");

    return [
      "Hello FlavourSync, I want to place an order.",
      name ? `Name: ${name}` : "",
      area ? `Delivery locality: ${area}` : "",
      serviceType ? `Service: ${serviceType}` : "",
      spiceLevel ? `Spice level: ${spiceLevel}` : "",
      state.orderMode === "schedule" ? "Order timing: Scheduled order" : "Order timing: ASAP",
      state.orderMode === "schedule" && date ? `Preferred date: ${date}` : "",
      state.orderMode === "schedule" && time ? `Preferred time: ${time}` : "",
      "",
      orderLines,
      "",
      `Subtotal: ${formatRs(subtotal)}`,
      `Packaging: ${formatRs(packaging)}`,
      `Estimated total: ${formatRs(total)}`,
      paymentPreference ? `Payment preference: ${paymentPreference}` : "",
      notes ? `Notes: ${notes}` : "",
      "",
      "Please confirm availability, final bill and delivery time."
    ].filter(Boolean).join("\n");
  }

  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.filter = button.dataset.filter;
    renderFilters();
    renderMenu();
  });

  searchInput.addEventListener("input", event => {
    state.search = event.target.value;
    renderMenu();
  });

  menuGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-item");
    if (!button) return;
    addToCart(button.dataset.id);
  });

  document.querySelectorAll(".combo-order").forEach(button => {
    button.addEventListener("click", () => {
      const ids = comboMap[button.dataset.combo] || [];
      ids.forEach(id => addToCart(id));
      openCart();
    });
  });

  document.querySelectorAll("[data-order-mode]").forEach(button => {
    button.addEventListener("click", () => setOrderMode(button.dataset.orderMode));
  });

  cartButton.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartDrawer);
  clearCart.addEventListener("click", () => {
    state.cart.clear();
    saveCart();
    renderCart();
    showToast("Order cleared.");
  });
  cartDrawer.addEventListener("click", event => {
    if (event.target === cartDrawer) closeCartDrawer();
  });

  cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-qty]");
    if (!button) return;
    setQuantity(button.dataset.id, Number(button.dataset.qty));
  });

  checkoutButton.addEventListener("click", () => {
    const { itemCount } = cartTotals();
    if (!itemCount) {
      showToast("Add at least one dish before checkout.");
      return;
    }
    if (state.orderMode === "schedule") {
      const date = document.getElementById("scheduledDate").value.trim();
      const time = document.getElementById("scheduledTime").value.trim();
      if (!date || !time) {
        showToast("Add schedule date and time.");
        return;
      }
    }
    openWhatsApp(buildOrderMessage());
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCartDrawer();
  });

  removeStaleCartItems();
  renderFilters();
  renderMenu();
  renderCart();
})();
