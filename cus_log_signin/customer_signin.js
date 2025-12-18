// ------------------------------------------
// 1. Select required HTML elements
// ------------------------------------------

const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const signupBtn = document.getElementById("signupBtn");
const otpInput = document.getElementById("otp");
const emailField = document.getElementById("email");


// Variable to store the generated OTP
let generatedOTP = "";


// 2. When user clicks "Send OTP"


sendOtpBtn.addEventListener("click", function () {
    
    const emailValue = emailField.value.trim();

    // Step 1: Validate if email field is filled
    if (emailValue === "") {
        alert("Please enter your email to receive OTP.");
        return;
    }

    // Step 2: Generate a 6-digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // console.log("Generated OTP:", generatedOTP); // for testing

    // Step 3: Show OTP input field
    otpSection.style.display = "block";

    // Step 4: Inform user (for now, we show OTP in alert)
    alert("Your OTP is: " + generatedOTP + 
          "\n(For demo only — later this will be sent to email)");

    // OPTIONAL: Disable the send OTP button after sending once
    sendOtpBtn.disabled = true;
    sendOtpBtn.innerText = "OTP Sent";
});


// ------------------------------------------
// 3. Enable Sign Up only when OTP is correct
// ------------------------------------------

otpInput.addEventListener("keyup", function () {

    if (otpInput.value === generatedOTP) {
        otpInput.style.borderColor = "green";

        // Enable signup button
        signupBtn.disabled = false;
        signupBtn.style.opacity = "1";

    } else {
        otpInput.style.borderColor = "red";
        signupBtn.disabled = true;
    }
});


// ------------------------------------------
// 4. Final Sign Up Validation (Frontend only)
// ------------------------------------------

document.getElementById("signupForm").addEventListener("submit", function (event) {
    
    if (signupBtn.disabled) {
        // Prevent signup if OTP is wrong
        event.preventDefault();
        alert("Please enter correct OTP before signing up.");
    } else {
        // For now: Fake successful signup
        alert("Signup successful!");
    }

 });
document.getElementById("signupForm").addEventListener("submit", function (event) {

    event.preventDefault(); // stop the form from reloading the page

    if (signupBtn.disabled) {
        alert("Please enter the correct OTP before signing up.");
        return;
    }
    // SAVE USER DATA IN LOCALSTORAGE
    localStorage.setItem("customerUsername", document.getElementById("username").value.trim());
    localStorage.setItem("customerMobile", document.getElementById("mobile").value.trim());
    localStorage.setItem("customerEmail", document.getElementById("email").value.trim());
    localStorage.setItem("customerPassword", document.getElementById("password").value.trim());

    // SUCCESS MESSAGE
    alert("Signup successful! Redirecting to login...");

    // REDIRECT TO LOGIN PAGE
    window.location.href = "customer_login.html";
});
