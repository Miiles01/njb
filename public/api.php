<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = "localhost";
$db = "u826055601_NJBwork";
$user = "u826055601_NJBwork";
$pass = "NJB8888host@";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["error" => "Conexion fallida: " . $e->getMessage()]));
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true);

switch($action) {
    case 'get_all':
        $tasks = $pdo->query("SELECT * FROM tasks ORDER BY order_index ASC")->fetchAll(PDO::FETCH_ASSOC);
        foreach($tasks as &$t) {
            $t['assigneeIds'] = json_decode($t['assignee_ids'] ?: '[]');
            $t['checklists'] = json_decode($t['checklists'] ?: '[]');
            $t['links'] = json_decode($t['links'] ?: '[]');
            $t['images'] = json_decode($t['images'] ?: '[]');
            $t['order'] = (int)$t['order_index'];
            unset($t['assignee_ids'], $t['order_index']);
        }
        $projects = $pdo->query("SELECT * FROM projects")->fetchAll(PDO::FETCH_ASSOC);
        $users = $pdo->query("SELECT * FROM users")->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(["tasks" => $tasks, "projects" => $projects, "team" => $users]);
        break;

    case 'sync_tasks':
        $stmt = $pdo->prepare("
            INSERT INTO tasks (id, title, subtitle, description, priority, status, project, order_index, assignee_ids, checklists, links, images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            title=VALUES(title), subtitle=VALUES(subtitle), description=VALUES(description), 
            priority=VALUES(priority), status=VALUES(status), project=VALUES(project), 
            order_index=VALUES(order_index), assignee_ids=VALUES(assignee_ids), 
            checklists=VALUES(checklists), links=VALUES(links), images=VALUES(images)
        ");
        foreach($input['tasks'] as $t) {
            $stmt->execute([
                $t['id'], $t['title'] ?? '', $t['subtitle'] ?? '', $t['description'] ?? '',
                $t['priority'] ?? 'Media', $t['status'] ?? 'Nuevas', $t['project'] ?? '',
                $t['order'] ?? 0,
                json_encode($t['assigneeIds'] ?? []),
                json_encode($t['checklists'] ?? []),
                json_encode($t['links'] ?? []),
                json_encode($t['images'] ?? [])
            ]);
        }
        echo json_encode(["success" => true]);
        break;

    case 'delete_task':
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$input['id']]);
        echo json_encode(["success" => true]);
        break;

    case 'sync_projects':
        $stmt = $pdo->prepare("INSERT INTO projects (id, name, icon) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), icon=VALUES(icon)");
        foreach($input['projects'] as $p) {
            $stmt->execute([$p['id'], $p['name'], $p['icon']]);
        }
        echo json_encode(["success" => true]);
        break;

    
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

    
    case 'fix_db':
        try {
            $pdo->exec("ALTER TABLE users MODIFY COLUMN id VARCHAR(50) NOT NULL");
            echo json_encode(["success" => true, "msg" => "Table altered"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'sync_team':
        $stmt = $pdo->prepare("INSERT INTO users (id, name, email, password, avatar_url) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), password=VALUES(password), avatar_url=VALUES(avatar_url)");
        foreach($input['team'] as $u) {
            $stmt->execute([$u['id'], $u['name'], $u['email'] ?? '', $u['password'] ?? '', $u['avatarUrl'] ?? '']);
        }
        echo json_encode(["success" => true]);
        break;

    default:
        echo json_encode(["error" => "Acción no válida"]);
}
