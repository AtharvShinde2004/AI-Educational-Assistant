<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

if (isset($_GET['pageid'])) {
    $pageid = $_GET['pageid'];
    $apiUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids=" . urlencode($pageid);

    $data = file_get_contents($apiUrl);
    echo $data;
} else {
    echo json_encode(array('error' => 'Missing pageid parameter'));
}
?>
