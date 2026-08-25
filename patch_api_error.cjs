const fs = require('fs');
let content = fs.readFileSync('public/api.php', 'utf8');

const debugSyncCode = `
    case 'debug_sync':
        try {
            $stmt = $pdo->prepare("INSERT INTO users (id, name, email, password, avatar_url) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)");
            foreach($input['team'] as $u) {
                $stmt->execute([$u['id'], $u['name'], $u['email'] ?? '', $u['password'] ?? '', $u['avatarUrl'] ?? '']);
            }
            echo json_encode(["success" => true, "inserted" => count($input['team'])]);
        } catch(PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
`;

content = content.replace(/case 'sync_team':/, debugSyncCode + "\n    case 'sync_team':");
fs.writeFileSync('public/api.php', content);
