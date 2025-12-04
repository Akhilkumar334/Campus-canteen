// ======================================
// HOMECOOK SETTINGS – CLEAN FINAL BUILD
// ======================================

// ------------------------------
// BASIC VALIDATION & USER INFO
// ------------------------------
const user = localStorage.getItem("currentHomecook");
const ownerName = localStorage.getItem("homecook_ownerName");
const kitchenName = localStorage.getItem("homecook_kitchenName");

if (!user) {
    alert("Please login again.");
    window.location.href = "../homecook_login/homecook_login.html";
}



// ================================
// LOAD EXISTING SETTINGS INTO UI
// ================================

// -------- Kitchen Status --------
let kitchenStatus = localStorage.getItem(`homecook_status_${user}`) || "Open";

document.getElementById("statusToggle").checked = (kitchenStatus === "Open");
document.getElementById("statusLabel").innerText = kitchenStatus;


// -------- Daily Limit --------
let dailyLimit = localStorage.getItem(`homecook_limit_${user}`) || 0;
document.getElementById("dailyLimitInput").value = dailyLimit;


// -------- Cutoff Time (OLD SYSTEM, STILL SUPPORTED) --------
let cutoffTime = localStorage.getItem(`homecook_cutoff_${user}`) || "";
document.getElementById("cutoffTimeInput").value = cutoffTime;


// ================================
// SAVE SETTINGS EVENT LISTENERS
// ================================

// -------- Toggle Kitchen Status --------
document.getElementById("statusToggle").addEventListener("change", function () {
    let newStatus = this.checked ? "Open" : "Closed";

    localStorage.setItem(`homecook_status_${user}`, newStatus);
    document.getElementById("statusLabel").innerText = newStatus;

    alert("Kitchen status updated to: " + newStatus);
});


// -------- Save Daily Limit --------
document.getElementById("saveDailyLimitBtn").addEventListener("click", function () {
    let limitValue = document.getElementById("dailyLimitInput").value.trim();

    if (limitValue === "" || Number(limitValue) < 0) {
        alert("Please enter a valid limit (0 or more).");
        return;
    }

    localStorage.setItem(`homecook_limit_${user}`, limitValue);
    alert("Daily order limit updated!");
});


// -------- Save Cutoff Time (OLD SYSTEM) --------
document.getElementById("saveCutoffBtn").addEventListener("click", function () {
    let cutoff = document.getElementById("cutoffTimeInput").value;

    if (!cutoff) {
        alert("Please choose a valid time.");
        return;
    }

    localStorage.setItem(`homecook_cutoff_${user}`, cutoff);
    alert("Order cutoff time updated!");
});



// =========================================================
// MULTIPLE ORDER ACCEPTING SLOTS (NEW SYSTEM)
// =========================================================

// Load from storage
let orderSlots = JSON.parse(localStorage.getItem(`homecook_orderSlots_${user}`)) || [];

function renderOrderSlots() {
    const container = document.getElementById("orderSlotsContainer");
    container.innerHTML = "";

    orderSlots.forEach((slot, index) => {
        container.innerHTML += `
            <div class="slot-row">
                <input type="time" value="${slot.start}"
                       onchange="updateOrderSlot(${index}, 'start', this.value)">
                
                <span class="to-label">to</span>
                
                <input type="time" value="${slot.end}"
                       onchange="updateOrderSlot(${index}, 'end', this.value)">
                
                <button class="delete-btn" onclick="deleteOrderSlot(${index})">✖</button>
            </div>
        `;
    });
}

function addOrderSlot() {
    orderSlots.push({ start: "08:00", end: "10:00" }); // default slot
    saveOrderSlots();
    renderOrderSlots();
}

function updateOrderSlot(index, key, value) {
    orderSlots[index][key] = value;
    saveOrderSlots();
}

function deleteOrderSlot(index) {
    orderSlots.splice(index, 1);
    saveOrderSlots();
    renderOrderSlots();
}

function saveOrderSlots() {
    localStorage.setItem(`homecook_orderSlots_${user}`, JSON.stringify(orderSlots));
}



// =========================================================
// MULTIPLE DELIVERY TIME SLOTS (NEW SYSTEM)
// =========================================================

let deliverySlots = JSON.parse(localStorage.getItem(`homecook_deliverySlots_${user}`)) || [];

function renderDeliverySlots() {
    const container = document.getElementById("deliverySlotsContainer");
    container.innerHTML = "";

    deliverySlots.forEach((time, index) => {
        container.innerHTML += `
            <div class="slot-row">
                <input type="time" value="${time}"
                       onchange="updateDeliverySlot(${index}, this.value)">

                <button class="delete-btn" onclick="deleteDeliverySlot(${index})">✖</button>
            </div>
        `;
    });
}

function addDeliverySlot() {
    deliverySlots.push("13:00"); // default delivery time
    saveDeliverySlots();
    renderDeliverySlots();
}

function updateDeliverySlot(index, value) {
    deliverySlots[index] = value;
    saveDeliverySlots();
}

function deleteDeliverySlot(index) {
    deliverySlots.splice(index, 1);
    saveDeliverySlots();
    renderDeliverySlots();
}

function saveDeliverySlots() {
    localStorage.setItem(`homecook_deliverySlots_${user}`, JSON.stringify(deliverySlots));
}



// =========================================================
// REGISTER FUNCTIONS GLOBALLY (HTML onclick NEEDS THIS)
// =========================================================
window.addOrderSlot = addOrderSlot;
window.updateOrderSlot = updateOrderSlot;
window.deleteOrderSlot = deleteOrderSlot;

window.addDeliverySlot = addDeliverySlot;
window.updateDeliverySlot = updateDeliverySlot;
window.deleteDeliverySlot = deleteDeliverySlot;


// =========================================================
// INITIAL RENDER CALLS
// =========================================================
renderOrderSlots();
renderDeliverySlots();



// ================================
// NAVIGATION (BOTTOM OF FILE)
// ================================
function goDashboard() { window.location.href = "homecook_dashboard.html"; }
function goMenu() { window.location.href = "homecook_menu.html"; }
function goOrders() { window.location.href = "homecook_orders.html"; }
function goHistory() { window.location.href = "homecook_history.html"; }
function goSettings() { window.location.href = "homecook_settings.html"; }

function logout() {
    localStorage.removeItem("currentHomecook");
    localStorage.removeItem("homecookLoggedIn");

    alert("Logged out!");
    window.location.href = "../role.html";
}
