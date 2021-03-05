<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$email = htmlspecialchars($_POST['email']) ?? '';
$password = htmlspecialchars($_POST['password']) ?? '';
$tipo = htmlspecialchars($_POST['tipo']) ?? 'usuario';

if (!isset($_POST['tipo'])) $tipo = 'usuario';


if (!empty($email) && !empty($password)) {

    $stm = $pdo->prepare('INSERT INTO Usuarios VALUES (NULL, :email, :passwordUser, :tipo, 0, NULL)');

    $stm->execute(array(

        ':email' => $email,
        ':passwordUser' => $password,
        ':tipo' => $tipo

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Usuario creado correctamente', 200);

    }else {
        echo devolverMensaje('Error al crear el usuario', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}