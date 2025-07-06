<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $file = 'produk.json';
  $id = intval($_POST['id']);
  $name = $_POST['name'];
  $price = floatval($_POST['price']);

  $produk = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

  foreach ($produk as &$p) {
    if ($p['id'] == $id) {
      $p['name'] = $name;
      $p['price'] = $price;

      if (!empty($_FILES['image']['name'])) {
        $imageName = $_FILES['image']['name'];
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir);
        $imagePath = $uploadDir . basename($imageName);
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
        $p['image'] = $imagePath;
      }
    }
  }

  file_put_contents($file, json_encode($produk, JSON_PRETTY_PRINT));
  echo "Produk berhasil diperbarui.";
}
