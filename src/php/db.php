<?php

$user = 'root';
$password = '';
$db = 'biblioteca';

try {

    $pdo = new PDO("mysql:host=localhost;dbname=$db;charset=utf8", $user, $password);
    
}catch(PDOException $e) {

    echo 'Error al conectar a la base de datos';

}