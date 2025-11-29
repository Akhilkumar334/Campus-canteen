// Fetch shopkeeper details from localStorage
const status = localStorage.getItem("shopkeeperVerified");
const container = document.getElementById("approvedContainer");

if (status !== "approved") {
    container.innerHTML = `
        <p class="no-data">No approved shop found.</p>
    `;
} else {
    const owner = localStorage.getItem("shop_ownerName");
    const shop = localStorage.getItem("shop_shopName");
    const mobile = localStorage.getItem("shop_mobile");
    const email = localStorage.getItem("shop_email");
    const address = localStorage.getItem("shop_address");

    container.innerHTML = `
        <div class="data-row"><b>Owner Name:</b> ${owner}</div>
        <div class="data-row"><b>Shop Name:</b> ${shop}</div>
        <div class="data-row"><b>Email:</b> ${email}</div>
        <div class="data-row"><b>Mobile:</b> ${mobile}</div>
        <div class="data-row"><b>Address:</b> ${address}</div>
        <div class="data-row"><b>Status:</b> Approved</div>
    `;
}

// NAVIGATION
function goDashboard() {
    window.location.href = "admin_dashboard.html";
}
function goPending() {
    window.location.href = "admin_pending_requests.html";
}
function goHomeCook() {
    window.location.href = "admin_homecook_requests.html";
}
function logout() {
    window.location.href = "../role.html";
}
