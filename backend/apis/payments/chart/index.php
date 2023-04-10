<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT
MONTH(DATE_PAYMENT) AS payment_month,
COUNT(*) AS payment_count,
SUM(CASE WHEN CUSTOMER_STATUS = 'ชำระแล้ว' THEN 1 ELSE 0 END) AS paid_count,
SUM(CASE WHEN CUSTOMER_STATUS = 'ค้างชำระ' THEN 1 ELSE 0 END) AS outstanding_count,
SUM(CASE WHEN CUSTOMER_STATUS = 'ชำระหมดแล้ว' THEN 1 ELSE 0 END) AS completed_count
FROM customer
GROUP BY payment_month";

$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode("0");
}
