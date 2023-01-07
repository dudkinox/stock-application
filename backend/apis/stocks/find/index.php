<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';
$type = isset($_GET['stock_type']) ? $_GET['stock_type'] : "";

$formatStockType = "";
switch ($type) {
    case 'อุปกรณ์':
        $formatStockType = "equipment";
        break;
    case 'ขาย':
        $formatStockType = "kay";
        break;
    case 'ซื้อ':
        $formatStockType = "bye";
        break;
    default:
        $formatStockType = "installment_payment";
        break;
}

$query = "SELECT * FROM stock AS a 
INNER JOIN " . $formatStockType . " AS b 
ON a.ID_CARD = b.ID_CARD WHERE a.ID=" . $id;
$result = $conn->query($query);
$row = $result->fetch_assoc();

echo '{';
echo '
"ID": "' . $row["ID"] . '",
"DATE": "' . $row["DATE"] . '",
"ID_CARD": "' . $row["ID_CARD"] . '",
"CUSTOMER_STATUS": "' . $row["CUSTOMER_STATUS"] . '",
"STOCK_TYPE": "' . $row["STOCK_TYPE"] . '",
';
switch ($type) {
    case 'อุปกรณ์':
        echo '
        "CASES": "' . $row["CASES"] . '",
        "FIRM": "' . $row["FIRM"] . '",
        "LEN": "' . $row["LEN"] . '",
        "BIG_CHARGE": "' . $row["BIG_CHARGE"] . '",
        "CHARGE": "' . $row["CHARGE"] . '",
        "REPAIR": "' . $row["REPAIR"] . '",
        "SUM": "' . $row["SUM"] . '"
        ';
        break;
    case 'ขาย':
        echo '
        "CUSTOMER": "' . $row["CUSTOMER"] . '",
        "TEL": "' . $row["TEL"] . '",
        "VERSION": "' . $row["VERSION"] . '",
        "IMEI": "' . $row["IMEI"] . '",
        "STAR_MONEY": "' . $row["STAR_MONEY"] . '",
        "MONTH": "' . $row["MONTH"] . '",
        "INSTALLMENT": "' . $row["INSTALLMENT"] . '",
        "DATE_PAYMENT": "' . $row["DATE_PAYMENT"] . '"
        ';
        break;
    case 'ซื้อ':
        echo '
        "VERSION": "' . $row["VERSION"] . '",
        "PRICE": "' . $row["PRICE"] . '",
        "IMEI": "' . $row["IMEI"] . '",
        "SOURCE": "' . $row["SOURCE"] . '",
        "BATTERY": "' . $row["BATTERY"] . '"
        ';
        break;
    default:
        echo '
        "INSTALLMENT_NO": "' . $row["INSTALLMENT_NO"] . '",
        "PRICE_TOTAL": "' . $row["PRICE_TOTAL"] . '"
        ';
        break;
}
echo '}';