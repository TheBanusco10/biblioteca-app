<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';


if (!empty($idUsuario)) {

    $actual = date('Y-m-d');
    $fechaMulta = date("Y-m-d", strtotime ($actual . "+ 1 weeks"));

    $stm = $pdo->prepare("UPDATE Usuarios SET multaUsuario = :multaUsuario, multaHasta = :multaHasta WHERE idUsuario = :idUsuario");

    $stm->execute(array(

        ':multaUsuario' => 1,
        ':multaHasta' => $fechaMulta,
        ':idUsuario' => $idUsuario

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Multa añadida', 200);

    }
    else
        echo devolverMensaje('Error al poner la multa', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}