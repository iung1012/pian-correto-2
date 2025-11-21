<?php
require_once '../config.php';

// Pega os parâmetros da URL
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;
$linha = isset($_GET['linha']) ? $_GET['linha'] : null;
$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : null;

// Monta a query para o Supabase
$query = 'products?select=*&order=name.asc';

// Adiciona filtros se existirem
if ($categoria) {
    $query .= '&category=eq.' . urlencode($categoria);
}

if ($linha) {
    $query .= '&line=eq.' . urlencode($linha);
}

if ($tipo) {
    $query .= '&type=eq.' . urlencode($tipo);
}

// Faz a requisição
$produtos = supabaseRequest($query);

// Retorna os produtos em JSON
if ($produtos !== false) {
    echo json_encode([
        'success' => true,
        'data' => $produtos
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao buscar produtos'
    ]);
}
?>
