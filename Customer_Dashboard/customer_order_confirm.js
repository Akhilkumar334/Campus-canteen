// Load latest order
const order = JSON.parse(localStorage.getItem("latest_customer_order"));
const vendorEmail = localStorage.getItem("latest_order_vendor");
const vendorType = localStorage.getItem("latest_vendor_type");

if (!order) {
    alert("No recent order found.");
    window.location.href = "customer_dashboard.html";
}

// Vendor name
function getVendorName() {
    if (vendorType === "shopkeeper") {
        return localStorage.getItem("shop_shopName") || "Canteen";
    } else {
        const homecooks = JSON.parse(localStorage.getItem("homecooksList")) || [];
        const x = homecooks.find(h => h.email === vendorEmail);
        return x?.fullName + "'s Kitchen";
    }
}

// Shopkeeper extra charges
let prepayPercent = 0;
let packagingCharge = 0;

if (vendorType === "shopkeeper") {
    prepayPercent = Number(localStorage.getItem(`spk_prepay_${vendorEmail}`)) || 0;
    packagingCharge = Number(localStorage.getItem(`spk_packaging_${vendorEmail}`)) || 0;
}

// Cost breakdown
const subtotal = order.total;
const prepayAmount = Math.round((subtotal * prepayPercent) / 100);
const toPayLater = subtotal + packagingCharge - prepayAmount;

const summaryDiv = document.getElementById("orderSummary");

summaryDiv.innerHTML = `
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Vendor:</strong> ${getVendorName()}</p>
    <p><strong>Time:</strong> ${order.time}</p>
    <hr style="margin:10px 0; border:none; border-bottom:1px solid #d8efe7;">
    <p><strong>Items:</strong></p>
    <ul>
        ${order.items.map(i => `<li>${i}</li>`).join("")}
    </ul>
    <hr style="margin:10px 0; border:none; border-bottom:1px solid #d8efe7;">
    <p><strong>Subtotal:</strong> ₹${subtotal}</p>
    ${vendorType === "shopkeeper" ? `<p><strong>Prepay:</strong> ₹${prepayAmount}</p>` : ""}
    ${vendorType === "shopkeeper" ? `<p><strong>Packaging:</strong> ₹${packagingCharge}</p>` : ""}
    <p><strong>Amount to Pay at Pickup:</strong> ₹${toPayLater}</p>
    <p><strong>Status:</strong> Pending (Waiting for vendor approval)</p>
`;

// Redirect helper
function goDashboard() {
    window.location.href = "customer_dashboard.html";
}

// -------- CONFETTI ANIMATION ----------
startConfetti();

function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ["#00c896", "#30cfd0", "#62f1a5", "#ffffff"];

    for (let i = 0; i < 120; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 2 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        confetti.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        update();
        requestAnimationFrame(draw);
    }

    function update() {
        confetti.forEach(p => {
            p.y += p.d;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    draw();
}
