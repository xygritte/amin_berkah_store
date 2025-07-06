const productList = document.getElementById("product-list");
const form = document.getElementById("product-form");

// Tampilkan produk dari produk.json
function renderProducts() {
  fetch("get_products.php")
    .then(res => res.json())
    .then(products => {
      productList.innerHTML = "";
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${formatRupiah(product.price)}</p>
          <button onclick="showEditForm(${product.id}, '${product.name}', ${product.price})">Edit</button>
          <button onclick="deleteProduct(${product.id})" style="margin-top: 0.5rem; background: #c0392b;">Hapus</button>
        `;

        productList.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Gagal memuat produk:", err);
    });
}

// Tambah produk
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("add_product.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      form.reset();
      renderProducts();
    });
});

// Hapus produk
function deleteProduct(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;

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
    });
}

// Tampilkan form edit (dari form yang sama)
function showEditForm(id, name, price) {
  document.getElementById("product-name").value = name;
  document.getElementById("product-price").value = price;
  document.getElementById("product-id")?.remove(); // hapus ID lama jika ada

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.id = "product-id";
  hiddenInput.name = "id";
  hiddenInput.value = id;
  form.appendChild(hiddenInput);

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.textContent = "Update Produk";
}

// Tambah/Update dikirim ke endpoint sesuai
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const isEdit = form.querySelector("#product-id");
  const endpoint = isEdit ? "update_product.php" : "add_product.php";

  fetch(endpoint, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      form.reset();
      renderProducts();

      // Reset form ke mode tambah
      form.querySelector("button[type='submit']").textContent = "Tambah Produk";
      form.querySelector("#product-id")?.remove();
    });
});

// Format harga ke rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(angka);
}

renderProducts();
