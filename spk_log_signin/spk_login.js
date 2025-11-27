// Select login form elements
const loginForm = document.getElementById("shopkeeperLoginForm");
const emailField = document.getElementById("shopkeeperEmail");
const passwordField = document.getElementById("shopkeeperPassword");

// SHOPKEEPER LOGIN FUNCTION
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredEmail = emailField.value.trim();
    const enteredPassword = passwordField.value.trim();

    // Fetch stored shopkeeper account
    const savedEmail = localStorage.getItem("shop_email");
    const savedPassword = localStorage.getItem("shop_password");
    const status = localStorage.getItem("shopkeeperVerified");

    // Validation: email check
    if (enteredEmail !== savedEmail) {
        alert("Incorrect email. No shopkeeper found with this email.");
        return;
    }

    // Password check
    if (enteredPassword !== savedPassword) {
        alert("Incorrect password!");
        return;
    }

    // Check approval status
    if (status === "pending") {
        alert("Your account is still under review by admin.");
        return;
    }

    if (status === "rejected") {
        alert("Your shop registration was rejected by admin.");
        return;
    }

    if (status === "approved") {
        alert("Login Successful! Redirecting to dashboard...");
        localStorage.setItem("shopkeeperLoggedIn", "true");

        // Redirect to shopkeeper dashboard (create later)
        window.location.href = "spk_dashboard.html";
        return;
    }

    // If status is missing
    alert("Error: No verification status found.");
});
