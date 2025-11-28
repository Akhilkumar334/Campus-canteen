// ==========================================
// SHOPKEEPER MENU & SETTINGS – FINAL VERSION
// ==========================================

// Get logged-in shopkeeper
const user = localStorage.getItem("currentShopkeeper");

if (!user) {
    alert("No shopkeeper logged in!");
    window.location.href = "../spk_log_signin/spk_login.html";
}

// Load data from localStorage
let shopSettings = JSON.parse(localStorage.getItem(`spk_settings_${user}`)) || {};
let menuList = JSON.parse(localStorage.getItem(`spk_menu_${user}`)) || [];

// ==========================================
// LOAD SHOP SETTINGS INTO UI
// ==========================================
function loadSettings() {
    document.getElementById("openTime").value = shopSettings.openTime || "";
    document.getElementById("closeTime").value = shopSettings.closeTime || "";
    document.getElementById("shopStatus").value = shopSettings.shopStatus || "open";
    document.getElementById("minPrepay").value = shopSettings.minPrepay || "";
}

// ==========================================
// SAVE SHOP SETTINGS
// ==========================================
function saveSettings() {
    shopSettings = {
        openTime: document.getElementById("openTime").value,
        closeTime: document.getElementById("closeTime").value,
        shopStatus: document.getElementById("shopStatus").value,
        minPrepay: document.getElementById("minPrepay").value
    };

    localStorage.setItem(`spk_settings_${user}`, JSON.stringify(shopSettings));

    alert("Settings saved successfully!");
}

// ==========================================
// RENDER MENU ITEMS
// ==========================================
function loadMenu() {
    const container = document.getElementById("menuList");
    container.innerHTML = "";

    if (menuList.length === 0) {
        container.innerHTML = "<p>No items added yet.</p>";
        return;
    }

    menuList.forEach((item, index) => {
        container.innerHTML += `
            <div class="menu-card">
                <img src="${item.image}" class="menu-img" alt="item">
                <h3>${item.name}</h3>
                <p><b>₹${item.price}</b></p>
                <p>${item.category}</p>
                <p class="desc">${item.desc}</p>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
    });
}

// ==========================================
// ADD MENU ITEM
// ==========================================
async function addMenuItem() {
    let name = document.getElementById("itemName").value.trim();
    let price = document.getElementById("itemPrice").value.trim();
    let category = document.getElementById("itemCategory").value.trim();
    let desc = document.getElementById("itemDesc").value.trim();
    let imageFile = document.getElementById("itemImage").files[0];

    if (!name || !price || !category || !desc || !imageFile) {
        alert("Please fill all fields and upload an image!");
        return;
    }

    // Convert image to Base64
    const base64 = await toBase64(imageFile);

    let newItem = {
        name,
        price,
        category,
        desc,
        image: base64
    };

    menuList.push(newItem);
    localStorage.setItem(`spk_menu_${user}`, JSON.stringify(menuList));

    // Clear inputs
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemCategory").value = "";
    document.getElementById("itemDesc").value = "";
    document.getElementById("itemImage").value = "";

    loadMenu();
    alert("Item added!");
}

// Convert file to Base64
function toBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// ==========================================
// DELETE ITEM
// ==========================================
function deleteItem(index) {
    menuList.splice(index, 1);
    localStorage.setItem(`spk_menu_${user}`, JSON.stringify(menuList));
    loadMenu();
}

// ==========================================
// FORM SUBMIT HANDLER (IMPORTANT FIX)
// ==========================================
document.getElementById("menuForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addMenuItem();
});

// Load everything on page open
loadSettings();
loadMenu();

// ==========================================
// SIDEBAR NAVIGATION
// ==========================================
function goToDashboard() {
    window.location.href = "spk_dashboard.html";
}
function goToMenu() {
    window.location.href = "spk_menu.html";
}
function goToOrders() {
    window.location.href = "spk_orders.html";
}
function goToHistory() {
    window.location.href = "spk_history.html";
}
function logout() {
    localStorage.removeItem("currentShopkeeper");
    window.location.href = "../spk_log_signin/spk_login.html";
}
