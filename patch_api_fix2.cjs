const fs = require('fs');
let content = fs.readFileSync('public/api.php', 'utf8');

const fixCase = `
    case 'fix_db':
        try {
            // Drop unique index on email if it exists
            $pdo->exec("ALTER TABLE users DROP INDEX email");
            echo json_encode(["success" => true, "msg" => "Unique index on email dropped"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
`;

content = content.replace(/case 'fix_db':[\s\S]*?break;/, fixCase);
fs.writeFileSync('public/api.php', content);
