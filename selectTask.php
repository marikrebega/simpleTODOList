<?php

require 'connectDB.php';

$tasks = array();
$id = $_GET['id'];

$sql = "SELECT status, name FROM tasks WHERE project_id = $id";
$query = $pdo->query($sql);

while($row = $query->fetch(PDO::FETCH_OBJ)) {
	$task = [
		'status' => $row->status,
		'name' => $row->name
	];
	
	$tasks[] = $task;
}

echo json_encode($tasks);

?>