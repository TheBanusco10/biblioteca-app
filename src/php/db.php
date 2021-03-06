<?php

$user = 'root';
$password = '';

try {

    $pdo = new PDO('mysql:host=localhost;dbname=prueba;charset=utf8', $user, $password);
    
}catch(PDOException $e) {

    echo 'Error al conectar a la base de datos';

}