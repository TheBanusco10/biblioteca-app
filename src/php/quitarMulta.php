<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';


if (!empty($idUsuario)) {

    $stm = $pdo->prepare("UPDATE Usuarios SET multaUsuario = 0, multaHasta = NULL WHERE idUsuario = :idUsuario");

    $stm->execute(array(

        ':idUsuario' => $idUsuario

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Multa quitada correctamente', 200);

    }
    else
        echo devolverMensaje('Error al quitar la multa', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}