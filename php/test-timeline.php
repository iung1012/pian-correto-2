<?php
/**
 * Test file to verify timeline data structure
 */

require_once 'config.php';
$timelineData = include 'timeline-data.php';

// Output JSON for testing
header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'status' => 'success',
    'total_items' => count($timelineData),
    'timeline_data' => $timelineData,
    'years' => array_column($timelineData, 'year')
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
