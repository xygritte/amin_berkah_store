<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "simple_store";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

$name  = $_POST['name'];
$price = $_POST['price'];

// Simpan file gambar
$targetDir = "uploads/";
$filename = time() . '_' . basename($_FILES["image"]["name"]);
$targetFile = $targetDir . $filename;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
  $imagePath = $targetFile;

  $sql = "INSERT INTO products (name, price, image) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sds", $name, $price, $imagePath);
  $stmt->execute();

  echo "Produk berhasil ditambahkan!";
} else {
  echo "Gagal mengunggah gambar.";
}
?>
