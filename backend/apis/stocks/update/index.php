<?php
header('Content-Type: application/json; charset=utf-8');
require('../../../client/index.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';
$date = isset($_GET['date']) ? $_GET['date'] :

    $query = "UPDATE stock 
SET `DATE`='" . $date . "'
WHERE ID = '" . $_GET["id"] . "'";