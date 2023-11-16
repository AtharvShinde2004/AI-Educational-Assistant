<?php
// Enable error reporting for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow cross-origin resource sharing
header("Access-Control-Allow-Origin: *");

// Check if the 'query' parameter is set in the GET request
if (isset($_GET['query'])) {
    // Retrieve the 'query' parameter value
    $query = $_GET['query'];

    // Build the Wikipedia API URL with the search query
    $apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" . urlencode($query);

    // Fetch data from the Wikipedia API
    $data = file_get_contents($apiUrl);

    // Output the retrieved data as the API response
    echo $data;
} else {
    // If 'query' parameter is not provided, return an error response
    echo json_encode(array('error' => 'Missing query parameter'));
}
