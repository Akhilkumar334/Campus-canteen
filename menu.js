const shop = new URLSearchParams(window.location.search).get("shop");
document.getElementById("shop-name").innerText = shop;

const icons = ["🍛","🥪","☕","🍰","🥤","🍲","🍩","🥘"];

const data = {
  "Main Canteen": {
    main: [
      { name: "Butter Chicken", price: 180, tag: "Non-Veg", hot: true },
      { name: "Veg Biryani", price: 140, tag: "Veg", hot: true },
      { name: "Paneer Butter Masala", price: 160, tag: "Veg", hot: false }
    ],
    bev: [
      { name: "Masala Chai", price: 20, tag: "Veg", hot: false }
    ]
  },
  "Coffee Corner": {
    main: [
      { name: "Cheese Sandwich", price: 90, tag: "Veg", hot: true },
      { name: "Cold Coffee", price: 70, tag: "Veg", hot: false },
      { name: "Brownie", price: 60, tag: "Veg", hot: true }
    ],
    bev: [
      { name: "Hot Coffee", price: 40, tag: "Veg", hot: true }
    ]
  }
};

function loadItems(section, items) {
  const box = document.getElementById(section);
  box.innerHTML = "";

  items.forEach(item => {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    box.innerHTML += `
      <div class="menu-card">
        <div class="img-box">${icon}</div>
        <h3>${item.name}</h3>

        <div class="badge-row">
          <span class="badge ${item.tag === 'Veg' ? 'veg' : 'nonveg'}">${item.tag}</span>
          ${item.hot ? '<span class="badge hot">Hot</span>' : ''}
        </div>

        <div class="price-row">
          <strong>₹${item.price}</strong>
          <button class="add-btn">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

loadItems("main", data[shop].main);
loadItems("beverages", data[shop].bev);

// SEARCH
function searchMenu() {
  const value = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".menu-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
  });
}

// BACK
function goBack() {
  window.location = "index.html";
}
