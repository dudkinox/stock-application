<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';

$query = "DELETE FROM stock WHERE ID = '" . $_GET["id"] . "'";

if ($conn->query($query) === TRUE) {
    echo "{ \"status\": \"success\",
        \"message\": \"ลบข้อมูลสำเร็จ\",
        \"code\": \"000\" }";
} else {
    echo "{ \"status\": \"error\",
        \"message\": \"ลบข้อมูลไม่สำเร็จ\",
        \"code\": \"001\" }";
}