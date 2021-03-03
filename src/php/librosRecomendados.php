<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$genero = htmlspecialchars($_POST['genero']) ?? '';
$autor = htmlspecialchars($_POST['autor']) ?? '';

if (!empty($genero) && !empty($autor)) {

    $libros = [];

    $stm = $pdo->prepare('SELECT * FROM Libros WHERE generoLibro LIKE :genero');

    $stm->execute(array(

        ':genero' => "%$genero%"

    ));

    $libros['genero'] = $stm->fetchAll(PDO::FETCH_ASSOC);

    $stm = $pdo->prepare('SELECT * FROM Libros WHERE autorLibro = :autor');

    $stm->execute(array(

        ':autor' => $autor

    ));

    $libros['autor'] = $stm->fetchAll(PDO::FETCH_ASSOC);


    if ($stm->rowCount() > 0) {
        echo devolverMensaje($libros, 200);

    }else {
        echo devolverMensaje('No hay libros con género parecido.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}