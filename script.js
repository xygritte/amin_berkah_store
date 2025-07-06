let cartCount = 0;
let editingId = null;

const productList = document.getElementById("product-list");
const cartCountEl = document.getElementById("cart-count");
const form = document.getElementById("product-form");

// Ambil dan tampilkan produk dari database
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
          <div style="margin-top: auto; display: flex; gap: 0.5rem;">
            <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Edit</button>
            <button onclick="deleteProduct(${product.id})" style="background-color: crimson;">🗑️</button>
          </div>
        `;


        productList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Gagal mengambil produk:", error);
    });
}

function editProduct(id, name, price, image) {
  editingId = id;
  document.getElementById("product-name").value = name;
  document.getElementById("product-price").value = price;
  document.getElementById("product-image").value = image;
}



// Tambah ke keranjang (simulasi)
function addToCart(name) {
  cartCount++;
  cartCountEl.textContent = cartCount;
  alert(`Produk "${name}" ditambahkan ke keranjang.`);
}

// Tangani form tambah produk (kirim ke database)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const imageFile = document.getElementById("product-image").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", imageFile);

  if (editingId) {
    formData.append("id", editingId);
    fetch("update_product.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        form.reset();
        editingId = null;
        renderProducts();
      })
      .catch(err => {
        alert("Gagal mengedit produk.");
        console.error(err);
      });
  } else {
    fetch("add_product.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        form.reset();
        renderProducts();
      })
      .catch(err => {
        alert("Gagal menambahkan produk.");
        console.error(err);
      });
  }
});


function deleteProduct(id) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    const formData = new FormData();
    formData.append("id", id);

    fetch("delete_product.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        renderProducts();
      })
      .catch(err => {
        alert("Gagal menghapus produk.");
        console.error(err);
      });
  }
}

  // Cek preferensi dari localStorage
  


// Jalankan saat halaman dimuat
renderProducts();
