<?
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';

$major = isset($_GET['major']) ? $_GET['major'] : '';
$where = "";
if ($major != "admin") {
    $where = "AND MAJOR = '" . $major . "'";
}
$queryStockType = "SELECT STOCK_TYPE FROM stock 
                WHERE ID = '" . $id . "' " . $where;
$resultStockType = $conn->query($queryStockType);
$rowStockType = $resultStockType->fetch_assoc();

$table = "";
switch ($rowStockType["STOCK_TYPE"]) {
    case 'อุปกรณ์':
        $table = "equipment";
        break;
    case 'ขาย':
        $table = "kay";
        break;
    case 'ซื้อ':
        $table = "bye";
        break;
    default:
        $table = "installment_payment";
        break;
}

$query = "SELECT * FROM " . $table . " 
    WHERE ID = '" . $id . "' " . $where;
$result = $conn->query($query);
$row = $result->fetch_assoc();

echo '{';
echo '
    "ID": "' . $row["ID"] . '",
    "ID_CARD": "' . $row["ID_CARD"] . '",
    "MAJOR": "' . $row["MAJOR"] . '",
';
switch ($rowStockType["STOCK_TYPE"]) {
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
echo '';
echo '}';