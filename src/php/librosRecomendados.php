<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$genero = htmlspecialchars($_POST['genero']) ?? '';



if (!empty($genero)) {

    $stm = $pdo->prepare('SELECT * FROM Libros WHERE generoLibro LIKE :genero LIMIT 3');

    $stm->execute(array(

        ':genero' => "%$genero%"


    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje($stm->fetchAll(PDO::FETCH_ASSOC), 200);

    }else {
        echo devolverMensaje('No hay libros con género parecido.', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}