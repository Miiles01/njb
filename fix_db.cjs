const fs = require('fs');
const content = `<?php
$pdo = new PDO("mysql:host=localhost;dbname=u826055601_NJBwork;charset=utf8mb4", "u826055601_NJBwork", "NJB8888host@");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $pdo->exec("ALTER TABLE users MODIFY COLUMN id VARCHAR(50) NOT NULL");
    echo json_encode(["success" => true, "msg" => "Table altered"]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
`;
fs.writeFileSync('public/fix.php', content);
