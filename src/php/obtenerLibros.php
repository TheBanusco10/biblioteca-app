<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$stm = $pdo->query('SELECT * FROM Libros ORDER BY idLibro DESC');
$stm->execute();

$libros = $stm->fetchAll(PDO::FETCH_ASSOC);

if (sizeof($libros) > 0) echo devolverMensaje($libros, 200);
else echo devolverMensaje('No hay libros para mostrar', 500);

