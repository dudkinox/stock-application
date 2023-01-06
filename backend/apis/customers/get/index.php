<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM customer";
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
        "PROCESS": "' . $row["PROCESS"] . '"  
        }';
    if ($i != $result->num_rows) {
        echo ',';
    }
    $i++;
}
echo ']';