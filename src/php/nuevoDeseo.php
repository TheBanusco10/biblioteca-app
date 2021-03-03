<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idLibro = htmlspecialchars($_POST['idLibro']) ?? '';
$idUsuario = htmlspecialchars($_POST['idUsuario']) ?? '';



if (!empty($idLibro) && !empty($idUsuario)) {

    $stm = $pdo->prepare('INSERT INTO Lista_deseados VALUES (:idUsuario, :idLibro)');

    $stm->execute(array(

        ':idUsuario' => $idUsuario,
        ':idLibro' => $idLibro,


    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Libro en tu lista de deseados.', 200);

    }else {
        echo devolverMensaje('Error al añadir el libro a la lista de deseados.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}