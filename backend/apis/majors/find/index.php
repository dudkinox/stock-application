<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM user WHERE USERNAME = '" . $_GET['username'] . "'";
$result = $conn->query($query);
$row = $result->fetch_assoc();
echo '
    {
    "ID": "' . $row["ID"] . '",
    "USERNAME": "' . $row["USERNAME"] . '",
    "MAJOR": "' . $row["MAJOR"] . '",
    "PERMISSION": "' . $row["PERMISSION"] . '"
    }';
