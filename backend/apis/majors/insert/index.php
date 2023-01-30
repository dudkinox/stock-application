<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../../../client/index.php');

$requestBody = json_decode(file_get_contents('php://input'), true);
if ($requestBody["name"] == "") {
    echo "{ \"status\": \"success\",
        \"message\": \"เพิ่มสาขาสำเร็จ\",
        \"code\": \"000\" }";
    exit;
}
$query = "INSERT INTO major(`NAME`) VALUES ('" . $requestBody["name"] . "')";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"เพิ่มสาขาสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"Error: " . $query . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}