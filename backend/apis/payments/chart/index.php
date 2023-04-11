<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$query = "SELECT
MONTH(UPDATED_AT) AS payment_month,
COUNT(*) AS payment_count,
SUM(CASE WHEN PROCESS = 'ชำระแล้ว' THEN 1 ELSE 0 END) AS paid_count,
SUM(CASE WHEN PROCESS = 'ค้างชำระ' THEN 1 ELSE 0 END) AS outstanding_count,
SUM(CASE WHEN PROCESS = 'ชำระหมดแล้ว' THEN 1 ELSE 0 END) AS completed_count
FROM customer
WHERE PROCESS IN ('ชำระแล้ว', 'ค้างชำระ', 'ชำระหมดแล้ว')
GROUP BY payment_month";

$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode("0");
}
