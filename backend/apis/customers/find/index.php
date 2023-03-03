<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';

$query = "SELECT * FROM customer WHERE ID = '" . $id . "'";
$result = $conn->query($query);
$row = $result->fetch_assoc();

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
        "TOTAL_PRICE": "' . $row["TOTAL_PRICE"] . '",
        "CUSTOMER_STATUS": "' . $row["CUSTOMER_STATUS"] . '",
        "PROCESS": "' . $row["PROCESS"] . '"  
        }';
