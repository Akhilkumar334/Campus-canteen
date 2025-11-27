// ------------------------------------------
// 1. Select required HTML elements
// ------------------------------------------

const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const signupBtn = document.getElementById("signupBtn");
const otpInput = document.getElementById("otp");
const emailField = document.getElementById("email");

let generatedOTP = "";  // store otp


// ------------------------------------------
// 2. SEND OTP BUTTON CLICK
// ------------------------------------------

sendOtpBtn.addEventListener("click", function () {
    
    const emailValue = emailField.value.trim();

    // Check if email is entered
    if (emailValue === "") {
        alert("Please enter your email to receive OTP.");
        return;
    }

    // Generate 6 digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Shopkeeper OTP:", generatedOTP);

    // Show OTP field
    otpSection.style.display = "block";

    // Temporary alert until backend mail system added
    alert("Your Shopkeeper OTP is: " + generatedOTP + "\n(This will later be sent to email)");

    // Disable send otp button after first click
    sendOtpBtn.disabled = true;
    sendOtpBtn.innerText = "OTP Sent";
});


// ------------------------------------------
// 3. VERIFY OTP — Enable REGISTER button
// ------------------------------------------

otpInput.addEventListener("keyup", function () {
    if (otpInput.value === generatedOTP) {
        otpInput.style.borderColor = "green";
        signupBtn.disabled = false;
    } else {
        otpInput.style.borderColor = "red";
        signupBtn.disabled = true;
    }
});


// ------------------------------------------
// 4. FINAL SIGNUP (Store data & redirect)
// ------------------------------------------

document.getElementById("shopkeeperSignupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (signupBtn.disabled) {
        alert("Please enter the correct OTP before registering.");
        return;
    }

    // Store shopkeeper data in LocalStorage
    localStorage.setItem("shop_ownerName", document.getElementById("ownerName").value.trim());
    localStorage.setItem("shop_shopName", document.getElementById("shopName").value.trim());
    localStorage.setItem("shop_mobile", document.getElementById("mobile").value.trim());
    localStorage.setItem("shop_email", document.getElementById("email").value.trim());
    localStorage.setItem("shop_address", document.getElementById("address").value.trim());
    localStorage.setItem("shop_password", document.getElementById("password").value.trim());

    // Save verification status
    localStorage.setItem("shopkeeperVerified", "pending");

    alert("Registration successful! Your account is under review.\nRedirecting...");

    // Redirect to verification pending page
    window.location.href = "spk_verific.html";
});
