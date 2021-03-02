<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$tituloLibro = htmlspecialchars($_POST['tituloLibro']) ?? '';
$autorLibro = htmlspecialchars($_POST['autorLibro']) ?? '';
$descripcionLibro = htmlspecialchars($_POST['descripcionLibro']) ?? '';
$puntuacionLibro = htmlspecialchars($_POST['puntuacionLibro']) ?? '';
$generoLibro = htmlspecialchars($_POST['generoLibro']) ?? '';
$imagenLibro = htmlspecialchars($_POST['imagenLibro']) ?? '';



if (!empty($tituloLibro) && !empty($autorLibro) && !empty($descripcionLibro) && !empty($puntuacionLibro) && !empty($generoLibro) && !empty($imagenLibro)) {

    $stm = $pdo->prepare('INSERT INTO Libros VALUES (NULL, :titulo, :autor, :descripcion, :puntuacion, :genero, :imagen)');

    $stm->execute(array(

        ':titulo' => $tituloLibro,
        ':autor' => $autorLibro,
        ':descripcion' => $descripcionLibro,
        ':puntuacion' => $puntuacionLibro,
        ':genero' => $generoLibro,
        ':imagen' => $imagenLibro,


    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Libro añadido correctamente.', 200);

    }else {
        echo devolverMensaje('Error al añadir el libro.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}