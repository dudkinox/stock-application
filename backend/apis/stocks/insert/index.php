<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$requestBody = json_decode(file_get_contents('php://input'), true);

$date = $requestBody["date"] ?? '';
$idCard = $requestBody["id_card"] ?? '';
$customerStatus = $requestBody["customer_status"] ?? '';
$type = $requestBody["stock_type"] ?? '';

$query = "INSERT INTO stock (`DATE`, 
                                ID_CARD, 
                                CUSTOMER_STATUS, 
                                STOCK_TYPE) 
        VALUES ('" . $date . "', 
                '" . $idCard . "', 
                '" . $customerStatus . "', 
                '" . $type . "');";

$insert = "";

switch ($type) {
        case 'อุปกรณ์':
                $cases = $requestBody["cases"] ?? 0;
                $firm = $requestBody["firm"] ?? 0;
                $len = $requestBody["len"] ?? 0;
                $bigCharge = $requestBody["big_charge"] ?? 0;
                $charge = $requestBody["charge"] ?? 0;
                $repair = $requestBody["repair"] ?? 0;
                $sum = $requestBody["sum"] ?? 0;

                $insert = "INSERT INTO equipment(ID_CARD, 
                                                CASES, 
                                                FIRM, 
                                                `LEN`, 
                                                BIG_CHARGE, 
                                                CHARGE, 
                                                REPAIR, 
                                                `SUM`) 
                VALUES ('" . $idCard . "',
                        '" . $cases . "',
                        '" . $firm . "',
                        '" . $len . "',
                        '" . $bigCharge . "',
                        '" . $charge . "',
                        '" . $repair . "',
                        '" . $sum . "')";
                break;
        case 'ซื้อ':
                $version = $requestBody["version"] ?? '';
                $price = $requestBody["price"] ?? 0;
                $imei = $requestBody["imei"] ?? '';
                $source = $requestBody["source"] ?? '';
                $battery = $requestBody["battery"] ?? '';

                $insert = "INSERT INTO bye (ID_CARD, 
                                        `VERSION`, 
                                        PRICE, 
                                        IMEI, 
                                        SOURCE, 
                                        BATTERY) 
                VALUES ('" . $idCard . "', 
                        '" . $version . "', 
                        '" . $price . "', 
                        '" . $imei . "', 
                        '" . $source . "', 
                        '" . $battery . "')";
                break;
        case 'ขาย':
                $customer = $requestBody["customer"] ?? '';
                $tel = $requestBody["tel"] ?? '';
                $version = $requestBody["version"] ?? '';
                $imei = $requestBody["imei"] ?? '';
                $starMoney = $requestBody["star_money"] ?? 0;
                $month = $requestBody["month"] ?? 0;
                $installment = $requestBody["installment"] ?? 0;
                $datePayment = $requestBody["date_payment"] ?? '';

                $insert = "INSERT INTO kay ( 
                                        ID_CARD, 
                                        CUSTOMER, 
                                        TEL, 
                                        `VERSION`, 
                                        IMEI, 
                                        STAR_MONEY, 
                                        `MONTH`, 
                                        INSTALLMENT, 
                                        DATE_PAYMENT) 
                        VALUES ('" . $idCard . "', 
                                '" . $customer . "', 
                                '" . $tel . "', 
                                '" . $version . "', 
                                '" . $imei . "', 
                                '" . $starMoney . "', 
                                '" . $month . "', 
                                '" . $installment . "', 
                                '" . $datePayment . "');";
                break;
        case 'ผ่อน':
                $installmentNo = $requestBody["installment_no"] ?? 0;
                $priceTotal = $requestBody["price_total"] ?? 0;

                $insert = "INSERT INTO installment_payment (
                                        ID_CARD
                                        INSTALLMENT_NO
                                        PRICE_TOTAL) 
                                VALUES ('" . $idCard . "', 
                                        '" . $installmentNo . "', 
                                        '" . $priceTotal . "');";
        default:
                echo "{ \"status\": \"error\",
                        \"message\": \"เพิ่มข้อมูลไม่สำเร็จ ส่งค่าผิด\",
                        \"code\": \"001\" }";
                exit;
                break;
}

if ($conn->query($query) === TRUE && $conn->query($insert) === TRUE) {
        echo "{ \"status\": \"success\",
            \"message\": \"เพิ่มข้อมูลสำเร็จ\",
            \"code\": \"000\" }";
} else {
        echo "{ \"status\": \"error\",
            \"message\": \"Error: " . $sql . "<br>" . $conn->error . "\",
            \"code\": \"001\" }";
}