(() => {
  const WHATSAPP_NUMBER = "918405917655";

  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid) return;

  const menuItems = [
    {
      id: "handi-mutton",
      name: "Handi Mutton Platter",
      category: "Mutton",
      fulfillment: "Hot kitchen delivery",
      tag: "Rich gravy",
      price: 399,
      description: "Slow-cooked mutton gravy with four soft rotis, jeera rice, salad and house chutney.",
      meta: ["Non-veg", "Slow cooked", "Medium hot"],
      ingredients: ["Mutton", "Handi gravy", "Soft roti", "Jeera rice", "Onion", "Lemon", "House chutney"],
      image: "assets/menu/handi-mutton.jpg"
    },
    {
      id: "chicken-masala",
      name: "Chicken Masala Combo",
      category: "Chicken",
      fulfillment: "Hot kitchen delivery",
      tag: "Juicy combo",
      price: 299,
      description: "Boneless-style chicken masala with rice, two rotis, salad and spicy chutney.",
      meta: ["Non-veg", "Gravy", "Serves 1"],
      ingredients: ["Chicken", "Masala gravy", "Rice", "Roti", "Potato", "Mint", "Spicy chutney"],
      image: "assets/menu/chicken-masala.jpg"
    },
    {
      id: "dum-chicken-biryani",
      name: "Dum Chicken Biryani",
      category: "Biryani",
      fulfillment: "Hot kitchen delivery",
      tag: "Dum sealed",
      price: 279,
      description: "Aromatic chicken biryani with raita, salan and fried onion garnish.",
      meta: ["Non-veg", "Rice meal", "Raita side"],
      ingredients: ["Chicken", "Basmati rice", "Fried onion", "Raita", "Salan", "Cardamom", "Saffron rice"],
      image: "assets/menu/biryani.jpg"
    },
    {
      id: "tandoori-kebab-box",
      name: "Tandoori Kebab Box",
      category: "Kebab",
      fulfillment: "Hot kitchen delivery",
      tag: "Smoky",
      price: 249,
      description: "Charred kebab pieces with onion rings, mint chutney and lemon.",
      meta: ["Non-veg", "Starter", "Smoky"],
      ingredients: ["Kebab", "Tandoori masala", "Onion", "Lemon", "Mint chutney", "Coriander", "Char smoke"],
      image: "assets/menu/kebab-box.jpg"
    },
    {
      id: "party-mutton-tray",
      name: "Mutton Party Tray",
      category: "Party Tray",
      fulfillment: "Bulk tray fulfilment",
      tag: "Bulk",
      price: 1499,
      description: "Group-size mutton gravy tray with rice, rotis, salad and chutney cups.",
      meta: ["Non-veg", "Advance order", "Serves 4-6"],
      ingredients: ["Mutton", "Party gravy", "Rice", "Roti", "Salad", "Chutney cups", "Tray seal"],
      image: "assets/menu/party-mutton.jpg"
    },
    {
      id: "chicken-dal-rice",
      name: "Chicken Dal Rice Bowl",
      category: "Chicken",
      fulfillment: "Hot kitchen delivery",
      tag: "Comfort",
      price: 229,
      description: "Juicy chicken masala served over dal rice with pickle and onion salad.",
      meta: ["Non-veg", "Comfort bowl", "Lunch"],
      ingredients: ["Chicken", "Dal", "Rice", "Ghee tadka", "Pickle", "Onion salad", "Masala oil"],
      image: "assets/menu/dal-rice.jpg"
    },
    {
      id: "paneer-butter-combo",
      name: "Paneer Butter Combo",
      category: "Veg Backup",
      fulfillment: "Hot kitchen delivery",
      tag: "Veg option",
      price: 259,
      description: "Paneer butter masala with rice, two rotis and salad for vegetarian orders.",
      meta: ["Veg", "Creamy gravy", "Serves 1"],
      ingredients: ["Paneer", "Butter gravy", "Cream", "Rice", "Roti", "Salad", "Kasuri methi"],
      image: "assets/menu/paneer-combo.jpg"
    },
    {
      id: "classic-veg-thali",
      name: "Classic Veg Thali",
      category: "Veg Backup",
      fulfillment: "Hot kitchen delivery",
      tag: "Backup",
      price: 239,
      description: "Dal, seasonal sabzi, rice, rotis, salad and chutney for mixed group orders.",
      meta: ["Veg", "Thali", "Serves 1"],
      ingredients: ["Dal", "Sabzi", "Rice", "Roti", "Salad", "Chutney", "Pickle"],
      image: "assets/menu/veg-thali.jpg"
    }
  ];

  const comboMap = {
    "Office Lunch Box": ["chicken-masala", "chicken-dal-rice", "tandoori-kebab-box"],
    "Family Dinner Pack": ["handi-mutton", "dum-chicken-biryani", "tandoori-kebab-box"],
    "Juicy Non-Veg Pack": ["handi-mutton", "chicken-masala", "dum-chicken-biryani", "tandoori-kebab-box"]
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
          <div class="ingredient-burst" aria-label="Key ingredients for ${item.name}">
            ${item.ingredients.map((ingredient, index) => `<span style="--ingredient-index: ${index}">${ingredient}</span>`).join("")}
          </div>
        </div>
        <div class="dish-body">
          <div class="dish-head">
            <h3>${item.name}</h3>
            <span class="price">${formatRs(item.price)}</span>
          </div>
          <p>${item.description}</p>
          <div class="dish-meta">${item.meta.map(meta => `<span>${meta}</span>`).join("")}</div>
          <div class="ingredient-list"><strong>Ingredients</strong><span>${item.ingredients.join(", ")}</span></div>
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

    const groupedLines = Object.groupBy ? Object.groupBy(lines, line => line.fulfillment) : lines.reduce((groups, line) => {
      groups[line.fulfillment] = groups[line.fulfillment] || [];
      groups[line.fulfillment].push(line);
      return groups;
    }, {});

    cartItems.innerHTML = lines.length ? Object.entries(groupedLines).map(([fulfillment, groupLines]) => `
      <section class="cart-group">
        <strong class="cart-group-title">${fulfillment}</strong>
        ${groupLines.map(line => `
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
        `).join("")}
      </section>
    `).join("") : `<div class="cart-empty">Your order is empty. Add juicy mutton, chicken, biryani or kebab items to prepare a WhatsApp checkout.</div>`;
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
    const groupedLines = lines.reduce((groups, line) => {
      groups[line.fulfillment] = groups[line.fulfillment] || [];
      groups[line.fulfillment].push(line);
      return groups;
    }, {});
    const orderLines = Object.entries(groupedLines).map(([fulfillment, groupLines]) => [
      `${fulfillment}:`,
      ...groupLines.map(line => `- ${line.name} x ${line.quantity} = ${formatRs(line.lineTotal)}`)
    ].join("\n")).join("\n\n");

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
