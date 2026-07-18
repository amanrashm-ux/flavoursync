(() => {
  const WHATSAPP_NUMBER = "918405917655";
  const PHONE_DISPLAY = "+91 84059 17655";
  const loader = document.getElementById("loader");
  let toast = document.getElementById("toast");
  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");
  let currentOrderMessage = "";

  function getWhatsAppUrl(message) {
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
  }

  function createOrderSheet() {
    if (document.getElementById("orderSheet")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="order-sheet" id="orderSheet" aria-hidden="true">
        <div class="order-sheet-backdrop" data-close-order-sheet></div>
        <section class="order-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="orderSheetTitle">
          <header>
            <div>
              <span>Order Handoff</span>
              <h2 id="orderSheetTitle">Send this to FlavourSync</h2>
            </div>
            <button class="icon-action" type="button" data-close-order-sheet aria-label="Close order handoff"><i data-lucide="x"></i></button>
          </header>
          <p class="order-sheet-note">If WhatsApp Web says the number is not available, copy this message or call ${PHONE_DISPLAY} directly.</p>
          <div class="order-sheet-proof"><i data-lucide="badge-check"></i><span>Order contact set to ${PHONE_DISPLAY}. WhatsApp availability is controlled by the account linked to that number.</span></div>
          <pre id="orderMessagePreview"></pre>
          <div class="order-sheet-actions">
            <a class="btn btn-secondary" id="orderSheetWhatsapp" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> Open WhatsApp</a>
            <button class="btn btn-primary" type="button" id="copyOrderMessage"><i data-lucide="copy"></i> Copy Message</button>
            <a class="btn btn-soft" href="tel:+${WHATSAPP_NUMBER}"><i data-lucide="phone"></i> Call</a>
          </div>
        </section>
      </div>
    `);

    document.querySelectorAll("[data-close-order-sheet]").forEach(control => {
      control.addEventListener("click", closeOrderSheet);
    });

    document.getElementById("copyOrderMessage").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(currentOrderMessage);
        showToast("Order message copied.");
      } catch {
        const preview = document.getElementById("orderMessagePreview");
        const range = document.createRange();
        range.selectNodeContents(preview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        showToast("Message selected. Press Ctrl+C to copy.");
      }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function openOrderSheet(message) {
    createOrderSheet();
    currentOrderMessage = message;
    const sheet = document.getElementById("orderSheet");
    document.getElementById("orderMessagePreview").textContent = message;
    document.getElementById("orderSheetWhatsapp").href = getWhatsAppUrl(message);
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
  }

  function closeOrderSheet() {
    const sheet = document.getElementById("orderSheet");
    if (!sheet) return;
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
  }

  function openWhatsApp(message) {
    openOrderSheet(message);
  }

  function showToast(message) {
    if (!toast) {
      document.body.insertAdjacentHTML("beforeend", `<div class="toast" id="toast" role="status" aria-live="polite"></div>`);
      toast = document.getElementById("toast");
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function todayValue() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }

  window.FlavourSync = { openWhatsApp, showToast };

  window.addEventListener("load", () => {
    if (loader) setTimeout(() => loader.classList.add("done"), 550);
  });

  if (!document.querySelector(".announcement")) {
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="announcement">
        <span>Fresh batch ordering</span>
        <strong>Danapur and nearby Patna</strong>
        <a href="tel:+${WHATSAPP_NUMBER}">${PHONE_DISPLAY}</a>
      </div>
    `);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach(link => {
    const linkPage = link.getAttribute("href")?.split("#")[0];
    if (!linkPage || linkPage !== currentPage) return;
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll(".whatsapp-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openWhatsApp(link.dataset.whatsapp || "Hello FlavourSync, I want to place an order.");
    });
  });

  const footer = document.querySelector(".footer");
  if (footer && !footer.querySelector(".footer-nav")) {
    footer.insertAdjacentHTML("beforeend", `
      <nav class="footer-nav" aria-label="Footer links">
        <a href="menu.html">Menu</a>
        <a href="schedule.html">Schedule</a>
        <a href="catering.html">Bulk Orders</a>
        <a href="story.html">Story</a>
        <a href="policies.html">Policies</a>
        <a href="contact.html">Contact</a>
      </nav>
    `);
  }

  const dock = document.createElement("div");
  dock.className = "floating-dock";
  dock.innerHTML = `
    <a href="menu.html#order" aria-label="Open menu"><i data-lucide="utensils"></i><span>Menu</span></a>
    <button type="button" aria-label="Order on WhatsApp"><i data-lucide="message-circle"></i><span>WhatsApp</span></button>
  `;
  document.body.appendChild(dock);
  dock.querySelector("button").addEventListener("click", () => {
    openWhatsApp("Hello FlavourSync, I want to place an order.");
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuButton.innerHTML = isOpen ? `<i data-lucide="x"></i>` : `<i data-lucide="menu"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });

    mobileNav.addEventListener("click", event => {
      if (!event.target.closest("a")) return;
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.innerHTML = `<i data-lucide="menu"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = todayValue();
  });

  document.querySelectorAll(".slot-button").forEach(button => {
    button.addEventListener("click", () => {
      const timeInput = document.getElementById("scheduleTime");
      if (timeInput) {
        timeInput.value = button.dataset.slot;
        showToast("Preferred time added.");
      }
    });
  });

  const scheduleForm = document.getElementById("scheduleOrderForm");
  if (scheduleForm) {
    scheduleForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("scheduleName").value.trim();
      const area = document.getElementById("scheduleArea").value.trim();
      const date = document.getElementById("scheduleDate").value.trim();
      const time = document.getElementById("scheduleTime").value.trim();
      const people = document.getElementById("schedulePeople").value.trim();
      const meal = document.getElementById("scheduleMeal").value.trim();
      const service = document.getElementById("scheduleService").value.trim();
      const spice = document.getElementById("scheduleSpice").value.trim();
      const details = document.getElementById("scheduleDetails").value.trim();

      if (!date || !time || !details) {
        showToast("Add date, time and preferred items.");
        return;
      }

      openWhatsApp([
        "Hello FlavourSync, I want to schedule an order.",
        name ? `Name: ${name}` : "",
        area ? `Delivery locality: ${area}` : "",
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        people ? `People: ${people}` : "",
        meal ? `Meal type: ${meal}` : "",
        service ? `Service: ${service}` : "",
        spice ? `Spice level: ${spice}` : "",
        `Preferred items: ${details}`,
        "Please confirm availability, final bill and delivery time."
      ].filter(Boolean).join("\n"));
    });
  }

  const cateringForm = document.getElementById("cateringForm");
  if (cateringForm) {
    cateringForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("cateringName").value.trim();
      const people = document.getElementById("cateringPeople").value.trim();
      const occasion = document.getElementById("cateringOccasion").value.trim();
      const style = document.getElementById("cateringStyle").value.trim();
      const date = document.getElementById("cateringDate").value.trim();
      const area = document.getElementById("cateringArea").value.trim();
      const details = document.getElementById("cateringDetails").value.trim();

      if (!people || !date || !details) {
        showToast("Add headcount, date/time and food requirement.");
        return;
      }

      openWhatsApp([
        "Hello FlavourSync, I want to enquire about a bulk order.",
        name ? `Name: ${name}` : "",
        `People: ${people}`,
        occasion ? `Occasion: ${occasion}` : "",
        style ? `Service style: ${style}` : "",
        `Date/time: ${date}`,
        area ? `Delivery locality: ${area}` : "",
        `Food requirement: ${details}`,
        "Please share availability and pricing."
      ].filter(Boolean).join("\n"));
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeOrderSheet();
    if (event.key === "Escape" && mobileNav) {
      mobileNav.classList.remove("open");
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.innerHTML = `<i data-lucide="menu"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  });
})();
