const fs = require('fs');
let content = fs.readFileSync('public/api.php', 'utf8');

const uploadCase = `
    case 'upload_avatar':
        if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(["error" => "Error al subir la imagen"]);
            break;
        }
        $userId = $_POST['userId'] ?? 'unknown';
        $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
        $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array(strtolower($ext), $allowed)) {
            echo json_encode(["error" => "Formato no válido"]);
            break;
        }
        $uploadDir = __DIR__ . '/avatars/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $filename = "avatar_" . $userId . "_" . time() . "." . $ext;
        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadDir . $filename)) {
            echo json_encode(["success" => true, "url" => "/avatars/" . $filename]);
        } else {
            echo json_encode(["error" => "No se pudo guardar la imagen"]);
        }
        break;
`;

content = content.replace(/switch\(\$action\) \{/, "switch($action) {\n" + uploadCase);
fs.writeFileSync('public/api.php', content);
