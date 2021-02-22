<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$idUsuario = htmlentities($_POST['idUsuario']) ?? '';

if (!empty($idUsuario)) {


    $stm = $pdo->prepare("DELETE FROM Usuarios WHERE idUsuario = :idUsuario");
    
    $stm->execute(array(
        ':idUsuario' => $idUsuario
    ));

    if ($stm->rowCount() > 0) echo devolverMensaje('Usuario eliminado correctamente', 200);
    else echo devolverMensaje('Ha habido un error al eliminar el usuario', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}