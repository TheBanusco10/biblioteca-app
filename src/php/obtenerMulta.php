<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$idUsuario = htmlentities($_GET['idUsuario']) ?? '';

if (!empty($idUsuario)) {


    $stm = $pdo->prepare('SELECT * FROM Usuarios WHERE idUsuario = :idUsuario');
    
    $stm->execute(array(
        ':idUsuario' => $idUsuario
    ));

    $usuario = $stm->fetch(PDO::FETCH_ASSOC);

    if ($usuario) echo devolverMensaje($usuario, 200);
    else echo devolverMensaje('No hemos encontrado el usuario', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}