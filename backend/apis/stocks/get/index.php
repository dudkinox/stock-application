<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM stock";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    echo '
    {
      "ID": "' . $row["ID"] . '",
      "DATE": "' . $row["DATE"] . '",
      "ID_CARD": "' . $row["ID_CARD"] . '",
      "CUSTOMER_STATUS": "' . $row["CUSTOMER_STATUS"] . '",
      "STOCK_TYPE": "' . $row["STOCK_TYPE"] . '"  
    }';
    if ($row < $result->num_rows) {
        echo ',';
    }
}