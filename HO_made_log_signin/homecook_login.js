// ===============================
// HOMECOOK LOGIN – OPTION A
// ===============================

const loginForm = document.getElementById("homecookLoginForm");
const emailInput = document.getElementById("homecookEmail");
const passwordInput = document.getElementById("homecookPassword");

if (!loginForm) {
    console.error("Homecook login form not found!");
} else {

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Read full homecook list
        let homecooksList = JSON.parse(localStorage.getItem("homecooksList")) || [];

        // Find matching record
        let user = homecooksList.find(
            c => c.email === enteredEmail
        );

        if (!user) {
            alert("No account found with this email.");
            return;
        }

        // Password check
        if (user.password !== enteredPassword) {
            alert("Incorrect password!");
            return;
        }

        // Status check
        if (user.status === "pending") {
            alert("Your account is still under review by admin.");
            return;
        }

        if (user.status === "rejected") {
            alert("Your registration was rejected.");
            return;
        }

        if (user.status === "approved") {
            alert("Login successful!");

            // Save login state
            localStorage.setItem("homecookLoggedIn", "true");
            localStorage.setItem("currentHomecook", user.email);

            window.location.href = "../Homecook_Dashboard/homecook_dashboard.html";
            return;
        }

        alert("Unexpected error: Status missing.");
    });
}
