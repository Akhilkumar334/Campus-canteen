// Load Home Cook list
let homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];

const container = document.getElementById("homeCookContainer");

// Show no requests
if (homecooks.length === 0 || homecooks.filter(h => h.status === "pending").length === 0) {
    container.innerHTML = `<p>No pending home cook requests found.</p>`;
} else {
    loadRequests();
}


// Function to display all pending home cooks
function loadRequests() {
    container.innerHTML = "";

    homecooks.forEach((cook, index) => {
        if (cook.status !== "pending") return;

        container.innerHTML += `
            <div class="request-card">
                <h2>${cook.fullName}</h2>

                <p class="detail"><strong>Email:</strong> ${cook.email}</p>
                <p class="detail"><strong>Mobile:</strong> ${cook.mobile}</p>
                <p class="detail"><strong>Location:</strong> ${cook.location}</p>
                <p class="detail"><strong>Food Type:</strong> ${cook.foodType}</p>
                <p class="detail"><strong>Timing:</strong> ${cook.timing}</p>

                <p><strong>Kitchen Photo:</strong></p>
                <img src="${cook.kitchenPhoto}" class="doc-img">

                <p><strong>ID Proof:</strong></p>
                <img src="${cook.idProof}" class="doc-img">

                <p><strong>Food License:</strong></p>
                ${cook.license ? `<img src="${cook.license}" class="doc-img">` : "No license uploaded"}

                <div class="buttons">
                    <button class="approve-btn" onclick="approveCook(${index})">Approve</button>
                    <button class="reject-btn" onclick="rejectCook(${index})">Reject</button>
                </div>
            </div>
        `;
    });
}


// Approve function
function approveCook(i) {
    homecooks[i].status = "approved";
    localStorage.setItem("homecooksList", JSON.stringify(homecooks));
    alert("Home Cook Approved!");
    loadRequests();
}


// Reject function
function rejectCook(i) {
    homecooks[i].status = "rejected";
    localStorage.setItem("homecooksList", JSON.stringify(homecooks));
    alert("Home Cook Rejected!");
    loadRequests();
}
