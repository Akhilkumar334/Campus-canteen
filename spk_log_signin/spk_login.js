// Select login form elements
const loginForm = document.getElementById("shopkeeperLoginForm");
const emailField = document.getElementById("shopkeeperEmail");
const passwordField = document.getElementById("shopkeeperPassword");

if (!loginForm) {
    console.error("Login form not found: #shopkeeperLoginForm");
} else {
    // SHOPKEEPER LOGIN FUNCTION
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredEmail = emailField.value.trim();
        const enteredPassword = passwordField.value.trim();

        // Fetch stored shopkeeper account (defensive)
        const savedEmail = localStorage.getItem("shop_email");
        const savedPassword = localStorage.getItem("shop_password");
        const status = localStorage.getItem("shopkeeperVerified");

        // If no account saved
        if (!savedEmail || !savedPassword) {
            alert("No shopkeeper account found. Please register first.");
            console.warn("LocalStorage missing shop_email or shop_password");
            return;
        }

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
             // Save current logged-in shopkeeper ID
             localStorage.setItem("currentShopkeeper", savedEmail);

            // --- REDIRECT: prefer relative path from spk_log_signin/ folder ---
            // This works when spk_login.html is located at:
            //   /.../spk_log_signin/spk_login.html
            // and dashboard is at:
            //   /.../Shopkeeper_Dashboard/spk_dashboard.html
            //
            // Use this relative path (no leading slash):
            const relativeRedirect = "../Shopkeeper_Dashboard/spk_dashboard.html";

            // Try redirecting:
            window.location.href = relativeRedirect;
            return;
        }

        // If status is missing
        alert("Error: No verification status found.");
    });
}
