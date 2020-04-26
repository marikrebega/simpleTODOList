<?php

require 'connectDB.php';

$sql = "INSERT INTO projects(name) VALUES ('new TODO List')";
$query = $pdo->prepare($sql);
$query->execute();

$sql = "SELECT max(id) as id FROM projects";
$query = $pdo->query($sql);

$row = $query->fetch(PDO::FETCH_ASSOC);
$id = $row['id'];

echo $id;


?>