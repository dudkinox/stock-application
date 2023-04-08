<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$major = isset($_GET["major"]) ? $_GET["major"] : '';

$query = "";
if ($major != "admin") {
    $query = "SELECT SUM(PAYMENT) as SALARY FROM customer WHERE MAJOR = '$major'";
} else {
    $query = "SELECT SUM(PAYMENT) as SALARY FROM customer";
}

$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $payment = $row["SALARY"];
    $payment = number_format($payment);
    echo json_encode($payment);
} else {
    echo json_encode("0");
}
