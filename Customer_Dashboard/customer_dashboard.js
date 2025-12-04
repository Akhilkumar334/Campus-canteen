// =============================================
// Customer Dashboard — compact app style JS
// =============================================

// --- Helper to safely get DOM
const $ = (id) => document.getElementById(id);

// --- Customer info
const customerName = localStorage.getItem("currentCustomer") || "Customer";
const initial = (customerName && customerName[0]) ? customerName[0].toUpperCase() : "C";

// set profile initial & name
if ($("profileInitial")) $("profileInitial").innerText = initial;
if ($("profileName")) $("profileName").innerText = customerName;
if ($("custBrand")) $("custBrand").innerText = "Customer";
if ($("greetLine")) {
    const hour = new Date().getHours();
    let greet = (hour < 12) ? "🌅 Good Morning, " : (hour < 17) ? "☀️ Good Afternoon, " : "🌙 Good Evening, ";
    $("greetLine").innerText = greet + customerName + "!";
}

// --- Profile dropdown toggle
const profileBtn = $("profileBtn");
const profileDropdown = $("profileDropdown");
if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", () => {
        const shown = profileDropdown.style.display === "block";
        profileDropdown.style.display = shown ? "none" : "block";
        profileBtn.setAttribute("aria-expanded", String(!shown));
    });

    // click outside to close
    document.addEventListener("click", (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.style.display = "none";
            profileBtn.setAttribute("aria-expanded", "false");
        }
    });
}

// --- Tab switcher functions
function showCanteens() {
    $("tabCanteens").classList.add("active");
    $("tabHomeCooks").classList.remove("active");
    $("canteenList").hidden = false;
    $("homecookList").hidden = true;
}
function showHomeCooks() {
    $("tabHomeCooks").classList.add("active");
    $("tabCanteens").classList.remove("active");
    $("homecookList").hidden = false;
    $("canteenList").hidden = true;
}

// --- Open menu (saves vendor selection)
function openMenu(type, email) {
    try {
        localStorage.setItem("selectedVendorType", type);
        localStorage.setItem("selectedVendorEmail", email);
        // go to menu page (adjust path if required)
        window.location.href = "customer_view_menu.html";
    } catch (e) {
        alert("Unable to open menu. " + e);
    }
}

// --- Render canteens (only supports single shopkeeper keys used in your app)
function loadCanteens() {
    const list = $("canteenList");
    if (!list) return;
    list.innerHTML = "";

    // check shopkeeper approval
    const verified = localStorage.getItem("shopkeeperVerified");
    if (verified !== "approved") {
        list.innerHTML = `<div class="restaurant-card"><div style="color:#556; padding:10px;">No approved canteen available.</div></div>`;
        return;
    }

    const shopName = localStorage.getItem("shop_shopName") || "Canteen";
    const email = localStorage.getItem("shop_email") || "";
    const status = localStorage.getItem(`spk_status_${email}`) || "Closed";
    const prepay = localStorage.getItem(`spk_prepay_${email}`) || localStorage.getItem(`spk_prepaid_${email}`) || 0;
    const packaging = localStorage.getItem(`spk_packaging_${email}`) || 0;

    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
        <div class="restaurant-title">${escapeHtml(shopName)}</div>
        <div class="slot-info">
            <span class="status-tag ${status === "Open" ? "status-open" : "status-closed"}">${status}</span>
        </div>
        <div class="slot-info"><strong>Prepay Required:</strong> ${prepay}%</div>
        <div class="slot-info"><strong>Packaging:</strong> ₹${packaging}</div>
        <button class="view-menu-btn" onclick="openMenu('shopkeeper','${email}')">View Menu</button>
    `;

    list.appendChild(card);
}

// --- Render homecooks
function loadHomeCooks() {
    const list = $("homecookList");
    if (!list) return;
    list.innerHTML = "";

    const homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];
    const approved = homecooks.filter(h => h.status === "approved");

    if (approved.length === 0) {
        list.innerHTML = `<div class="restaurant-card"><div style="color:#556; padding:10px;">No approved homecooks available.</div></div>`;
        return;
    }

    approved.forEach(hc => {
        const email = hc.email || "";
        const status = localStorage.getItem(`homecook_status_${email}`) || hc.status || "Closed";
        const orderSlots = JSON.parse(localStorage.getItem(`homecook_orderSlots_${email}`)) || [];
        const deliverySlots = JSON.parse(localStorage.getItem(`homecook_deliverySlots_${email}`)) || [];

        const orderText = (orderSlots.length > 0) ? orderSlots.map(s => formatTime(s.start) + "–" + formatTime(s.end)).join(", ") : "Not set";
        const delText = (deliverySlots.length > 0) ? deliverySlots.map(t => formatTime(t)).join(", ") : "Not set";

        const card = document.createElement("div");
        card.className = "restaurant-card";

        card.innerHTML = `
            <div class="restaurant-title">${escapeHtml(hc.fullName || hc.kitchenName || "HomeCook")}'s Kitchen</div>
            <div class="slot-info"><span class="status-tag ${status === "Open" ? "status-open" : "status-closed"}">${status}</span></div>
            <div class="slot-info"><strong>Order Slots:</strong> ${escapeHtml(orderText)}</div>
            <div class="slot-info"><strong>Delivery:</strong> ${escapeHtml(delText)}</div>
            <button class="view-menu-btn" onclick="openMenu('homecook','${email}')">View Menu</button>
        `;

        list.appendChild(card);
    });
}

// --- format HH:MM -> 12hr
function formatTime(t) {
    if (!t) return "";
    const parts = t.split(":");
    if (parts.length < 2) return t;
    let hh = parseInt(parts[0], 10);
    const mm = parts[1].padStart(2, "0");
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    if (hh === 0) hh = 12;
    return `${hh}:${mm} ${ampm}`;
}

// --- escape HTML small helper
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- Search & filtering
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");

function applySearchFilter() {
    const q = (searchInput && searchInput.value) ? searchInput.value.trim().toLowerCase() : "";

    // filter canteens (single card case)
    const canteenList = $("canteenList");
    if (canteenList) {
        // reload canteens then hide if not match
        loadCanteens();
        if (q) {
            Array.from(canteenList.children).forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(q) ? "" : "none";
            });
        }
    }

    // filter homecooks
    const homecookList = $("homecookList");
    if (homecookList) {
        loadHomeCooks();
        if (q) {
            Array.from(homecookList.children).forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(q) ? "" : "none";
            });
        }
    }
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        applySearchFilter();
    });
}
if (clearSearch) {
    clearSearch.addEventListener("click", () => {
        if (searchInput) { searchInput.value = ""; applySearchFilter(); }
    });
}

// --- Logout
function logout() {
    localStorage.removeItem("currentCustomer");
    // optionally clear selected vendor
    localStorage.removeItem("selectedVendorType");
    localStorage.removeItem("selectedVendorEmail");
    window.location.href = "../index.html";
}

// --- initial load
loadCanteens();
loadHomeCooks();

// expose some functions to global scope (for inline onclick)
window.openMenu = openMenu;
window.showCanteens = showCanteens;
window.showHomeCooks = showHomeCooks;
window.logout = logout;
