<?php

require 'connectDB.php';
$name = $_GET['name'];
$pId = $_GET['p_id'];

$sql = "INSERT INTO tasks(name, status, project_id) VALUES ('$name', 0, $pId)";
$query = $pdo->prepare($sql);
$query->execute();

?>