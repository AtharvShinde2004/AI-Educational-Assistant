<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" . urlencode($query);

    $data = file_get_contents($apiUrl);
    echo $data;
} else {
    echo json_encode(array('error' => 'Missing query parameter'));
}
?>
