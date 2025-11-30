// ================================
// HOMECOOK SIGNUP (Option A)
// ================================

const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const signupBtn = document.getElementById("signupBtn");
const otpInput = document.getElementById("otp");
const emailField = document.getElementById("email");

let generatedOTP = "";

// Send OTP
sendOtpBtn.addEventListener("click", function () {
    const emailValue = emailField.value.trim();

    if (emailValue === "") {
        alert("Please enter your email before requesting OTP.");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("HomeCook OTP:", generatedOTP);

    otpSection.style.display = "block";

    alert("Your OTP is: " + generatedOTP);

    sendOtpBtn.disabled = true;
    sendOtpBtn.innerText = "OTP Sent";
});

// OTP Verification
otpInput.addEventListener("keyup", function () {
    if (otpInput.value === generatedOTP) {
        otpInput.style.borderColor = "green";
        signupBtn.disabled = false;
    } else {
        otpInput.style.borderColor = "red";
        signupBtn.disabled = true;
    }
});

// Convert File → Base64
function fileToBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// Final Signup
document.getElementById("homeCookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    if (signupBtn.disabled) {
        alert("Please enter correct OTP before registering.");
        return;
    }

    const kitchenPhoto = await fileToBase64(document.getElementById("kitchenPhoto").files[0]);
    const idProof = await fileToBase64(document.getElementById("idProof").files[0]);

    let licenseFile = document.getElementById("license").files[0];
    let license = licenseFile ? await fileToBase64(licenseFile) : "";

    // Fetch old list
    let homecooksList = JSON.parse(localStorage.getItem("homecooksList")) || [];

    // New HomeCook object
    let newCook = {
        fullName: document.getElementById("fullName").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(), // ⭐ ADDED
        location: document.getElementById("location").value.trim(),
        foodType: document.getElementById("foodType").value,
        timing: document.getElementById("timing").value.trim(),
        kitchenPhoto: kitchenPhoto,
        idProof: idProof,
        license: license,
        status: "pending" // ⭐ Admin will approve this
    };

    // Add to list
    homecooksList.push(newCook);

    // Save to localStorage
    localStorage.setItem("homecooksList", JSON.stringify(homecooksList));

    alert("Registration successful! Waiting for admin approval.");
    window.location.href = "homecook_verific.html";
});
