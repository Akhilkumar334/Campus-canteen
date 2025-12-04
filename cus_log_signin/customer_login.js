// ------------------------------------------
// CUSTOMER LOGIN JS
// ------------------------------------------

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Retrieve stored signup data from LocalStorage
    const storedEmail = localStorage.getItem("customerEmail");
    const storedPassword = localStorage.getItem("customerPassword");

    // Check if the email/password match
    if (email === storedEmail && password === storedPassword) {

        alert("Login successful! Redirecting to dashboard...");

        // Set a login flag so dashboard knows customer is logged in
        localStorage.setItem("customerLoggedIn", "true");

        // Redirect to dashboard
        window.location.href = "../Customer_Dashboard/customer_dashboard.html";

    } else {
        alert("Incorrect email or password!");
    }
});
