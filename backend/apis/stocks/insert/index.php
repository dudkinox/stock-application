<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$date = isset($_POST['date']) ? $_POST['date'] : '';
$idCard = isset($_POST['id_card']) ? $_POST['id_card'] : '';
$customerStatus = isset($_POST['customer_status']) ? $_POST['customer_status'] : '';
$type = isset($_POST['stock_type']) ? $_POST['stock_type'] : '';

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
                $cases = isset($_POST['cases']) ? $_POST['cases'] : '';
                $firm = isset($_POST['firm']) ? $_POST['firm'] : '';
                $len = isset($_POST['len']) ? $_POST['len'] : '';
                $bigCharge = isset($_POST['big_charge']) ? $_POST['big_charge'] : '';
                $charge = isset($_POST['charge']) ? $_POST['charge'] : '';
                $repair = isset($_POST['repair']) ? $_POST['repair'] : '';
                $sum = isset($_POST['sum']) ? $_POST['sum'] : '';

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
                $version = isset($_POST['version']) ? $_POST['version'] : '';
                $price = isset($_POST['price']) ? $_POST['price'] : '';
                $imei = isset($_POST['imei']) ? $_POST['imei'] : '';
                $source = isset($_POST['source']) ? $_POST['source'] : '';
                $battery = isset($_POST['battery']) ? $_POST['battery'] : '';

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
                $customer = isset($_POST['customer']) ? $_POST['customer'] : '';
                $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
                $version = isset($_POST['version']) ? $_POST['version'] : '';
                $imei = isset($_POST['imei']) ? $_POST['imei'] : '';
                $starMoney = isset($_POST['star_money']) ? $_POST['star_money'] : '';
                $month = isset($_POST['month']) ? $_POST['month'] : '';
                $installment = isset($_POST['installment']) ? $_POST['installment'] : '';
                $datePayment = isset($_POST['date_payment']) ? $_POST['date_payment'] : '';

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
                $installmentNo = isset($_POST['installment_no']) ? $_POST['installment_no'] : '';
                $priceTotal = isset($_POST['price_total']) ? $_POST['price_total'] : '';

                $insert = "INSERT INTO installment_payment (
                                        ID_CARD
                                        INSTALLMENT_NO
                                        PRICE_TOTAL) 
                                VALUES ('" . $idCard . "', 
                                        '" . $installmentNo . "', 
                                        '" . $priceTotal . "');";
        default:
                echo "{ \"status\": \"error\",
                        \"message\": \"เพิ่มข้อมูลไม่สำเร็จ\",
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
            \"message\": \"เพิ่มข้อมูลไม่สำเร็จ\",
            \"code\": \"001\" }";
}