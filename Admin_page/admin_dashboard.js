// // ---------------------------------------------
// // SHOPKEEPERS
// // ---------------------------------------------
// let shopkeepers = JSON.parse(localStorage.getItem("shopkeepersList")) || [];

// let totalShop = shopkeepers.length;
// let pendingShop = shopkeepers.filter(s => s.status === "pending").length;
// let approvedShop = shopkeepers.filter(s => s.status === "approved").length;
// let rejectedShop = shopkeepers.filter(s => s.status === "rejected").length;

// // Update UI
// document.getElementById("totalShopkeepers").innerText = totalShop;
// document.getElementById("pendingShopkeepers").innerText = pendingShop;
// document.getElementById("approvedShopkeepers").innerText = approvedShop;
// document.getElementById("rejectedShopkeepers").innerText = rejectedShop;


// // ---------------------------------------------
// // HOME COOKS
// // ---------------------------------------------
// let homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];

// let totalHC = homecooks.length;
// let pendingHC = homecooks.filter(h => h.status === "pending").length;
// let approvedHC = homecooks.filter(h => h.status === "approved").length;
// let rejectedHC = homecooks.filter(h => h.status === "rejected").length;

// // Update UI
// document.getElementById("totalHomecooks").innerText = totalHC;
// document.getElementById("pendingHomecooks").innerText = pendingHC;
// document.getElementById("approvedHomecooks").innerText = approvedHC;
// document.getElementById("rejectedHomecooks").innerText = rejectedHC;


// // ---------------------------------------------
// // NAVIGATION
// // ---------------------------------------------
// function goToPending() {
//     window.location.href = "admin_pending_requests.html";
// }

// function goToApproved() {
//     window.location.href = "admin_approved_list.html";
// }

// function goToHomeCook() {
//     window.location.href = "admin_homecook_request.html";
// }

// function logout() {
//     localStorage.removeItem("adminLoggedIn");
//     alert("Logged out successfully!");
//     window.location.href = "../role.html";
// }

// ========== SHOPKEEPER COUNTS ==========
let shopStatus = localStorage.getItem("shopkeeperVerified");

let totalShop = 0,
    pendingShop = 0,
    approvedShop = 0,
    rejectedShop = 0;

if (shopStatus !== null) {
    totalShop = 1;

    if (shopStatus === "pending") pendingShop = 1;
    if (shopStatus === "approved") approvedShop = 1;
    if (shopStatus === "rejected") rejectedShop = 1;
}

// ========== HOME COOK COUNTS ==========
let cooks = JSON.parse(localStorage.getItem("homecooksList")) || [];

let totalCooks = cooks.length;
let pendingCooks = cooks.filter(c => c.status === "pending").length;
let approvedCooks = cooks.filter(c => c.status === "approved").length;
let rejectedCooks = cooks.filter(c => c.status === "rejected").length;

// ========== UPDATE HTML ==========
document.getElementById("totalShopkeepers").innerText = totalShop;
document.getElementById("pendingShopkeepers").innerText = pendingShop;
document.getElementById("approvedShopkeepers").innerText = approvedShop;
document.getElementById("rejectedShopkeepers").innerText = rejectedShop;

document.getElementById("totalHomecooks").innerText = totalCooks;
document.getElementById("pendingHomecooks").innerText = pendingCooks;
document.getElementById("approvedHomecooks").innerText = approvedCooks;
document.getElementById("rejectedHomecooks").innerText = rejectedCooks;


// ========== NAVIGATION ==========
function goToPending() { window.location.href = "admin_pending_requests.html"; }
function goToApproved() { window.location.href = "admin_approved_shops.html"; }
function goToHomeCook() { window.location.href = "admin_homecook_request.html"; }
function goToHomeCookApproved() {
    window.location.href = "admin_approved_homecook.html";
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out");
    window.location.href = "../index.html";
}
