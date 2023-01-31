<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';

$query = "DELETE FROM major WHERE ID='" . $id . "'";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"ลบสาขาสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"success\",
        \"message\": \"Error: " . $query . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}