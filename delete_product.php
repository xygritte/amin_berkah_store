<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $file = 'produk.json';
  $id = intval($_POST['id']);
  $produk = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

  $produk = array_filter($produk, fn($p) => $p['id'] != $id);
  file_put_contents($file, json_encode(array_values($produk), JSON_PRETTY_PRINT));

  echo "Produk berhasil dihapus.";
}
