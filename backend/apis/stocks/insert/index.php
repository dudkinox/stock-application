<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$date = isset($_POST['date']) ? $_POST['date'] : '';
$idCard = isset($_POST['id_card']) ? $_POST['id_card'] : '';
$customerStatus = isset($_POST['customer_status']) ? $_POST['customer_status'] : '';
$type = isset($_POST['stock_type']) ? $_POST['stock_type'] : '';

$query = "INSERT INTO stock (ID, DATE, ID_CARD, CUSTOMER_STATUS, STOCK_TYPE) 
        VALUES (NULL, '10 / 12 / 2022', '1234123412312', 'ลูกค้าดี', 'ขาย');";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
            \"message\": \"เพิ่มข้อมูลสำเร็จ\",
            \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
            \"message\": \"เพิ่มข้อมูลไม่สำเร็จ\",
            \"code\": \"001\" }";
}