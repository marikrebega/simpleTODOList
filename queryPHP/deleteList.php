<?php

require 'connectDB.php';
$id = $_GET['id'];
$project_id = $_GET['p_id'];

$sql = "DELETE FROM projects WHERE id=$id";
$query = $pdo->prepare($sql);
$query->execute();

$sql = "DELETE FROM tasks WHERE project_id=$id";
$query = $pdo->prepare($sql);
$query->execute();


?>