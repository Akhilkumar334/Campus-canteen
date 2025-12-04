// // Fetch shopkeeper details
// const ownerName = localStorage.getItem("shop_ownerName") || "Shopkeeper";
// const shopName = localStorage.getItem("shop_shopName") || "Your Shop";

// // Sidebar Title
// document.getElementById("sidebarShopName").innerText = shopName;

// // Greeting logic
// function generateGreeting() {
//     const hour = new Date().getHours();
//     if (hour < 12) return "🌅 Good Morning, " + ownerName + "!";
//     if (hour < 17) return "☀️ Good Afternoon, " + ownerName + "!";
//     return "🌙 Good Evening, " + ownerName + "!";
// }

// document.getElementById("greetLine").innerText = generateGreeting();
// document.getElementById("shopNameLine").innerText = "Welcome back to " + shopName;

// // Quick Stats (dummy until orders are implemented)
// document.getElementById("todayOrders").innerText = localStorage.getItem("spk_todayOrders") || "0";
// document.getElementById("totalMenuItems").innerText = localStorage.getItem("spk_menuCount") || "0";

// let status = localStorage.getItem("spk_shopStatus") || "Open";
// document.getElementById("shopStatusText").innerText = status;

// // Sidebar Navigation
// function goDashboard() { window.location.href = "spk_dashboard.html"; }
// function goMenu() { window.location.href = "spk_menu.html"; }
// function goOrders() { window.location.href = "spk_orders.html"; }
// function goHistory() { window.location.href = "spk_history.html"; }

// function logout() {
//     localStorage.removeItem("shopkeeperLoggedIn");
//     alert("Logged out!");
//     window.location.href = "../role.html";
// }

// Logged-in shopkeeper
const user = localStorage.getItem("currentShopkeeper");

if (!user) {
    alert("Please login again.");
    window.location.href = "../role.html";
}

// NAVIGATION
function goDashboard() { window.location.href = "spk_dashboard_new.html"; }
function goMenu() { window.location.href = "spk_menu.html"; }
function goOrders() { window.location.href = "spk_orders.html"; }
function goHistory() { window.location.href = "spk_history.html"; }
function goSettings() { window.location.href = "spk_settings.html"; }

function logout() {
    localStorage.removeItem("currentShopkeeper");
    alert("Logged out!");
    window.location.href = "../index.html";
}

// Display shop name
document.getElementById("sidebarShopName").innerText =
    localStorage.getItem("shop_shopName");

document.getElementById("shopNameLine").innerText =
    "Your shop: " + localStorage.getItem("shop_shopName");

// Greeting
function greeting() {
    let hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 17) return "☀️ Good Afternoon!";
    return "🌙 Good Evening!";
}

document.getElementById("greetLine").innerText = greeting();

// Fetch settings
function get(key) {
    return localStorage.getItem(`spk_${key}_${user}`) || "—";
}

// =======================
// LOAD DASHBOARD DATA
// =======================

document.getElementById("shopStatusText").innerText = get("status");
document.getElementById("prepaidPercent").innerText = get("prepaid") + "%";
document.getElementById("orderLimit").innerText = get("limit");
document.getElementById("packagingFee").innerText = "₹" + get("packaging");
document.getElementById("prepTime").innerText = get("prepTime") + "m";
document.getElementById("autoAccept").innerText = get("autoAccept") === "on" ? "On" : "Off";
document.getElementById("customMsg").innerText = get("customMsg");

// Today orders
document.getElementById("todayOrders").innerText =
    localStorage.getItem(`spk_todayOrders_${user}`) || 0;

// Pending orders
let orders = JSON.parse(localStorage.getItem(`spk_orders_${user}`)) || [];
let pending = orders.filter(o => o.status === "pending").length;
document.getElementById("pendingOrders").innerText = pending;

// Revenue today
let revenue = orders
    .filter(o => o.status === "accepted")
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

document.getElementById("todayRevenue").innerText = "₹" + revenue;
