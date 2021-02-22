<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$stm = $pdo->prepare('SELECT * FROM Usuarios');
$stm->execute();

if ($stm->rowCount() > 0) {

    $usuarios = $stm->fetchAll(PDO::FETCH_ASSOC);
    echo devolverMensaje($usuarios, 200);
}else
    echo devolverMensaje('No hay usuarios para mostrar', 500);

