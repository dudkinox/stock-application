<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$major = isset($_GET['major']) ? $_GET['major'] : '';
$where = "";
if ($major != "admin") {
    $where = "WHERE MAJOR = '" . $major . "'";
}
$query = "SELECT * FROM customer " . $where;
$result = $conn->query($query);

$i = 1;
echo '[';
while ($row = $result->fetch_assoc()) {
    echo '
        {
        "ID": "' . $row["ID"] . '",
        "ID_CARD": "' . $row["ID_CARD"] . '",
        "NAME": "' . $row["NAME"] . '",
        "LAST_NAME": "' . $row["LAST_NAME"] . '",
        "INSTALLMENT_MONTH": "' . $row["INSTALLMENT_MONTH"] . '",
        "NUMBER_INSTALLMENT": "' . $row["NUMBER_INSTALLMENT"] . '",
        "PAYMENT": "' . $row["PAYMENT"] . '",
        "DATE_PAYMENT": "' . $row["DATE_PAYMENT"] . '",
        "CUSTOMER_STATUS": "' . $row["CUSTOMER_STATUS"] . '",
        "TOTAL_PRICE": "' . $row["TOTAL_PRICE"] . '",
        "PROCESS": "' . $row["PROCESS"] . '",
        "MAJOR": "' . $row["MAJOR"] . '"
        }';
    if ($i != $result->num_rows) {
        echo ',';
    }
    $i++;
}
echo ']';
