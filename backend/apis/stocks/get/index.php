<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM stock WHERE MAJOR = '" . $_GET["major"] . "'";
$result = $conn->query($query);

$i = 1;
echo '[';
while ($row = $result->fetch_assoc()) {
  echo '
    {
      "ID": "' . $row["ID"] . '",
      "DATE": "' . $row["DATE"] . '",
      "ID_CARD": "' . $row["ID_CARD"] . '",
      "CUSTOMER_STATUS": "' . $row["CUSTOMER_STATUS"] . '",
      "STOCK_TYPE": "' . $row["STOCK_TYPE"] . '",
      "MAJOR": "' . $row["MAJOR"] . '"
    }';
  if ($i != $result->num_rows) {
    echo ',';
  }
  $i++;
}
echo ']';
