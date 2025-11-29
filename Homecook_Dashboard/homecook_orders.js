// Fetch homecook details
const user = localStorage.getItem("currentHomecook");
const kitchenName = localStorage.getItem("homecook_kitchenName");

document.getElementById("sidebarKitchenName").innerText = kitchenName;


// ===============================
// LOAD ORDERS
// ===============================
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem(`orders_${user}`)) || [];

    const container = document.getElementById("ordersContainer");
    container.innerHTML = ""; // reset


    // ================================
    // SHOW DUMMY CARD IF NO ORDERS
    // ================================
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="order-card">
                <div class="order-header">
                    <h2>Order #ORD001</h2>
                    <span class="status pending">pending</span>
                </div>

                <p class="price">₹160</p>

                <p><strong>Customer:</strong> Akhil</p>
                <p><strong>Time:</strong> 10:45 AM</p>

                <p><strong>Items:</strong></p>
                <ul>
                    <li>1 × Paneer Thali</li>
                    <li>2 × Chapati</li>
                </ul>

                <div class="action-row">
                    <button class="accept-btn">Accept</button>
                    <button class="reject-btn">Reject</button>
                </div>
            </div>
        `;
        return; // important: stop here
    }


    // ================================
    // RENDER REAL ORDERS
    // ================================
    orders.forEach((order, index) => {
        let card = document.createElement("div");
        card.className = "order-card";

        card.innerHTML = `
            <div class="order-header">
                <h2>Order #${order.id}</h2>
                <span class="status ${order.status}">${order.status}</span>
            </div>

            <p class="price">₹${order.total}</p>

            <p><strong>Customer:</strong> ${order.customer}</p>
            <p><strong>Time:</strong> ${order.time}</p>

            <p><strong>Items:</strong></p>
            <ul>${order.items.map(i => `<li>${i}</li>`).join("")}</ul>

            <div class="action-row">
                <button class="accept-btn" onclick="updateStatus(${index}, 'accepted')">Accept</button>
                <button class="reject-btn" onclick="updateStatus(${index}, 'rejected')">Reject</button>
            </div>
        `;

        container.appendChild(card);
    });
}


// ================================
// UPDATE ORDER STATUS
// ================================
function updateStatus(index, status) {
    let orders = JSON.parse(localStorage.getItem(`orders_${user}`)) || [];
    orders[index].status = status;
    localStorage.setItem(`orders_${user}`, JSON.stringify(orders));
    loadOrders();
}


// ================================
// AUTO REFRESH EVERY SECOND
// ================================
setInterval(loadOrders, 1000);


// ================================
// NAVIGATION
// ================================
function goDashboard() { window.location.href = "homecook_dashboard.html"; }
function goMenu() { window.location.href = "homecook_menu.html"; }
function goOrders() { window.location.href = "homecook_orders.html"; }
function goHistory() { window.location.href = "homecook_history.html"; }

function logout() {
    localStorage.removeItem("currentHomecook");
    window.location.href = "../role.html";
}


// INITIAL LOAD
loadOrders();
