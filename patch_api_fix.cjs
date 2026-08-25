const fs = require('fs');
let content = fs.readFileSync('public/api.php', 'utf8');

const fixCase = `
    case 'fix_db':
        try {
            $pdo->exec("ALTER TABLE users MODIFY COLUMN id VARCHAR(50) NOT NULL");
            echo json_encode(["success" => true, "msg" => "Table altered"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
`;

content = content.replace(/case 'sync_team':/, fixCase + "\n    case 'sync_team':");
fs.writeFileSync('public/api.php', content);
