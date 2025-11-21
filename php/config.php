<?php
// Configuração do Supabase
define('SUPABASE_URL', 'https://tbvrbelxnilqncnhclie.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidnJiZWx4bmlscW5jbmhjbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODM4NTksImV4cCI6MjA3Nzg1OTg1OX0.ckK0RNA9RtghSgNgnUF8KaXmVN_rNdtmocbV8VI_4t0');

// Configuração do site
define('SITE_NAME', 'Pian Alimentos');
define('SITE_URL', 'https://seu-site.com.br');
define('WHATSAPP_NUMBER', '5511999999999');
define('WHATSAPP_MESSAGE', 'Olá! Gostaria de mais informações sobre os produtos Pian.');

// Headers para CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Função para fazer requisições ao Supabase
function supabaseRequest($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;

    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    if ($data && in_array($method, ['POST', 'PATCH', 'PUT'])) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        return json_decode($response, true);
    }

    return false;
}
?>
