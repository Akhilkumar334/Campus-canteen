// ==========================================
// HOMECOOK MENU – FINAL VERSION
// ==========================================

// Fetch logged-in homecook
const user = localStorage.getItem("currentHomecook");
const kitchenName = localStorage.getItem("homecook_kitchenName");

// If not logged in
if (!user) {
    alert("Please login again.");
    window.location.href = "../homecook_login/homecook_login.html";
}

// Update sidebar kitchen name
document.getElementById("sidebarKitchenName").innerText = kitchenName;


// ==========================================
//         LOAD MENU ON PAGE START
// ==========================================
let menuList = JSON.parse(localStorage.getItem(`homecook_menu_${user}`)) || [];

renderMenu();


// ==========================================
//            RENDER MENU ITEMS
// ==========================================
function renderMenu() {
    const grid = document.getElementById("menuGrid");
    grid.innerHTML = ""; // reset

    if (menuList.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#555;">No dishes added yet.</p>`;
        return;
    }

    menuList.forEach((dish, index) => {
        const card = document.createElement("div");
        card.className = "menu-card";

        card.innerHTML = `
            <img src="${dish.image}" alt="dish">
            <h3>${dish.name}</h3>
            <p>₹${dish.price}</p>
            <p>${dish.desc}</p>
            <button class="delete-btn" onclick="deleteDish(${index})">
                Delete
            </button>
        `;

        grid.appendChild(card);
    });
}


// ==========================================
//          OPEN & CLOSE POPUP
// ==========================================
function openAddPopup() {
    document.getElementById("addPopup").style.display = "flex";
}

function closeAddPopup() {
    document.getElementById("addPopup").style.display = "none";

    // reset fields
    document.getElementById("dishName").value = "";
    document.getElementById("dishPrice").value = "";
    document.getElementById("dishDesc").value = "";
    document.getElementById("dishImage").value = "";
}


// ==========================================
//       SAVE DISH (WITH BASE64 IMAGE)
// ==========================================
function saveDish() {
    const name = document.getElementById("dishName").value.trim();
    const price = document.getElementById("dishPrice").value.trim();
    const desc = document.getElementById("dishDesc").value.trim();
    const imageFile = document.getElementById("dishImage").files[0];

    if (!name || !price || !desc || !imageFile) {
        alert("Please fill all fields!");
        return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Image = e.target.result;

        const dishObj = {
            name,
            price,
            desc,
            image: base64Image
        };

        menuList.push(dishObj);

        // Save to storage
        localStorage.setItem(`homecook_menu_${user}`, JSON.stringify(menuList));

        closeAddPopup();
        renderMenu();
    };

    reader.readAsDataURL(imageFile);
}


// ==========================================
//               DELETE DISH
// ==========================================
function deleteDish(index) {
    if (confirm("Delete this dish?")) {
        menuList.splice(index, 1);
        localStorage.setItem(`homecook_menu_${user}`, JSON.stringify(menuList));
        renderMenu();
    }
}


// ==========================================
//           NAVIGATION FUNCTIONS
// ==========================================
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
function goSettings() {
    window.location.href = "homecook_settings.html";
}   


// ==========================================
//                 LOGOUT
// ==========================================
function logout() {
    localStorage.removeItem("currentHomecook");
    localStorage.removeItem("homecookLoggedIn");
    alert("Logged out!");
    window.location.href = "../role.html";
}
