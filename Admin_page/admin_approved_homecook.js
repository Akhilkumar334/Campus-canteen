// // Fetch HomeCook data from localStorage
// const status = localStorage.getItem("homecookVerified");
// const container = document.getElementById("approvedHomecook");

// if (status !== "approved") {
//     container.innerHTML = `
//         <p class="no-data">No approved HomeCook found.</p>
//     `;
// } else {
//     const owner = localStorage.getItem("homecook_ownerName");
//     const kitchen = localStorage.getItem("homecook_kitchenName");
//     const email = localStorage.getItem("homecook_email");
//     const mobile = localStorage.getItem("homecook_mobile");
//     const address = localStorage.getItem("homecook_address");

//     container.innerHTML = `
//         <div class="data-row"><b>Owner Name:</b> ${owner}</div>
//         <div class="data-row"><b>Kitchen Name:</b> ${kitchen}</div>
//         <div class="data-row"><b>Email:</b> ${email}</div>
//         <div class="data-row"><b>Mobile:</b> ${mobile}</div>
//         <div class="data-row"><b>Address:</b> ${address}</div>
//         <div class="data-row"><b>Status:</b> Approved</div>
//     `;
// }

// // Optionally add navigation (if needed in future)
// function goDashboard() {
//     window.location.href = "admin_dashboard.html";
// }

const container = document.getElementById("approvedHomecook");

const cooks = JSON.parse(localStorage.getItem("homecooksList")) || [];
const approved = cooks.filter(cook => cook.status === "approved");

if (approved.length === 0) {
    container.innerHTML = `<p class="no-data">No approved HomeCook found.</p>`;
} else {
    container.innerHTML = "";

    approved.forEach(cook => {
        container.innerHTML += `
            <div class="data-row"><b>Owner Name:</b> ${cook.fullName}</div>
            <div class="data-row"><b>Kitchen Name:</b> ${cook.kitchenName || "Not provided"}</div>
            <div class="data-row"><b>Email:</b> ${cook.email}</div>
            <div class="data-row"><b>Mobile:</b> ${cook.mobile}</div>
            <div class="data-row"><b>Address:</b> ${cook.location}</div>
            <div class="data-row"><b>Food Type:</b> ${cook.foodType}</div>
            <div class="data-row"><b>Timing:</b> ${cook.timing}</div>
            <div class="data-row"><b>Status:</b> Approved</div>
            <hr>
        `;
    });
}

function goDashboard() {
    window.location.href = "admin_dashboard.html";
}
