<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $file = 'produk.json';
  $produk = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

  $name = $_POST['name'];
  $price = floatval($_POST['price']);

  // handle upload
  $imageName = $_FILES['image']['name'];
  $uploadDir = 'uploads/';
  if (!is_dir($uploadDir)) mkdir($uploadDir);
  $imagePath = $uploadDir . basename($imageName);
  move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);

  $newId = count($produk) > 0 ? max(array_column($produk, 'id')) + 1 : 1;

  $produk[] = [
    'id' => $newId,
    'name' => $name,
    'price' => $price,
    'image' => $imagePath
  ];

  file_put_contents($file, json_encode($produk, JSON_PRETTY_PRINT));
  echo "Produk berhasil ditambahkan.";
}
