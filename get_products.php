<?php
header("Content-Type: application/json");

$file = 'produk.json';
if (file_exists($file)) {
  echo file_get_contents($file);
} else {
  echo "[]";
}
