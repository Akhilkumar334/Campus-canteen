// // Load data
// let orders = JSON.parse(localStorage.getItem("shopOrders")) || [];
// let history = JSON.parse(localStorage.getItem("shopOrderHistory")) || [];

// // Highlight active sidebar item
// activeHighlight("orders");
// function activeHighlight(pageName) {
//     document.querySelectorAll(".sidebar li").forEach(li => {
//         if (li.dataset.page === pageName) {
//             li.classList.add("active");
//         }
//     });
// }

// // DISPLAY ALL ORDERS
// function loadOrders() {
//     const container = document.getElementById("ordersContainer");
//     container.innerHTML = "";

//     if (orders.length === 0) {
//         container.innerHTML = "<p>No pending orders found.</p>";
//         return;
//     }

//     orders.forEach((order, index) => {
//         container.innerHTML += `
//             <div class="order-card">
//                 <div class="order-header">
//                     <h3>Order #${order.orderId}</h3>
//                     <p><strong>Status:</strong> ${order.status}</p>
//                 </div>

//                 <p class="order-detail"><strong>Customer:</strong> ${order.customerName}</p>
//                 <p class="order-detail"><strong>Email:</strong> ${order.email}</p>
//                 <p class="order-detail"><strong>Items:</strong> ${order.items.join(", ")}</p>
//                 <p class="order-detail"><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
//                 <p class="order-detail"><strong>Payment:</strong> ${order.paymentMethod}</p>
                
//                 ${order.paymentMethod === "offline" ? 
//                     `<p class="order-detail"><strong>Advance Paid:</strong> ₹${order.advancePaid}</p>` : ""
//                 }

//                 <div class="btn-row">

//                     ${order.status === "pending" ? 
//                     `
//                     <button class="accept-btn" onclick="acceptOrder(${index})">Accept</button>
//                     <button class="reject-btn" onclick="rejectOrder(${index})">Reject</button>
//                     `
//                     : `
//                     <button class="update-btn" onclick="updateStatus(${index})">Update Status</button>
//                     `}
//                 </div>
//             </div>
//         `;
//     });
// }

// loadOrders();


// // ACCEPT ORDER
// function acceptOrder(i) {
//     orders[i].status = "accepted";
//     saveOrders();
// }


// // REJECT ORDER
// function rejectOrder(i) {
//     let cancelled = orders[i];
//     cancelled.status = "cancelled";

//     history.push(cancelled);
//     orders.splice(i, 1);

//     saveOrders();
// }


// // UPDATE STATUS
// function updateStatus(i) {
//     let current = orders[i].status;

//     if (current === "accepted") orders[i].status = "preparing";
//     else if (current === "preparing") orders[i].status = "ready";
//     else if (current === "ready") {
//         orders[i].status = "completed";

//         let completedOrder = orders[i];
//         history.push(completedOrder);
//         orders.splice(i, 1);
//     }

//     saveOrders();
// }


// // SAVE + RELOAD VIEW
// function saveOrders() {
//     localStorage.setItem("shopOrders", JSON.stringify(orders));
//     localStorage.setItem("shopOrderHistory", JSON.stringify(history));
//     loadOrders();
// }


// // REAL-TIME UPDATE
// window.addEventListener("storage", () => {
//     orders = JSON.parse(localStorage.getItem("shopOrders")) || [];
//     history = JSON.parse(localStorage.getItem("shopOrderHistory")) || [];
//     loadOrders();
// });

// // AUTO REFRESH EVERY 2 SECONDS
// setInterval(() => {
//     orders = JSON.parse(localStorage.getItem("shopOrders")) || [];
//     history = JSON.parse(localStorage.getItem("shopOrderHistory")) || [];
//     loadOrders();
// }, 2000);



// // Navigation
// function goToDashboard() { window.location.href = "spk_dashboard.html"; }
// function goToMenu() { window.location.href = "spk_menu.html"; }
// function goToOrders() { window.location.href = "spk_orders.html"; }
// function goToHistory() { window.location.href = "spk_history.html"; }
// function logout() { 
//     localStorage.removeItem("shopkeeperLoggedIn"); 
//     window.location.href = "../index.html"; 
// }

// ======================================
// SHOPKEEPER ORDERS — FINAL VERSION
// ======================================

// Helper
const $ = (id) => document.getElementById(id);

// Logged-in shopkeeper email
const shopEmail = localStorage.getItem("shop_email");

// Orders container
const container = $("ordersContainer");

// Highlight sidebar
document.querySelectorAll(".sidebar li").forEach(li => {
  if (li.dataset.page === "orders") li.classList.add("active");
});

// -----------------------------
// Load orders for this shopkeeper
function loadOrders() {
  const allOrders = JSON.parse(localStorage.getItem("ordersList")) || [];

  const myOrders = allOrders.filter(o =>
    o.vendorEmail === shopEmail &&
    o.status !== "completed" &&
    o.status !== "cancelled"
  );

  container.innerHTML = "";

  if (myOrders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  myOrders.forEach(order => {
    container.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <h3>Order #${order.id}</h3>
          <span class="status ${order.status}">${order.status}</span>
        </div>

        <p><strong>Customer:</strong> ${order.customer}</p>
        <p><strong>Items:</strong> ${order.items.join(", ")}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>

        <div class="btn-row">
          ${renderButtons(order)}
        </div>
      </div>
    `;
  });
}

// -----------------------------
// Render action buttons
function renderButtons(order) {
  if (order.status === "pending") {
    return `
      <button class="accept-btn" onclick="updateStatus('${order.id}', 'accepted')">Accept</button>
      <button class="reject-btn" onclick="updateStatus('${order.id}', 'cancelled')">Reject</button>
    `;
  }

  if (order.status === "accepted") {
    return `<button class="update-btn" onclick="updateStatus('${order.id}', 'preparing')">Preparing</button>`;
  }

  if (order.status === "preparing") {
    return `<button class="update-btn" onclick="updateStatus('${order.id}', 'ready')">Ready</button>`;
  }

  if (order.status === "ready") {
    return `<button class="update-btn" onclick="updateStatus('${order.id}', 'completed')">Complete</button>`;
  }

  return "";
}

// -----------------------------
// Update order status (GLOBAL)
function updateStatus(orderId, newStatus) {
  let orders = JSON.parse(localStorage.getItem("ordersList")) || [];

  orders = orders.map(o => {
    if (o.id === orderId) {
      o.status = newStatus;
    }
    return o;
  });

  localStorage.setItem("ordersList", JSON.stringify(orders));
  loadOrders();
}

// -----------------------------
// Auto refresh on storage update
window.addEventListener("storage", loadOrders);

// -----------------------------
// Init
loadOrders();

// -----------------------------
// Navigation
function goToDashboard() { window.location.href = "spk_dashboard.html"; }
function goToMenu() { window.location.href = "spk_menu.html"; }
function goToOrders() { window.location.href = "spk_orders.html"; }
function goToHistory() { window.location.href = "spk_history.html"; }
function logout() {
  localStorage.removeItem("shopkeeperLoggedIn");
  window.location.href = "../index.html";
}

// expose
window.updateStatus = updateStatus;
window.logout = logout;
