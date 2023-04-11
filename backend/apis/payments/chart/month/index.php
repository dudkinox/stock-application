<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../../client/index.php');

$query = "SELECT 
DATE_FORMAT(UPDATED_AT,'%M') as MONTH,
SUM(CASE WHEN PROCESS = 'ชำระแล้ว' THEN 1 ELSE 0 END) AS PAID_COUNT,
SUM(CASE WHEN PROCESS = 'ค้างชำระ' THEN 1 ELSE 0 END) AS OUTSTANDING_COUNT,
SUM(CASE WHEN PROCESS = 'ชำระหมดแล้ว' THEN 1 ELSE 0 END) AS COMPLETED_COUNT
FROM customer
WHERE PROCESS IN ('ชำระแล้ว', 'ค้างชำระ', 'ชำระหมดแล้ว')
GROUP BY MONTH
ORDER BY MONTH(UPDATED_AT)
";

$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode("0");
}
