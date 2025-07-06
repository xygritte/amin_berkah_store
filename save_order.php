<?php
// Koneksi database
$conn = new mysqli("localhost", "root", "", "simple_store"); // Ganti sesuai config Anda

if ($conn->connect_error) {
  http_response_code(500);
  echo "Koneksi gagal.";
  exit;
}

// Ambil dan decode JSON dari frontend
$data = json_decode(file_get_contents("php://input"), true);

$name = $conn->real_escape_string($data['name']);
$address = $conn->real_escape_string($data['address']);
$items = json_encode($data['items']); // array keranjang
$total = $data['total'];

$sql = "INSERT INTO orders (name, address, items, total, created_at) 
        VALUES ('$name', '$address', '$items', $total, NOW())";

if ($conn->query($sql)) {
  echo "Pesanan disimpan.";
} else {
  http_response_code(500);
  echo "Gagal menyimpan pesanan.";
}

$conn->close();
?>
