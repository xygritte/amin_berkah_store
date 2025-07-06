<?php
$data = json_decode(file_get_contents("php://input"), true);
$ordersFile = 'orders.json';

$orders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];

$orders[] = [
  'name' => $data['name'],
  'address' => $data['address'],
  'items' => $data['items'],
  'total' => $data['total'],
  'created_at' => date('Y-m-d H:i:s')
];

file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));
echo "Pesanan disimpan.";
