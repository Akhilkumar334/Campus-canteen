// Customer Orders - Card list JS

// Helper
const $ = (id) => document.getElementById(id);

// Current customer
const currentCustomer = localStorage.getItem("currentCustomer") || localStorage.getItem("currentUser") || "Customer";

// Orders container
const ordersListEl = $("ordersList");

// Modal
const modal = $("orderModal");
const modalContent = $("modalContent");

function closeModal() {
  if (modal) modal.style.display = "none";
  if (modal) modal.setAttribute("aria-hidden", "true");
}

// get all orders for currentCustomer by scanning localStorage keys 'orders_<vendor>'
function gatherCustomerOrders() {
  const orders = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (key.startsWith("orders_")) {
      try {
        const arr = JSON.parse(localStorage.getItem(key)) || [];
        // vendor email is after prefix
        const vendorEmail = key.replace("orders_", "");

        arr.forEach(o => {
          if (!o) return;
          // match by customer field (string)
          if (String(o.customer) === String(currentCustomer)) {
            // also store vendor info
            orders.push({
              vendorEmail,
              order: o
            });
          }
        });
      } catch (e) {
        // ignore parse errors
        console.warn("orders parse error", key, e);
      }
    }
  }

  // sort by newest first (if time available use timestamp - fallback preserve)
  orders.sort((a,b) => {
    // try parse date/time if present
    const ta = a.order._ts || a.order.time || "";
    const tb = b.order._ts || b.order.time || "";
    if (ta && tb) return (ta < tb) ? 1 : -1;
    return 0;
  });

  return orders;
}

// format time maybe given as locale string
function niceTime(t) {
  if (!t) return "";
  // if already includes AM/PM return as-is
  if (String(t).match(/AM|PM|am|pm/)) return t;
  try {
    const d = new Date(t);
    if (!isNaN(d)) {
      return d.toLocaleString();
    }
  } catch (e) {}
  return t;
}

// Get vendor name (shopkeeper or homecook)
function getVendorNameByEmail(email) {
  // check single shopkeeper keys
  const shopEmail = localStorage.getItem("shop_email");
  if (shopEmail === email) {
    return localStorage.getItem("shop_shopName") || "Canteen";
  }

  // check homecooksList
  const homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];
  const hc = homecooks.find(h => h.email === email);
  if (hc) return hc.fullName || (hc.kitchenName ? hc.kitchenName : "HomeCook");

  // fallback to email
  return email;
}

