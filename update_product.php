<?php
$conn = new mysqli("localhost", "root", "", "simple_store");

$id    = $_POST['id'];
$name  = $_POST['name'];
$price = $_POST['price'];
$imagePath = "";

// Cek apakah ada gambar baru yang diupload
if (isset($_FILES["image"]) && $_FILES["image"]["size"] > 0) {
  $targetDir = "uploads/";
  $filename = time() . '_' . basename($_FILES["image"]["name"]);
  $targetFile = $targetDir . $filename;

  if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
    $imagePath = $targetFile;

    // Jika ada gambar baru, update semua termasuk gambar
    $sql = "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdsi", $name, $price, $imagePath, $id);
  } else {
    die("Gagal mengunggah gambar baru.");
  }
} else {
  // Jika tidak ada gambar baru, update hanya nama dan harga
  $sql = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sdi", $name, $price, $id);
}

$stmt->execute();
echo "Produk berhasil diperbarui!";
?>
