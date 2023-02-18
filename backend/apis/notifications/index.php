<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$message = isset($_GET['message']) ? $_GET['message'] : '';
$notificationTime = isset($_GET['notificationTime']) ? $_GET['notificationTime'] : '';

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
    CURLOPT_POSTFIELDS => 'message=' . $message . '&notificationTime=' . $notificationTime,
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer AALDtW9mChJkQrVKbxkwwHUG27lNxiMhhCGnhfCQvtT',
        'Content-Type: application/x-www-form-urlencoded'
    ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;
