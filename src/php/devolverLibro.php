<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idLibro = htmlspecialchars($_GET['idLibro']) ?? '';
$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';


if (!empty($idUsuario) && !empty($idLibro)) {

    $stm = $pdo->prepare("DELETE FROM Libros_prestados WHERE idUsuario = :idUsuario AND idLibro = :idLibro");

    $stm->execute(array(

        ':idUsuario' => $idUsuario,
        ':idLibro' => $idLibro

    ));

    if ($stm->rowCount() > 0) {
        
        $libros = $stm->fetchAll(PDO::FETCH_ASSOC);

        echo devolverMensaje('Libro devuelto correctamente', 200);

    }
    else
        echo devolverMensaje('Ha ocurrido un error al devolver el libro', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}