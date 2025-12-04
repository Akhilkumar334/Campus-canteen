

let history = JSON.parse(localStorage.getItem("shopOrderHistory")) || [];

activeHighlight("history");
function activeHighlight(pageName) {
    document.querySelectorAll(".sidebar li").forEach(li => {
        if (li.dataset.page === pageName) {
            li.classList.add("active");
        }
    });
}

function loadHistory() {
    const container = document.getElementById("historyContainer");
    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = "<p>No history available.</p>";
        return;
    }

    history.forEach(order => {
        container.innerHTML += `
            <div class="history-card">
                <h3>Order #${order.orderId}</h3>

                <p class="order-detail"><strong>Customer:</strong> ${order.customerName}</p>
                <p class="order-detail"><strong>Email:</strong> ${order.email}</p>
                <p class="order-detail"><strong>Items:</strong> ${order.items.join(", ")}</p>
                <p class="order-detail"><strong>Total Amount:</strong> ₹${order.totalAmount}</p>

                <p class="order-detail"><strong>Status:</strong> 
                    <span class="${order.status === "completed" ? "status-completed" : "status-cancelled"}">
                        ${order.status}
                    </span>
                </p>
            </div>
        `;
    });
}

loadHistory();


// Navigation
function goToDashboard() { window.location.href = "spk_dashboard.html"; }
function goToMenu() { window.location.href = "spk_menu.html"; }
function goToOrders() { window.location.href = "spk_orders.html"; }
function goToHistory() { window.location.href = "spk_history.html"; }
function logout() { 
    localStorage.removeItem("shopkeeperLoggedIn"); 
    window.location.href = "../index.html"; 
}
