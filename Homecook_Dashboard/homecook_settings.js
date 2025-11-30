// ======================================
// HOMECOOK SETTINGS – FINAL INTEGRATION
// ======================================

// Get logged-in HomeCook email
const user = localStorage.getItem("currentHomecook");
const ownerName = localStorage.getItem("homecook_ownerName");
const kitchenName = localStorage.getItem("homecook_kitchenName");

if (!user) {
    alert("Please login again.");
    window.location.href = "../homecook_login/homecook_login.html";
}

// ================================
// LOAD EXISTING VALUES INTO UI
// ================================

// -------- Kitchen Status --------
let kitchenStatus =
    localStorage.getItem(`homecook_status_${user}`) || "Open";

document.getElementById("statusToggle").checked = (kitchenStatus === "Open");
document.getElementById("statusLabel").innerText = kitchenStatus;

// -------- Daily Limit --------
let dailyLimit =
    localStorage.getItem(`homecook_limit_${user}`) || 0;

document.getElementById("dailyLimitInput").value = dailyLimit;

// -------- Cutoff Time --------
// New key (not present earlier)
let cutoffTime =
    localStorage.getItem(`homecook_cutoff_${user}`) || "21:00";

document.getElementById("cutoffTimeInput").value = cutoffTime;


// ================================
//        EVENT LISTENERS
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

    alert("Daily limit updated!");
});


// -------- Save Cutoff Time --------
document.getElementById("saveCutoffBtn").addEventListener("click", function () {
    let cutoff = document.getElementById("cutoffTimeInput").value;

    if (!cutoff) {
        alert("Please choose a valid time.");
        return;
    }

    localStorage.setItem(`homecook_cutoff_${user}`, cutoff);

    alert("Cutoff time updated!");
});


// ================================
// NAVIGATION (same functions as dashboard)
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
