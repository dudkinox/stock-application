<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$idCard = isset($_GET['id_card']) ? $_GET['id_card'] : '';

$queryStockType = "SELECT STOCK_TYPE FROM stock 
                WHERE ID_CARD = '" . $idCard . "' 
                AND MAJOR = '" . $_GET["major"] . "'";
$resultStockType = $conn->query($queryStockType);
$rowStockType = $resultStockType->fetch_assoc()["STOCK_TYPE"];

$queryDeleteStock = "DELETE FROM stock WHERE ID_CARD = '" . $idCard . "' AND MAJOR = '" . $_GET["major"] . "'";

$queryDeleteStockType = "";
switch ($rowStockType) {
    case 'อุปกรณ์':
        $queryDeleteStockType = "DELETE FROM equipment WHERE ID_CARD = '" . $idCard . "' AND MAJOR = '" . $_GET["major"] . "'";
        break;
    case 'ขาย':
        $queryDeleteStockType = "DELETE FROM kay WHERE ID_CARD = '" . $idCard . "' AND MAJOR = '" . $_GET["major"] . "'";
        break;
    case 'ซื้อ':
        $queryDeleteStockType = "DELETE FROM bye WHERE ID_CARD = '" . $idCard . "' AND MAJOR = '" . $_GET["major"] . "'";
        break;
    default:
        $queryDeleteStockType = "DELETE FROM installment_payment WHERE ID_CARD = '" . $idCard . "' AND MAJOR = '" . $_GET["major"] . "'";
        break;
}

if (
    $conn->query($queryDeleteStock) === TRUE &&
    $conn->query($queryDeleteStockType) === TRUE
) {
    echo "{ \"status\": \"success\",
        \"message\": \"ลบข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"ลบข้อมูลไม่สำเร็จ\",
        \"code\": \"001\" }";
}
