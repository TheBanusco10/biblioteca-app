<?php

$user = 'root';
$password = 'root';

try {

    $pdo = new PDO('mysql:host=localhost;dbname=biblioteca;charset=utf8', $user, $password);
    
}catch(PDOException $e) {

    echo 'Error al conectar a la base de datos';

}