<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';
$stockType = isset($_GET['stock_type']) ? $_GET['stock_type'] : '';

$requestBody = json_decode(file_get_contents('php://input'), true);

$queryIdCard = "SELECT ID_CARD FROM stock WHERE ID = '" . $id . "'";
$resultIdCard = $conn->query($queryIdCard);
$idCard = $resultIdCard->fetch_assoc()["ID_CARD"];

$queryUpdateDate = "UPDATE stock 
SET `DATE`='" . $requestBody["date"] . "'
WHERE ID = '" . $id . "'";

$queryUpdateStock = "";
switch ($stockType) {
    case 'อุปกรณ์':
        $queryUpdateStock = "UPDATE equipment SET 
        CASES='" . $requestBody["cases"] . "',
        FIRM='" . $requestBody["firm"] . "',
        `LEN`='" . $requestBody["len"] . "',
        BIG_CHARGE='" . $requestBody["big_charge"] . "',
        CHARGE='" . $requestBody["charge"] . "',
        REPAIR='" . $requestBody["repair"] . "',
        `SUM`='" . $requestBody["sum"] . "' 
        WHERE ID_CARD = '" . $idCard . "'";
        break;
    case 'ผ่อน':
        $queryUpdateStock = "UPDATE installment_payment SET 
        INSTALLMENT_NO='" . $requestBody["installment_no"] . "',
        PRICE_TOTAL='" . $requestBody["price_total"] . "'
        WHERE ID_CARD = '" . $idCard . "'";
        break;
    case 'ขาย':
        $queryUpdateStock = "UPDATE kay SET 
        CUSTOMER='" . $requestBody["customer"] . "',
        TEL='" . $requestBody["tel"] . "',
        `VERSION`='" . $requestBody["version"] . "',
        IMEI='" . $requestBody["imei"] . "',
        STAR_MONEY='" . $requestBody["star_money"] . "',
        `MONTH`='" . $requestBody["month"] . "',
        INSTALLMENT='" . $requestBody["installment"] . "',
        DATE_PAYMENT='" . $requestBody["date_payment"] . "' 
        WHERE ID_CARD = '" . $idCard . "'";
        break;
    case 'ซื้อ':
        $queryUpdateStock = "UPDATE `bye` SET 
        `VERSION`='" . $requestBody["version"] . "',
        PRICE='" . $requestBody["price"] . "',
        IMEI='" . $requestBody["imei"] . "',
        SOURCE='" . $requestBody["source"] . "',
        BATTERY='" . $requestBody["battery"] . "' 
        WHERE ID_CARD = '" . $idCard . "'";
        break;
}

if (
    $conn->query($queryUpdateDate) === TRUE &&
    $conn->query($queryUpdateStock) === TRUE
) {
    echo "{ \"status\": \"success\",
        \"message\": \"แก้ไขข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"Error: " . $queryUpdateStock . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}