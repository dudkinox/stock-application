<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../../../client/index.php');

$requestBody = json_decode(file_get_contents('php://input'), true);

$query = "INSERT INTO customer( 
                            ID_CARD, 
                            `NAME`, 
                            LAST_NAME, 
                            INSTALLMENT_MONTH, 
                            NUMBER_INSTALLMENT,
                            PAYMENT,
                            DATE_PAYMENT, 
                            CUSTOMER_STATUS, 
                            PROCESS) 
        VALUES ('" . $requestBody["id_card"] . "',
                '" . $requestBody["name"] . "',
                '" . $requestBody["last_name"] . "',
                '" . $requestBody["installment_month"] . "',
                '" . $requestBody["number_installment"] . "',
                '" . $requestBody["payment"] . "',
                '" . $requestBody["date_payment"] . "',
                '" . $requestBody["customer_status"] . "',
                '" . $requestBody["process"] . "')";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"เพิ่มข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"Error: " . $query . "<br>" . $conn->error . "\",
        \"code\": \"001\" }";
}