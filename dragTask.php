<?php

require 'connectDB.php';

$sql = "TRUNCATE tasks";
$query = $pdo->prepare($sql);
$query->execute();

$tasks = $_GET['tasks'];
$tasks = json_decode($tasks);

$sql = "INSERT INTO tasks (name, status, project_id) VALUES (:name, :status, :pId)";

for ($i = 0; $i < sizeof($tasks); $i++) {
	$query = $pdo->prepare($sql);
	$query->bindParam(':name', $tasks[$i]->name);
	$query->bindParam(':status', $tasks[$i]->status, PDO::PARAM_INT);
	$query->bindParam(':pId', $tasks[$i]->pId, PDO::PARAM_INT);
	$query->execute();
}

?>