// ---------------------------------------------
// SHOPKEEPERS
// ---------------------------------------------
let shopkeepers = JSON.parse(localStorage.getItem("shopkeepersList")) || [];

let totalShop = shopkeepers.length;
let pendingShop = shopkeepers.filter(s => s.status === "pending").length;
let approvedShop = shopkeepers.filter(s => s.status === "approved").length;
let rejectedShop = shopkeepers.filter(s => s.status === "rejected").length;

// Update UI
document.getElementById("totalShopkeepers").innerText = totalShop;
document.getElementById("pendingShopkeepers").innerText = pendingShop;
document.getElementById("approvedShopkeepers").innerText = approvedShop;
document.getElementById("rejectedShopkeepers").innerText = rejectedShop;


// ---------------------------------------------
// HOME COOKS
// ---------------------------------------------
let homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];

let totalHC = homecooks.length;
let pendingHC = homecooks.filter(h => h.status === "pending").length;
let approvedHC = homecooks.filter(h => h.status === "approved").length;
let rejectedHC = homecooks.filter(h => h.status === "rejected").length;

// Update UI
document.getElementById("totalHomecooks").innerText = totalHC;
document.getElementById("pendingHomecooks").innerText = pendingHC;
document.getElementById("approvedHomecooks").innerText = approvedHC;
document.getElementById("rejectedHomecooks").innerText = rejectedHC;


// ---------------------------------------------
// NAVIGATION
// ---------------------------------------------
function goToPending() {
    window.location.href = "admin_pending_requests.html";
}

function goToApproved() {
    window.location.href = "admin_approved_list.html";
}

function goToHomeCook() {
    window.location.href = "admin_homecook_request.html";
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "../role.html";
}
