// Fetch shopkeeper status
let status = localStorage.getItem("shopkeeperVerified");

// Container to show data
const pendingContainer = document.getElementById("pendingContainer");


// If no pending shopkeeper
if (status !== "pending") {
    pendingContainer.innerHTML = `
        <p>No pending requests found.</p>
    `;
} 
else {
    // Load shopkeeper details from LocalStorage
    let owner = localStorage.getItem("shop_ownerName");
    let shopName = localStorage.getItem("shop_shopName");
    let mobile = localStorage.getItem("shop_mobile");
    let email = localStorage.getItem("shop_email");
    let address = localStorage.getItem("shop_address");

    pendingContainer.innerHTML = `
        <div class="request-box">
            <h3>${shopName}</h3>

            <p class="request-detail"><strong>Owner:</strong> ${owner}</p>
            <p class="request-detail"><strong>Email:</strong> ${email}</p>
            <p class="request-detail"><strong>Mobile:</strong> ${mobile}</p>
            <p class="request-detail"><strong>Address:</strong> ${address}</p>

            <p class="request-detail"><strong>Documents:</strong></p>
            <ul>
                <li>Shop Photo (uploaded)</li>
                <li>ID Proof (uploaded)</li>
            </ul>

            <div class="buttons">
                <button class="approve-btn" onclick="approveShop()">Approve</button>
                <button class="reject-btn" onclick="rejectShop()">Reject</button>
            </div>
        </div>
    `;
}


// APPROVE FUNCTION
function approveShop() {
    localStorage.setItem("shopkeeperVerified", "approved");

    alert("Shopkeeper Approved Successfully!");
    window.location.href = "admin_dashboard.html";
}


// REJECT FUNCTION
function rejectShop() {
    localStorage.setItem("shopkeeperVerified", "rejected");

    alert("Shopkeeper Rejected!");
    window.location.href = "admin_dashboard.html";
}
// Note: In a real application, shopkeeper data would be fetched from a backend database.