<?php
$conn = new mysqli("localhost", "root", "", "simple_store");

$id = $_POST['id'];

$sql = "DELETE FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

echo "Produk berhasil dihapus!";
?>
