// ===============================
// CUSTOMER VIEW MENU — JS
// ===============================

// Selected vendor from dashboard
const vendorType = localStorage.getItem("selectedVendorType");
const vendorEmail = localStorage.getItem("selectedVendorEmail");

if (!vendorType || !vendorEmail) {
    alert("Vendor not selected.");
    window.location.href = "customer_dashboard.html";
}

// ELEMENTS
const vendorHeader = document.getElementById("vendorHeader");
const menuList = document.getElementById("menuList");
const cartItems = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("totalAmount");
const prepayRow = document.getElementById("prepayRow");
const prepayAmountEl = document.getElementById("prepayAmount");

// In-memory cart
let cart = {};


// ===============================
// LOAD VENDOR INFO + MENU
// ===============================
function loadVendor() {
    if (vendorType === "shopkeeper") {
        loadShopkeeper();
    } else {
        loadHomecook();
    }
}

// -------- LOAD SHOPKEEPER --------
function loadShopkeeper() {
    const name = localStorage.getItem("shop_shopName");
    const status = localStorage.getItem(`spk_status_${vendorEmail}`) || "Closed";
    const prepay = Number(localStorage.getItem(`spk_prepay_${vendorEmail}`) || 0);
    const packaging = Number(localStorage.getItem(`spk_packaging_${vendorEmail}`) || 0);

    vendorHeader.innerHTML = `
        <h2 class="vendor-title">${name}</h2>
        <span class="status-tag ${status === "Open" ? "status-open" : "status-closed"}">${status}</span>
        <p class="vendor-info"><strong>Prepay:</strong> ${prepay}%</p>
        <p class="vendor-info"><strong>Packaging:</strong> ₹${packaging}</p>
    `;

    const menu = JSON.parse(localStorage.getItem(`spk_menu_${vendorEmail}`)) || [];
    renderMenu(menu);

    // Save prepay info globally
    window.prepayPercent = prepay;
}

// -------- LOAD HOMECOOK --------
function loadHomecook() {
    const homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];
    const hc = homecooks.find(x => x.email === vendorEmail);

    const status = localStorage.getItem(`homecook_status_${vendorEmail}`) || "Closed";

    vendorHeader.innerHTML = `
        <h2 class="vendor-title">${hc.fullName}'s Kitchen</h2>
        <span class="status-tag ${status === "Open" ? "status-open" : "status-closed"}">${status}</span>
    `;

    const menu = JSON.parse(localStorage.getItem(`homecook_menu_${vendorEmail}`)) || [];
    renderMenu(menu);

    window.prepayPercent = 0; // homecooks do NOT use prepay
}


// ===============================
// RENDER MENU ITEMS
// ===============================
function renderMenu(menu) {
    menuList.innerHTML = "";

    menu.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <div class="item-price">₹${item.price}</div>
            </div>

            <div class="qty-controls">
                <button class="qty-btn" onclick="decreaseQty('${item.id}', ${item.price})">-</button>
                <div id="qty_${item.id}" class="qty-number">0</div>
                <button class="qty-btn" onclick="increaseQty('${item.id}', '${item.name}', ${item.price})">+</button>
            </div>
        `;

        menuList.appendChild(div);
    });
}


// ===============================
// CART FUNCTIONS
// ===============================

function increaseQty(id, name, price) {
    if (!cart[id]) {
        cart[id] = { name, price, qty: 1 };
    } else {
        cart[id].qty++;
    }
    updateCart();
}

function decreaseQty(id) {
    if (cart[id]) {
        cart[id].qty--;
        if (cart[id].qty <= 0) delete cart[id];
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    Object.values(cart).forEach(item => {
        subtotal += item.qty * item.price;

        const c = document.createElement("div");
        c.className = "cart-item";

        c.innerHTML = `
            <span>${item.name} × ${item.qty}</span>
            <span>₹${item.qty * item.price}</span>
        `;

        cartItems.appendChild(c);
    });

    subtotalEl.innerText = subtotal;

    // PREPAY (shopkeeper only)
    if (vendorType === "shopkeeper" && window.prepayPercent > 0) {
        const prepayAmount = Math.round(subtotal * (window.prepayPercent / 100));
        prepayAmountEl.innerText = prepayAmount;
        prepayRow.style.display = "block";
        totalEl.innerText = subtotal;
    } else {
        prepayRow.style.display = "none";
        totalEl.innerText = subtotal;
    }
}


// ===============================
// PLACE ORDER
// ===============================
// function placeOrder() {
//     if (Object.keys(cart).length === 0) {
//         alert("Your cart is empty.");
//         return;
//     }

//     const orderId = "ORD" + Math.floor(Math.random() * 90000 + 10000);

//     const order = {
//         id: orderId,
//         customer: localStorage.getItem("currentCustomer"),
//         time: new Date().toLocaleTimeString(),
//         items: Object.values(cart).map(i => `${i.qty} × ${i.name}`),
//         total: Number(totalEl.innerText),
//         status: "pending"
//     };

//     // Save order under vendor
//     const key = `orders_${vendorEmail}`;
//     const oldOrders = JSON.parse(localStorage.getItem(key)) || [];
//     oldOrders.push(order);
//     localStorage.setItem(key, JSON.stringify(oldOrders));

//     alert("Order placed successfully!");
//     window.location.href = "customer_dashboard.html";
// }
function placeOrder() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty.");
        return;
    }
    const customerName =
    localStorage.getItem("currentCustomer") ||
    localStorage.getItem("currentUser") ||
    "Guest";

    const order = {
        id: "ORD" + Date.now(),
        customer: customerName,
        vendorType: vendorType,
        vendorEmail: vendorEmail,
        time: new Date().toLocaleString(),
        items: Object.values(cart).map(i => `${i.qty} × ${i.name}`),
        total: Number(totalEl.innerText),
        status: "pending"
    };

    // 1️⃣ SAVE FOR CONFIRMATION PAGE
    localStorage.setItem("latest_customer_order", JSON.stringify(order));
    localStorage.setItem("latest_order_vendor", vendorEmail);
    localStorage.setItem("latest_vendor_type", vendorType);

    // 2️⃣ SAVE TO GLOBAL ORDERS LIST (CRITICAL)
    let ordersList = JSON.parse(localStorage.getItem("ordersList")) || [];
    ordersList.push(order);
    localStorage.setItem("ordersList", JSON.stringify(ordersList));

    // 3️⃣ CLEAR CART
    cart = {};

    // 4️⃣ GO TO CONFIRMATION PAGE
    window.location.href = "customer_order_confirm.html";
}



// ===============================
function goBack() {
    window.location.href = "customer_dashboard.html";
}


// ===============================
loadVendor();
