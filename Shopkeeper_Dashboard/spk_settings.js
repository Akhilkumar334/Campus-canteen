// ====================================
// SHOPKEEPER SETTINGS LOGIC
// ====================================

// Logged-in user
const user = localStorage.getItem("currentShopkeeper");

if (!user) {
    alert("Please login again.");
    window.location.href = "../HO_made_log_singin/homecook_login.html";
}

// NAV FUNCTIONS
function goDashboard() { window.location.href = "spk_dashboard.html"; }
function goMenu() { window.location.href = "spk_menu.html"; }
function goOrders() { window.location.href = "spk_orders.html"; }
function goHistory() { window.location.href = "spk_history.html"; }
function goSettings() { window.location.href = "spk_settings.html"; }

function logout() {
    localStorage.removeItem("currentShopkeeper");
    alert("Logged out!");
    window.location.href = "../role.html";
}

// ================================
// LOAD SETTINGS INTO UI
// ================================

document.getElementById("statusToggle").checked =
    (localStorage.getItem(`spk_status_${user}`) || "Open") === "Open";

document.getElementById("statusLabel").innerText =
    document.getElementById("statusToggle").checked ? "Open" : "Closed";

document.getElementById("prepaidInput").value =
    localStorage.getItem(`spk_prepaid_${user}`) || "";

document.getElementById("orderLimitInput").value =
    localStorage.getItem(`spk_limit_${user}`) || "";

document.getElementById("cutoffInput").value =
    localStorage.getItem(`spk_cutoff_${user}`) || "";

document.getElementById("packagingInput").value =
    localStorage.getItem(`spk_packaging_${user}`) || "";

document.getElementById("prepTimeInput").value =
    localStorage.getItem(`spk_prepTime_${user}`) || "";

document.getElementById("cancelWindowInput").value =
    localStorage.getItem(`spk_cancelWindow_${user}`) || "";

document.getElementById("customMsgInput").value =
    localStorage.getItem(`spk_customMsg_${user}`) || "";

document.getElementById("autoAcceptToggle").checked =
    (localStorage.getItem(`spk_autoAccept_${user}`) || "off") === "on";

document.getElementById("autoAcceptLabel").innerText =
    document.getElementById("autoAcceptToggle").checked ? "On" : "Off";


// ================================
// SAVE HANDLERS
// ================================

document.getElementById("statusToggle").addEventListener("change", () => {
    let val = document.getElementById("statusToggle").checked ? "Open" : "Closed";
    localStorage.setItem(`spk_status_${user}`, val);
    document.getElementById("statusLabel").innerText = val;
});

document.getElementById("prepaidInput").addEventListener("input", () => {
    localStorage.setItem(`spk_prepaid_${user}`,
        document.getElementById("prepaidInput").value);
});

document.getElementById("saveLimitBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_limit_${user}`,
        document.getElementById("orderLimitInput").value);
    alert("Daily limit saved.");
});

document.getElementById("saveCutoffBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_cutoff_${user}`,
        document.getElementById("cutoffInput").value);
    alert("Cutoff time saved.");
});

document.getElementById("savePackagingBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_packaging_${user}`,
        document.getElementById("packagingInput").value);
    alert("Packaging charge saved.");
});

document.getElementById("savePrepBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_prepTime_${user}`,
        document.getElementById("prepTimeInput").value);
    alert("Preparation time saved.");
});

document.getElementById("saveCancelWindowBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_cancelWindow_${user}`,
        document.getElementById("cancelWindowInput").value);
    alert("Cancel window saved.");
});

document.getElementById("saveCustomMsgBtn").addEventListener("click", () => {
    localStorage.setItem(`spk_customMsg_${user}`,
        document.getElementById("customMsgInput").value);
    alert("Custom message saved.");
});

document.getElementById("autoAcceptToggle").addEventListener("change", () => {
    let val = document.getElementById("autoAcceptToggle").checked ? "on" : "off";
    localStorage.setItem(`spk_autoAccept_${user}`, val);
    document.getElementById("autoAcceptLabel").innerText = val === "on" ? "On" : "Off";
});
