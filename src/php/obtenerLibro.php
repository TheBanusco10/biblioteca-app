<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$id = htmlentities($_GET['id']) ?? '';

if (!empty($id)) {


    $stm = $pdo->prepare('SELECT * FROM Libros WHERE idLibro = :idLibro');
    
    $stm->execute(array(
        ':idLibro' => $id
    ));

    $libro = $stm->fetch(PDO::FETCH_ASSOC);

    if ($libro) echo devolverMensaje($libro, 200);
    else echo devolverMensaje('No hemos encontrado el libro que busca', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}