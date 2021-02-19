<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$id = htmlentities($_GET['id']) ?? '';

if (!empty($id)) {


    $stm = $pdo->prepare("SELECT emailUsuario, comentario FROM Comentarios INNER JOIN Libros ON Comentarios.idLibro = Libros.idLibro INNER JOIN Usuarios ON Comentarios.idUsuario = Usuarios.idUsuario WHERE Comentarios.idLibro = :idLibro");
    
    $stm->execute(array(
        ':idLibro' => $id
    ));

    $comentarios = $stm->fetchAll(PDO::FETCH_ASSOC);

    if ($comentarios) echo devolverMensaje($comentarios, 200);
    else echo devolverMensaje('Aún no hay comentarios, anímate a dejar uno :)', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}