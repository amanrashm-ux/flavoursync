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
      video: "assets/menu-video/mutton-grill.mp4",
      taste: { heat: 74, richness: 94, smoke: 32, notes: ["bone-rich", "silky gravy", "deep masala"] }
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
      video: "assets/menu-video/chicken-grill.mp4",
      taste: { heat: 78, richness: 88, smoke: 26, notes: ["juicy curry", "ginger kick", "masala oil"] }
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
      video: "assets/menu-video/biryani-spice.mp4",
      taste: { heat: 66, richness: 76, smoke: 22, notes: ["dum aroma", "fried onion", "raita cool"] }
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
      video: "assets/menu-video/kebab-skewers.mp4",
      taste: { heat: 72, richness: 70, smoke: 96, notes: ["charred edge", "mint snap", "lemon lift"] }
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
      video: "assets/menu-video/party-bbq.mp4",
      taste: { heat: 82, richness: 92, smoke: 74, notes: ["party grill", "fat glaze", "shareable"] }
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
      video: "assets/menu-video/dal-sauce.mp4",
      taste: { heat: 58, richness: 82, smoke: 20, notes: ["comfort bowl", "ghee tadka", "pickle pop"] }
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
      video: "assets/menu-video/paneer-lemon.mp4",
      taste: { heat: 42, richness: 90, smoke: 18, notes: ["creamy", "butter finish", "methi aroma"] }
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
      video: "assets/menu-video/thali-pepper.mp4",
      taste: { heat: 46, richness: 68, smoke: 12, notes: ["balanced", "home-style", "pickle bite"] }
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

  function sceneType(item) {
    if (item.id.includes("biryani")) return "biryani";
    if (item.id.includes("kebab")) return "kebab";
    if (item.id.includes("party")) return "party";
    if (item.id.includes("mutton")) return "mutton";
    if (item.id.includes("paneer")) return "paneer";
    if (item.id.includes("thali")) return "thali";
    if (item.id.includes("dal")) return "bowl";
    return "chicken";
  }

  function ingredientKind(ingredient) {
    const value = ingredient.toLowerCase();
    if (value.includes("mutton")) return "mutton";
    if (value.includes("chicken") || value.includes("kebab")) return "chicken";
    if (value.includes("paneer")) return "paneer";
    if (value.includes("rice") || value.includes("basmati")) return "rice";
    if (value.includes("roti")) return "roti";
    if (value.includes("onion") || value.includes("salad")) return "salad";
    if (value.includes("lemon")) return "lemon";
    if (value.includes("chutney") || value.includes("mint")) return "chutney";
    if (value.includes("dal")) return "dal";
    if (value.includes("pickle")) return "pickle";
    return "spice";
  }

  function renderDishMotion(item, variant = "card") {
    const scene = sceneType(item);
    const floaters = item.ingredients.slice(0, 6).map((ingredient, index) => {
      return `<span class="ingredient-chip ingredient-${ingredientKind(ingredient)}" style="--i: ${index};">${ingredient}</span>`;
    }).join("");

    if (variant === "cart") {
      return `
        <div class="cart-video-thumb scene-${scene}" aria-hidden="true">
          <video autoplay muted loop playsinline preload="metadata" src="${item.video}"></video>
          <span></span>
        </div>`;
    }

    return `
      <div class="dish-video-shell scene-${scene}" aria-label="Animated preview for ${item.name}">
        <video class="dish-video" autoplay muted loop playsinline preload="metadata">
          <source src="${item.video}" type="video/mp4">
        </video>
        <span class="dish-video-scrim"></span>
        <span class="video-progress"></span>
        <span class="dish-tag">${item.tag}</span>
        <span class="dish-category">${item.category}</span>
        <div class="ingredient-floaters" aria-hidden="true">${floaters}</div>
        <div class="recipe-reel">
          <span>Cut</span>
          <span>Marinate</span>
          <span>Sear</span>
          <span>Pack hot</span>
        </div>
      </div>`;
  }

  function renderMenu() {
    const items = filteredItems();
    menuGrid.innerHTML = items.length ? items.map(item => `
      <article class="dish-card" data-kinetic-card data-dish-id="${item.id}" style="--taste-heat: ${item.taste.heat}%; --taste-richness: ${item.taste.richness}%; --taste-smoke: ${item.taste.smoke}%;">
        ${renderDishMotion(item)}
        <div class="dish-body">
          <div class="dish-head">
            <h3>${item.name}</h3>
            <span class="price">${formatRs(item.price)}</span>
          </div>
          <p>${item.description}</p>
          <div class="dish-meta">${item.meta.map(meta => `<span>${meta}</span>`).join("")}</div>
          <div class="taste-profile" aria-label="Taste profile for ${item.name}">
            <div class="taste-notes">${item.taste.notes.map(note => `<span>${note}</span>`).join("")}</div>
            <div class="taste-bars">
              <span><b>Heat</b><i style="--value: ${item.taste.heat}%"></i></span>
              <span><b>Rich</b><i style="--value: ${item.taste.richness}%"></i></span>
              <span><b>Smoke</b><i style="--value: ${item.taste.smoke}%"></i></span>
            </div>
          </div>
          <div class="ingredient-list"><strong>Ingredients</strong><span>${item.ingredients.join(", ")}</span></div>
          <button class="btn btn-soft add-item" type="button" data-id="${item.id}">
            <i data-lucide="plus"></i> Add to Order
          </button>
        </div>
      </article>
    `).join("") : `<div class="cart-empty full-field">No dishes match that search.</div>`;

    if (window.lucide) window.lucide.createIcons();
    menuGrid.dispatchEvent(new CustomEvent("flavoursync:menu-rendered", { bubbles: true }));
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
            ${renderDishMotion(line, "cart")}
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
