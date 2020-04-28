<?php

require 'connectDB.php';
$id = $_GET['id'];
$name = $_GET['name'];

$sql = "UPDATE projects SET name='$name' WHERE id = $id";
$query = $pdo->prepare($sql);
$query->execute();

?>