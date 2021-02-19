<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$email = htmlspecialchars($_POST['email']) ?? '';
$password = htmlspecialchars($_POST['password']) ?? '';


if (!empty($email) && !empty($password)) {

    $stm = $pdo->prepare('INSERT INTO Usuarios VALUES (NULL, :email, :passwordUser, "usuario", 0)');

    $stm->execute(array(

        ':email' => $email,
        ':passwordUser' => $password

    ));

    if ($stm->rowCount() > 0) {
        echo devolverMensaje('Usuario creado correctamente', 200);

    }else {
        echo devolverMensaje('Error al crear el usuario', 500);
    }

}else {
    echo devolverMensaje('Campos vacíos', 500);
}