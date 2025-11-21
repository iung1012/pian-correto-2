<?php
require_once '../config.php';

// Pega o ID do produto
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'ID do produto inválido'
    ]);
    exit;
}

// Busca o produto específico
$query = 'products?id=eq.' . $id;
$produto = supabaseRequest($query);

if ($produto !== false && count($produto) > 0) {
    echo json_encode([
        'success' => true,
        'data' => $produto[0]
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => 'Produto não encontrado'
    ]);
}
?>
