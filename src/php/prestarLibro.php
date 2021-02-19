<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idLibro = htmlspecialchars($_GET['idLibro']) ?? '';
$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';


if (!empty($idUsuario) && !empty($idLibro)) {

    $actual = date('Y-m-d');
    $fechaDevolver = date("Y-m-d", strtotime ($actual . "+ 1 weeks"));

    $stm = $pdo->prepare("INSERT INTO Libros_prestados VALUES (:idUsuario, :idLibro, :fechaDevolver)");

    $stm->execute(array(

        ':idUsuario' => $idUsuario,
        ':idLibro' => $idLibro,
        ':fechaDevolver' => $fechaDevolver

    ));

    if ($stm->rowCount() > 0) {
        
        $libros = $stm->fetchAll(PDO::FETCH_ASSOC);

        echo devolverMensaje('Libro en tu biblioteca virtual', 200);

    }
    else
        echo devolverMensaje('Ha ocurrido un error al tomar prestado el libro', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}