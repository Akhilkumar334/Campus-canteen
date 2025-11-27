const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const signupBtn = document.getElementById("signupBtn");
const otpInput = document.getElementById("otp");
const emailField = document.getElementById("email");

let generatedOTP = "";

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

otpInput.addEventListener("keyup", function () {
    if (otpInput.value === generatedOTP) {
        otpInput.style.borderColor = "green";
        signupBtn.disabled = false;
    } else {
        otpInput.style.borderColor = "red";
        signupBtn.disabled = true;
    }
});

document.getElementById("homeCookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    if (signupBtn.disabled) {
        alert("Please enter correct OTP before registering.");
        return;
    }

    // Convert file → Base64
    async function fileToBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    const kitchenPhoto = await fileToBase64(document.getElementById("kitchenPhoto").files[0]);
    const idProof = await fileToBase64(document.getElementById("idProof").files[0]);

    let licenseFile = document.getElementById("license").files[0];
    let license = licenseFile ? await fileToBase64(licenseFile) : "";

    // ⭐ Fetch existing list
    let homecooksList = JSON.parse(localStorage.getItem("homecooksList")) || [];

    // ⭐ Create new record
    let newCook = {
        fullName: document.getElementById("fullName").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        location: document.getElementById("location").value.trim(),
        foodType: document.getElementById("foodType").value,
        timing: document.getElementById("timing").value.trim(),
        kitchenPhoto: kitchenPhoto,
        idProof: idProof,
        license: license,
        status: "pending"
    };

    // ⭐ Add to array
    homecooksList.push(newCook);

    // ⭐ Save back
    localStorage.setItem("homecooksList", JSON.stringify(homecooksList));

    alert("Registration successful! Waiting for admin approval.");
    window.location.href = "homecook_verific.html";
});
