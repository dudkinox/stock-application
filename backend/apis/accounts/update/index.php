<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';

$requestBody = json_decode(file_get_contents('php://input'), true);

$query = "UPDATE user 
SET USERNAME='" . $requestBody["username"] . "',
    MAJOR='" . $requestBody["major"] . "',
    PERMISSION='" . $requestBody["permission"] . "'
 WHERE ID='" . $id . "'";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"แก้ไขข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"Error: " . $query . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}
