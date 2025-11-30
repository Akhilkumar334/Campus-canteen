// =======================================
// HOMECOOK ORDER HISTORY – WITH DUMMY PREVIEW
// =======================================

const user = localStorage.getItem("currentHomecook");

if (!user) {
    alert("Please login again.");
    window.location.href = "../homecook_login/homecook_login.html";
}

document.getElementById("sidebarKitchenName").innerText =
    localStorage.getItem("homecook_kitchenName");

// NAVIGATION
function goDashboard() { window.location.href = "homecook_dashboard.html"; }
function goMenu() { window.location.href = "homecook_menu.html"; }
function goOrders() { window.location.href = "homecook_orders.html"; }
function goHistory() { window.location.href = "homecook_history.html"; }
function goSettings() { window.location.href = "homecook_settings.html"; }
function logout() {
    localStorage.removeItem("currentHomecook");
    localStorage.removeItem("homecookLoggedIn");
    window.location.href = "../role.html";
}

const historyContainer = document.getElementById("historyContainer");

// REAL ORDER DATA
let orders = JSON.parse(localStorage.getItem(`orders_${user}`)) || [];

// =======================================
//            DUMMY PREVIEW DATA
// =======================================
const dummyData = [
    {
        date: "2025-01-27",
        orders: [
            {
                orderId: "HCK1234",
                customerName: "Rahul",
                total: 140,
                status: "accepted"
            },
            {
                orderId: "HCK1235",
                customerName: "Simran",
                total: 100,
                status: "rejected"
            },
            {
                orderId: "HCK1236",
                customerName: "Karan",
                total: 180,
                status: "accepted"
            }
        ]
    },
    {
        date: "2025-01-26",
        orders: [
            {
                orderId: "HCK1201",
                customerName: "Mona",
                total: 90,
                status: "accepted"
            },
            {
                orderId: "HCK1202",
                customerName: "Vishal",
                total: 130,
                status: "accepted"
            }
        ]
    }
];

// If no real orders → use dummy preview
if (orders.length === 0) {
    renderDummyHistory(dummyData);
} else {
    renderRealHistory(orders);
}


// =======================================
//         REAL HISTORY RENDERING
// =======================================
function renderRealHistory(orderList) {
    let grouped = {};

    orderList.forEach(order => {
        const date = order.timestamp?.slice(0, 10);
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(order);
    });

    for (let date in grouped) {
        createHistoryCard(date, grouped[date]);
    }
}


// =======================================
//        DUMMY PREVIEW RENDERING
// =======================================
function renderDummyHistory(dummy) {
    dummy.forEach(day => {
        createHistoryCard(day.date, day.orders, true);
    });
}


// =======================================
//       CARD CREATION FUNCTION
// =======================================
function createHistoryCard(date, list, isDummy = false) {

    const totalOrders = list.length;
    const accepted = list.filter(o => o.status === "accepted").length;
    const rejected = list.filter(o => o.status === "rejected").length;
    const revenue = list
        .filter(o => o.status === "accepted")
        .reduce((sum, o) => sum + Number(o.total), 0);

    let card = document.createElement("div");
    card.classList.add("date-card");

    card.innerHTML = `
        <div class="date-main">
            <div>
                <div class="date-title">${formatDate(date)} ${isDummy ? "(Preview)" : ""}</div>
                <div class="date-details">
                    Orders: ${totalOrders} • Accepted: ${accepted} • Rejected: ${rejected}
                    • Revenue: ₹${revenue}
                </div>
            </div>
            <div class="expand-btn">+</div>
        </div>

        <div class="orders-box" style="display:none;"></div>
    `;

    const expandBtn = card.querySelector(".expand-btn");
    const ordersBox = card.querySelector(".orders-box");

    expandBtn.addEventListener("click", () => {
        if (ordersBox.style.display === "none") {
            ordersBox.style.display = "block";
            expandBtn.innerText = "-";
            showOrders(list, ordersBox);
        } else {
            ordersBox.style.display = "none";
            expandBtn.innerText = "+";
        }
    });

    historyContainer.appendChild(card);
}


// =======================================
//       EXPANDED ORDER LIST RENDER
// =======================================
function showOrders(list, container) {
    container.innerHTML = "";
    list.forEach(o => {
        let div = document.createElement("div");
        div.classList.add("order-detail");

        div.innerHTML = `
            <div class="order-line"><b>Order ID:</b> <span>${o.orderId}</span></div>
            <div class="order-line"><b>Customer:</b> <span>${o.customerName}</span></div>
            <div class="order-line"><b>Total:</b> <span>₹${o.total}</span></div>
            <div class="order-line"><b>Status:</b> <span>${o.status}</span></div>
        `;

        container.appendChild(div);
    });
}


// Date Formatter
function formatDate(d) {
    let date = new Date(d);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}
