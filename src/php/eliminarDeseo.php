<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$idLibro = htmlentities($_GET['idLibro']) ?? '';

if (!empty($idLibro)) {


    $stm = $pdo->prepare("DELETE FROM Lista_deseados WHERE idLibro = :idLibro");
    
    $stm->execute(array(
        ':idLibro' => $idLibro
    ));

    if ($stm->rowCount() > 0) echo devolverMensaje('Libro quitado de tu lista correctamente.', 200);
    else echo devolverMensaje('Ha habido un error al quitar el libro.', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}