// Render one order card
function renderOrderCard(vendorEmail, orderObj, index) {
  const order = orderObj;
  const card = document.createElement("div");
  card.className = "order-card";

  // status classes: pending|accepted|rejected|completed
  const status = (order.status || "pending").toString().toLowerCase();

  // small vendor info
  const vendorName = getVendorNameByEmail(vendorEmail);

  // left area
  const left = document.createElement("div");
  left.className = "order-left";
  left.innerHTML = `
    <div class="order-header">
      <div class="order-id">Order #${order.id || ("ORD"+(10000+index))}</div>
      <div class="order-meta">${niceTime(order.time)}</div>
    </div>
    <div class="order-meta"><strong>Vendor:</strong> ${escapeHtml(vendorName)}</div>
    <ul class="items-list">
      ${ (order.items || []).slice(0,5).map(i => `<li>${escapeHtml(i)}</li>`).join("") }
      ${(order.items && order.items.length>5) ? `<li>and ${order.items.length-5} more...</li>` : "" }
    </ul>
  `;

  // right area
  const right = document.createElement("div");
  right.className = "order-right";
  right.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;">
      <span class="status ${escapeHtml(status)}">${escapeHtml(status)}</span>
    </div>
    <div class="total">₹${order.total || 0}</div>
    <div class="card-actions">
      <button class="btn ghost" onclick='viewDetails(${index})'>View</button>
      <button class="btn primary" onclick='reorder(${index})'>Reorder</button>
    </div>
  `;

  card.appendChild(left);
  card.appendChild(right);

  return card;
}

// escape helper
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// global orders array for view/reorder handlers
let globalOrders = [];

// Render all orders
function renderOrders() {
  const found = gatherCustomerOrders();
  globalOrders = found; // store

  ordersListEl.innerHTML = "";

  if (!found || found.length === 0) {
    ordersListEl.innerHTML = `<div class="order-card"><div style="color:#556;padding:12px;">You have no orders yet.</div></div>`;
    return;
  }

  found.forEach((entry, idx) => {
    const card = renderOrderCard(entry.vendorEmail, entry.order, idx);
    ordersListEl.appendChild(card);
  });
}

// View details - opens modal for a given index
function viewDetails(index) {
  const entry = globalOrders[index];
  if (!entry) return;
  const o = entry.order;
  const vendorName = getVendorNameByEmail(entry.vendorEmail);

  const html = `
    <h3>Order #${o.id}</h3>
    <p><strong>Vendor:</strong> ${escapeHtml(vendorName)}</p>
    <p><strong>Time:</strong> ${niceTime(o.time)}</p>
    <p><strong>Status:</strong> <span class="status ${escapeHtml((o.status||"").toLowerCase())}">${escapeHtml(o.status || "")}</span></p>
    <hr/>
    <h4>Items</h4>
    <ul>
      ${(o.items || []).map(i => `<li>${escapeHtml(i)}</li>`).join("")}
    </ul>
    <p><strong>Total:</strong> ₹${o.total || 0}</p>
  `;

  modalContent.innerHTML = html;
  if (modal) {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  }
}

// Reorder - copies order items into reorder_cart and opens menu for that vendor
function reorder(index) {
  const entry = globalOrders[index];
  if (!entry) { alert("Order not found."); return; }

  const vendorEmail = entry.vendorEmail;
  const order = entry.order;

  // try to determine vendor type - shopkeeper or homecook
  const shopEmail = localStorage.getItem("shop_email");
  const vendorType = (vendorEmail === shopEmail) ? "shopkeeper" : "homecook";

  // prepare items - original order.items is array of strings like "2 × Paneer Thali"
  const items = (order.items || []).map(s => {
    // try to split "qty × name"
    const parts = String(s).split("×");
    if (parts.length === 2) {
      const qty = Number(parts[0].trim()) || 1;
      const name = parts[1].trim();
      return { name, qty };
    } else {
      return { name: s, qty: 1 };
    }
  });

  // save reorder into localStorage
  const reorderObj = {
    vendorType,
    vendorEmail,
    items
  };

  localStorage.setItem("reorder_cart", JSON.stringify(reorderObj));
  localStorage.setItem("selectedVendorType", vendorType);
  localStorage.setItem("selectedVendorEmail", vendorEmail);

  // NOTE:
  // To auto-fill the menu page with these items you should add a small snippet
  // at the top of customer_view_menu.js (or run logic there) that reads
  // localStorage.getItem('reorder_cart'), and sets initial quantities accordingly.
  //
  // Example snippet to paste into customer_view_menu.js right after loadVendor():
  //
  // const reorderRaw = localStorage.getItem('reorder_cart');
  // if (reorderRaw) {
  //   try {
  //     const r = JSON.parse(reorderRaw);
  //     // r.items = [{name, qty}, ...] -> you can prefill the in-memory cart
  //     // by matching names to menu item ids and setting qtys
  //     // After using it, clear localStorage.removeItem('reorder_cart');
  //   } catch(e){}
  // }
  //
  // I intentionally do not modify your menu file here; this approach keeps responsibility clear.

  // navigate to menu page
  window.location.href = "customer_view_menu.html";
}

// logout helper used by sidebar
function logout() {
  localStorage.removeItem("currentCustomer");
  window.location.href = "../index.html";
}

// close modal on background click
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// initial render
renderOrders();

// expose for inline handlers
window.viewDetails = viewDetails;
window.reorder = reorder;
window.closeModal = closeModal;
window.logout = logout;
