<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT * FROM user";
$result = $conn->query($query);

$i = 1;
echo '[';
while ($row = $result->fetch_assoc()) {
    echo '
        {
        "ID": "' . $row["ID"] . '",
        "USERNAME": "' . $row["USERNAME"] . '",
        "MAJOR": "' . $row["MAJOR"] . '",
        "PERMISSION": "' . $row["PERMISSION"] . '"
        }';
    if ($i != $result->num_rows) {
        echo ',';
    }
    $i++;
}
echo ']';