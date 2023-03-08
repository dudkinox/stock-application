<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
require('../../client/index.php');

date_default_timezone_set('Asia/Bangkok');

// จ่ายทุกวันที่ 10
// ต้องแจ้งเตือน 7
// Logic alert (จ่ายทุกวันที่ - 3) เช็ค == get วันที่ปัจุบัน

// ยอดชำระปัจจุบัน < ราคาเต็ม then แจ้ง
$queryCustomer = "SELECT PAYMENT, 
                        TOTAL_PRICE, 
                        DATE_PAYMENT, 
                        `NAME`, 
                        LAST_NAME, 
                        NUMBER_INSTALLMENT
                         FROM customer";
$resultCustomer = $conn->query($queryCustomer);
$rowCustomer = $resultCustomer->fetch_assoc();
$alertDate = number_format($rowCustomer["DATE_PAYMENT"]) - 3;
$current_day = date('d');
$isAlert = $current_day == $alertDate;
$currentDate = date('Y-m-d');
$futureDate = date('Y-m-d', strtotime('+3 days'));

$message = "แจ้งเตือน สบายโฟน: \n" .
    "ลูกค้า : " . $rowCustomer["NAME"] . " " . $rowCustomer["LAST_NAME"] . "\n" .
    "ประเภท : ใกล้ถึงวันชำระงวดที่ " . $rowCustomer["NUMBER_INSTALLMENT"] . "\n" .
    "วันที่ต้องชำระ : " . $futureDate;

if (
    $rowCustomer["PAYMENT"] < $rowCustomer["TOTAL_PRICE"] &&
    $isAlert
) {
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://notify-api.line.me/api/notify',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'message=' . $message,
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer AALDtW9mChJkQrVKbxkwwHUG27lNxiMhhCGnhfCQvtT',
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
}
