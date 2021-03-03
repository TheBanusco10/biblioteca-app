<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';

if (!empty($idUsuario)) {

    $stm = $pdo->prepare('SELECT tituloLibro, autorLibro FROM Lista_deseados INNER JOIN Libros ON Libros.idLibro = Lista_deseados.idLibro WHERE idUsuario = :idUsuario');

    $stm->execute(array(

        ':idUsuario' => $idUsuario
    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje($stm->fetchAll(PDO::FETCH_ASSOC), 200);

    }else {
        echo devolverMensaje('Aún no tienes libros en tu lista.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}