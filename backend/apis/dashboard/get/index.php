<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT DISTINCT STOCK_TYPE FROM stock";
$result = $conn->query($query);

$i = 1;
echo '[';
while ($row = $result->fetch_assoc()) {
    echo '"' . $row["STOCK_TYPE"] . '"';
    if ($i != $result->num_rows) {
        echo ',';
    }
    $i++;
}
echo ']';
