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

// ==========================================
// SHOPKEEPER DASHBOARD – FINAL VERSION
// ==========================================

// Fetch logged in shopkeeper
const user = localStorage.getItem("currentShopkeeper");
const ownerName = localStorage.getItem("shop_ownerName");
const shopName = localStorage.getItem("shop_shopName");

// If no login found
if (!user) {
    alert("Please login again.");
    window.location.href = "../spk_log_signin/spk_login.html";
}

// Update Sidebar Shop Name
document.getElementById("sidebarShopName").innerText = shopName;

// Greeting System
function greeting() {
    let hour = new Date().getHours();

    if (hour < 12) return "🌅 Good Morning, " + ownerName + "!";
    if (hour < 17) return "☀️ Good Afternoon, " + ownerName + "!";
    return "🌙 Good Evening, " + ownerName + "!";
}

// Set greeting
document.getElementById("greetLine").innerText = greeting();

// Show shop name
document.getElementById("shopNameLine").innerText =
    "Welcome back to " + shopName;

// Load Menu Count
let menuList = JSON.parse(localStorage.getItem(`spk_menu_${user}`)) || [];
document.getElementById("totalMenuItems").innerText = menuList.length;

// Load Today's Orders (dummy for now)
document.getElementById("todayOrders").innerText =
    localStorage.getItem(`spk_todayOrders_${user}`) || 0;

// Load Shop Status
let shopStatus = localStorage.getItem(`spk_status_${user}`) || "Open";
document.getElementById("shopStatusText").innerText = shopStatus;

// Navigation Functions
function goDashboard() {
    window.location.href = "spk_dashboard.html";
}

function goMenu() {
    window.location.href = "spk_menu.html";
}

function goOrders() {
    window.location.href = "spk_orders.html";
}

function goHistory() {
    window.location.href = "spk_history.html";
}

function logout() {
    localStorage.removeItem("shopkeeperLoggedIn");
    localStorage.removeItem("currentShopkeeper");
    alert("Logged out!");
    window.location.href = "../role.html";
}
