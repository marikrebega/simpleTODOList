<?php

require 'connectDB.php';

$lists = array();

$sql = "SELECT * FROM projects ORDER BY id";
$query = $pdo->query($sql);

while($row = $query->fetch(PDO::FETCH_OBJ)) {
	$list = [
		'id' => $row->id,
		'name' => $row->name
	];
	
	$lists[] = $list;
}

echo json_encode($lists);

?>