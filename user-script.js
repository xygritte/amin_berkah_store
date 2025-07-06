const productList = document.getElementById("product-list");
const cartCountEl = document.getElementById("cart-count");

function addToCart(id, name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalQty;
}

function renderProducts() {
  fetch("get_products.php")
    .then(res => res.json())
    .then(products => {
      productList.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>Rp ${parseFloat(product.price)}K</p>
          <button onclick="addToCart(${product.id}, '${product.name}')">Tambah ke Keranjang</button>
        `;

        productList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Gagal mengambil produk:", error);
    });
}


renderProducts();
updateCartCount();
