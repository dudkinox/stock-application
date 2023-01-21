<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../../../client/index.php');

$requestBody = json_decode(file_get_contents('php://input'), true);

$query = "SELECT * FROM user 
        WHERE USERNAME = '" . $requestBody["username"] . "'";
$result = $conn->query($query);
$row = $result->fetch_assoc();
if (password_verify($requestBody["password"], $row["PASSWORD"] ?? "")) {
    echo "{ \"status\": \"success\",
        \"message\": \"เข้าสู่ระบบสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง\",
        \"code\": \"001\" }";
}