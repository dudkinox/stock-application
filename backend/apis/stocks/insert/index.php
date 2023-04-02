<?php
header('Content-Type: application/json; charset=utf-8');

require('../../../client/index.php');

$date = isset($_GET["date"]) ? $_GET["date"] : '';
$idCard = isset($_GET["id_card"]) ? $_GET["id_card"] : '';
$customerStatus = isset($_GET["customer_status"]) ? $_GET["customer_status"] : '';
$type = isset($_GET["stock_type"]) ? $_GET["stock_type"] : '';
$id = $conn->query("SELECT ID FROM stock ORDER BY ID DESC LIMIT 1")->fetch_assoc()["ID"] + 1;

$query = "INSERT INTO stock (ID,
                                `DATE`, 
                                ID_CARD, 
                                CUSTOMER_STATUS, 
                                STOCK_TYPE,
                                MAJOR) 
        VALUES ('" . $id . "',
                '" . $date . "', 
                '" . $idCard . "', 
                '" . $customerStatus . "', 
                '" . $type . "',
                '" . $_GET["major"] . "');";

$insert = "";

switch ($type) {
        case 'อุปกรณ์':
                $cases = isset($_GET["cases"]) ? $_GET["cases"] : 0;
                $firm = isset($_GET["firm"]) ? $_GET["firm"] : 0;
                $len = isset($_GET["len"]) ? $_GET["len"] : 0;
                $bigCharge = isset($_GET["big_charge"]) ? $_GET["big_charge"] : 0;
                $charge = isset($_GET["charge"]) ? $_GET["charge"] : 0;
                $repair = isset($_GET["repair"]) ? $_GET["repair"] : 0;
                $sum = isset($_GET["sum"]) ? $_GET["sum"] : 0;

                $insert = "INSERT INTO equipment(
                                                ID,
                                                ID_CARD, 
                                                CASES, 
                                                FIRM, 
                                                `LEN`, 
                                                BIG_CHARGE, 
                                                CHARGE, 
                                                REPAIR, 
                                                `SUM`,
                                                MAJOR) 
                VALUES ('" . $id . "',
                        '" . $idCard . "',
                        '" . $cases . "',
                        '" . $firm . "',
                        '" . $len . "',
                        '" . $bigCharge . "',
                        '" . $charge . "',
                        '" . $repair . "',
                        '" . $sum . "',
                        '" . $_GET["major"] . "')";
                break;
        case 'ซื้อ':
                $version = isset($_GET["version"]) ? $_GET["version"] : '';
                $price = isset($_GET["price"]) ? $_GET["price"] : 0;
                $imei = isset($_GET["imei"]) ? $_GET["imei"] : '';
                $source = isset($_GET["source"]) ? $_GET["source"] : '';
                $battery = isset($_GET["battery"]) ? $_GET["battery"] : '';

                $insert = "INSERT INTO bye (ID,
                                        ID_CARD, 
                                        `VERSION`, 
                                        PRICE, 
                                        IMEI, 
                                        SOURCE, 
                                        BATTERY,
                                        MAJOR) 
                VALUES ('" . $id . "',
                        '" . $idCard . "', 
                        '" . $version . "', 
                        '" . $price . "', 
                        '" . $imei . "', 
                        '" . $source . "', 
                        '" . $battery . "',
                        '" . $_GET["major"] . "')";
                break;
        case 'ขาย':
                $customer = isset($_GET["customer"]) ? $_GET["customer"] : '';
                $tel = isset($_GET["tel"]) ? $_GET["tel"] : '';
                $version = isset($_GET["version"]) ? $_GET["version"] : '';
                $imei = isset($_GET["imei"]) ? $_GET["imei"] : '';
                $starMoney = isset($_GET["star_money"]) ? $_GET["star_money"] : 0;
                $month = isset($_GET["month"]) ? $_GET["month"] : 0;
                $installment = isset($_GET["installment"]) ? $_GET["installment"] : 0;
                $datePayment = isset($_GET["date_payment"]) ? $_GET["date_payment"] : '';

                $insert = "INSERT INTO kay (ID,
                                        ID_CARD, 
                                        CUSTOMER, 
                                        TEL, 
                                        `VERSION`, 
                                        IMEI, 
                                        STAR_MONEY, 
                                        `MONTH`, 
                                        INSTALLMENT, 
                                        DATE_PAYMENT,
                                        MAJOR) 
                        VALUES ('" . $id . "',
                                '" . $idCard . "', 
                                '" . $customer . "', 
                                '" . $tel . "', 
                                '" . $version . "', 
                                '" . $imei . "', 
                                '" . $starMoney . "', 
                                '" . $month . "', 
                                '" . $installment . "', 
                                '" . $datePayment . "',
                                '" . $_GET["major"] . "');";
                break;
        case 'ผ่อน':
                $installmentNo = isset($_GET["installment_no"]) ? $_GET["installment_no"] : 0;
                $priceTotal = isset($_GET["price_total"]) ? $_GET["price_total"] : 0;

                $insert = "INSERT INTO installment_payment (
                                        ID,
                                        ID_CARD,
                                        INSTALLMENT_NO,
                                        PRICE_TOTAL,
                                        MAJOR) 
                                VALUES ('" . $id . "',
                                        '" . $idCard . "', 
                                        '" . $installmentNo . "', 
                                        '" . $priceTotal . "',
                                        '" . $_GET["major"] . "');";

                $queryPayment = "SELECT PAYMENT FROM customer WHERE ID_CARD='" . $idCard . "' AND MAJOR='" . $_GET["major"] . "'";
                $resultPayment = $conn->query($queryPayment);
                $rowPayment = $resultPayment->fetch_assoc();
                $sum = number_format($rowPayment["PAYMENT"], 2) + number_format($priceTotal, 2);

                $customerInstallMent = "UPDATE customer 
                                        SET NUMBER_INSTALLMENT='" . $installmentNo . "' ,
                                        PAYMENT = '" . $sum . "' 
                                        WHERE ID_CARD='" . $idCard . "' AND MAJOR='" . $_GET["major"] . "'";
                if ($conn->query($customerInstallMent) === FALSE) {
                        echo "{ \"status\": \"error\",
                                \"message\": \"Error: " . $sql . "<br>" . $conn->error . "\",
                                \"code\": \"001\" }";
                }
                break;
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
