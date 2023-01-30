<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM major";
$result = $conn->query($query);

$i = 1;
echo '[';
while ($row = $result->fetch_assoc()) {
    echo '
        {
        "ID": "' . $row["ID"] . '",
        "NAME": "' . $row["NAME"] . '"
        }';
    if ($i != $result->num_rows) {
        echo ',';
    }
    $i++;
}
echo ']';