<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$idLibro = htmlentities($_GET['idLibro']) ?? '';
$idUsuario = htmlentities($_GET['idUsuario']) ?? '';
$comentario = htmlspecialchars($_GET['comentario']) ?? '';

if (!empty($idLibro) && !empty($idUsuario) && !empty($comentario)) {


    $stm = $pdo->prepare("INSERT INTO Comentarios VALUES (:idUsuario, :idLibro, :comentario)");
    
    $stm->execute(array(
        ':idUsuario' => $idUsuario,
        ':idLibro' => $idLibro,
        ':comentario' => $comentario,
    ));

    if ($stm->rowCount() > 0) echo devolverMensaje('Comentario añadido correctamente', 200);
    else echo devolverMensaje('Ha habido un error al añadir el comentario', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}