<?php

require 'connectDB.php';
$id = $_GET['id'];
$date = $_GET['date'];

echo $date;

if ($date == 'null') {
    $sql = "UPDATE projects SET exp_date=null WHERE id = $id";
} else {
	$sql = "UPDATE projects SET exp_date='$date' WHERE id = $id";
}

$query = $pdo->prepare($sql);
$query->execute();

?>