// ===================================
// HOMECOOK ORDERS – FINAL UPGRADED
// ===================================

// Fetch homecook details
const user = localStorage.getItem("currentHomecook");
const kitchenName = localStorage.getItem("homecook_kitchenName");

document.getElementById("sidebarKitchenName").innerText = kitchenName;


// ===============================
// LOAD ACCEPTING ORDER SLOTS
// ===============================
let orderSlots =
    JSON.parse(localStorage.getItem(`homecook_orderSlots_${user}`)) || [];


// Convert "10:45 AM" -> "HH:MM" in 24-hour format for comparison
function convertTo24(timeStr) {
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
}


// Check whether orderTime ("HH:MM") falls inside any slot
function isLateOrder(orderTime24) {
    if (orderSlots.length === 0) return false; // no slots → never late

    for (let slot of orderSlots) {
        if (!slot.start || !slot.end) continue;

        let start = slot.start;
        let end = slot.end;

        if (orderTime24 >= start && orderTime24 <= end) {
            return false; // inside some slot → NOT late
        }
    }

    return true; // didn't match any slot
}


// ===============================
// LOAD & RENDER ORDERS
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

                <p><strong>Customer:</strong> Akhil (Dummy)</p>
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
        return;
    }


    // ================================
    // RENDER REAL ORDERS
    // ================================
    orders.forEach((order, index) => {
        let orderTime24 = convertTo24(order.time);
        let late = isLateOrder(orderTime24);

        let card = document.createElement("div");
        card.className = "order-card";

        card.innerHTML = `
            <div class="order-header">
                <h2>Order #${order.id}</h2>

                <div class="status-box">
                    <span class="status ${order.status}">${order.status}</span>

                    ${late && order.status === "pending"
                        ? `<span class="late-badge">Late</span>`
                        : ""
                    }
                </div>
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
function goSettings() { window.location.href = "homecook_settings.html"; }

function logout() {
    localStorage.removeItem("currentHomecook");
    window.location.href = "../index.html";
}


// INITIAL LOAD
loadOrders();
