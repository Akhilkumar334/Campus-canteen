// Fetch shopkeeper status from LocalStorage
let status = localStorage.getItem("shopkeeperVerified");

// Default counters
let total = 0, pending = 0, approved = 0, rejected = 0;

// For simulation (since only one shopkeeper exists for now)
if (status !== null) {
    total = 1;

    if (status === "pending") pending = 1;
    if (status === "approved") approved = 1;
    if (status === "rejected") rejected = 1;
}

// Update dashboard
document.getElementById("totalShopkeepers").innerText = total;
document.getElementById("pendingShopkeepers").innerText = pending;
document.getElementById("approvedShopkeepers").innerText = approved;
document.getElementById("rejectedShopkeepers").innerText = rejected;

// Navigation
function goToPending() {
    window.location.href = "admin_pending_requests.html";
}

function goToApproved() {
    window.location.href = "admin_approved_list.html";
}

function goToHomeCook() {
    window.location.href = "admin_homecook_requests.html";
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "../role.html";
}
