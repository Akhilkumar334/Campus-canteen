// ==========================================
// HOMECOOK DASHBOARD – FINAL VERSION
// ==========================================

// Fetch logged in homecook
const user = localStorage.getItem("currentHomecook");
const ownerName = localStorage.getItem("homecook_ownerName");
const kitchenName = localStorage.getItem("homecook_kitchenName");

// If no login found
if (!user) {
    alert("Please login again.");
    window.location.href = "../homecook_login/homecook_login.html";
}

// Update Sidebar Kitchen Name
document.getElementById("sidebarKitchenName").innerText = kitchenName;


// ========= GREETING SYSTEM =========
function greeting() {
    let hour = new Date().getHours();

    if (hour < 12) return "🌅 Good Morning, " + ownerName + "!";
    if (hour < 17) return "☀️ Good Afternoon, " + ownerName + "!";
    return "🌙 Good Evening, " + ownerName + "!";
}

// Set greeting
document.getElementById("greetLine").innerText = greeting();

// Show kitchen name
document.getElementById("kitchenNameLine").innerText =
    "Welcome back to " + kitchenName;


// ========= LOAD HOMECOOK DASHBOARD DATA =========

// LOAD MENU COUNT
let menuList = JSON.parse(localStorage.getItem(`homecook_menu_${user}`)) || [];
document.getElementById("totalMenuItems").innerText = menuList.length;


// LOAD TODAY’S ORDERS (dummy for now, same as shopkeeper)
document.getElementById("todayOrders").innerText =
    localStorage.getItem(`homecook_todayOrders_${user}`) || 0;


// LOAD KITCHEN STATUS
let kitchenStatus = localStorage.getItem(`homecook_status_${user}`) || "Open";
document.getElementById("kitchenStatus").innerText = kitchenStatus;


// LOAD DAILY LIMIT
let dailyLimit = localStorage.getItem(`homecook_limit_${user}`) || "Not Set";
document.getElementById("dailyLimit").innerText = dailyLimit;


// LOAD TIME SLOTS
let slots = JSON.parse(localStorage.getItem(`homecook_timeslots_${user}`)) || [];

if (slots.length === 0) {
    document.getElementById("timeSlots").innerText = "No slots added";
} else {
    document.getElementById("timeSlots").innerText = slots.join(", ");
}


// ========= NAVIGATION FUNCTIONS =========

function goDashboard() {
    window.location.href = "homecook_dashboard.html";
}

function goMenu() {
    window.location.href = "homecook_menu.html";
}

function goOrders() {
    window.location.href = "homecook_orders.html";
}

function goHistory() {
    window.location.href = "homecook_history.html";
}


// ========= LOGOUT =========

function logout() {
    localStorage.removeItem("currentHomecook");
    localStorage.removeItem("homecookLoggedIn");

    alert("Logged out!");
    window.location.href = "../role.html";
}
