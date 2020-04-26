<?php

require 'connectDB.php';
$name = $_GET['name'];

$sql = "DELETE FROM tasks WHERE name='$name'";
$query = $pdo->prepare($sql);
$query->execute();

?>