<?php

require 'connectDB.php';
$pId = $_GET['p_id'];
$oldName = $_GET['old_name'];
$newName = $_GET['new_name'];
$status = $_GET['status'];

$tasks = array();
$sql = "SELECT id FROM tasks WHERE name='$oldName' AND project_id=$pId";
$query = $pdo->query($sql);

$row = $query->fetch(PDO::FETCH_ASSOC);
$id = $row['id'];

$sql = "UPDATE tasks SET name='$newName', status=$status WHERE id=$id";
$query = $pdo->prepare($sql);
$query->execute();

?>