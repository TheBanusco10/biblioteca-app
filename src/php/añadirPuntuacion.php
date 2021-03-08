<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idLibro = htmlspecialchars($_POST['idLibro']) ?? '';
$idUsuario = htmlspecialchars($_POST['idUsuario']) ?? '';
$puntuacion = htmlspecialchars($_POST['puntuacion']) ?? '';


if (!empty($idLibro) && !empty($idUsuario) && !empty($puntuacion)) {

    $stm = $pdo->prepare('INSERT INTO puntuaciones VALUES (NULL, :idUsuario, :idLibro, :puntuacion)');

    $stm->execute(array(

        ':idUsuario' => $idUsuario,
        ':idLibro' => $idLibro,
        ':puntuacion' => $puntuacion


    ));
    

    if ($stm->rowCount() > 0) {

        $stm = $pdo->query("SELECT AVG(puntuacion) AS 'Media' FROM `puntuaciones` WHERE idLibro = $idLibro");

        $media = (int)$stm->fetch(PDO::FETCH_ASSOC)['Media'];

        $stm = $pdo->prepare('UPDATE Libros SET puntuacionLibro = :media WHERE idLibro = :idLibro');

        $stm->execute(array(

            ':idLibro' => $idLibro,
            ':media' => $media


        ));

        if ($stm->rowCount() > 0)
            echo devolverMensaje('Puntuación añadida correctamente.', 200);
        else
            echo devolverMensaje('Hubo un error al añadir la puntuación.', 500);

    }else {
        echo devolverMensaje('Hubo un error al añadir la puntuación.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}