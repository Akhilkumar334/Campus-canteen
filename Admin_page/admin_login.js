const adminForm = document.getElementById("adminLoginForm");

adminForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    // Hardcoded admin credentials (for now)
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "123456";

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        
        alert("Admin login successful!");

        // Save login session
        localStorage.setItem("adminLoggedIn", "true");

        // Redirect to admin dashboard
        window.location.href = "admin_dashboard.html";

    } else {
        alert("Incorrect admin username or password!");
    }
});
