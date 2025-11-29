// ===============================
// HOMECOOK LOGIN – FINAL VERSION
// ===============================

// Get page elements
const loginForm = document.getElementById("homecookLoginForm");
const emailInput = document.getElementById("homecookEmail");
const passwordInput = document.getElementById("homecookPassword");

if (!loginForm) {
    console.error("Homecook login form not found!");
} else {

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // stop form refresh

        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Read saved data from localStorage
        const savedEmail = localStorage.getItem("homecook_email");
        const savedPassword = localStorage.getItem("homecook_password");
        const accountStatus = localStorage.getItem("homecookVerified");

        // 1. Check if account exists
        if (!savedEmail || !savedPassword) {
            alert("No HomeCook account found. Please sign up first.");
            return;
        }

        // 2. Validate email
        if (enteredEmail !== savedEmail) {
            alert("Incorrect email!");
            return;
        }

        // 3. Validate password
        if (enteredPassword !== savedPassword) {
            alert("Incorrect password!");
            return;
        }

        // 4. Check verification status
        if (accountStatus === "pending") {
            alert("Your account is still under review.");
            return;
        }

        if (accountStatus === "rejected") {
            alert("Your HomeCook registration was rejected.");
            return;
        }

        if (accountStatus === "approved") {
            alert("Login successful!");

            // Save login state
            localStorage.setItem("homecookLoggedIn", "true");
            localStorage.setItem("currentHomecook", savedEmail);

            // Redirect to dashboard
            window.location.href = "../Homecook_Dashboard/homecook_dashboard.html";
            return;
        }

        alert("Unexpected error: Verification status missing.");
    });
}
