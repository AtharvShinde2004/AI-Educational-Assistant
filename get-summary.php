<?php
// Enable error reporting for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow cross-origin resource sharing
header("Access-Control-Allow-Origin: *");

// Check if the 'pageid' parameter is set in the GET request
if (isset($_GET['pageid'])) {
    // Retrieve the 'pageid' parameter value
    $pageid = $_GET['pageid'];

    // Build the Wikipedia API URL with the page ID
    $apiUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids=" . urlencode($pageid);

    // Fetch data from the Wikipedia API
    $data = file_get_contents($apiUrl);

    // Output the retrieved data as the API response
    echo $data;
} else {
    // If 'pageid' parameter is not provided, return an error response
    echo json_encode(array('error' => 'Missing pageid parameter'));
}
?>
