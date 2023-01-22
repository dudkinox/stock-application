<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET["id"]) ? $_GET["id"] : '';

$query = "DELETE FROM user WHERE ID = '" . $id . "'";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"ลบข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"Error: " . $query . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}