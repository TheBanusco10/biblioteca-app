<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$email = htmlspecialchars($_POST['email']) ?? '';
$password = htmlspecialchars($_POST['password']) ?? '';


if (!empty($email) && !empty($password)) {

    $stm = $pdo->prepare('SELECT * FROM Usuarios WHERE emailUsuario = :emailUsuario');

    $stm->execute(array(

        ':emailUsuario' => $email

    ));

    if ($stm->rowCount() > 0) {
        
        $usuario = $stm->fetch(PDO::FETCH_ASSOC);

        if ($usuario['passwordUsuario'] === $password)
            echo devolverMensaje($usuario, 200);
        else
            echo devolverMensaje('Usuario no encontrado', 500);

    }
    else
        echo devolverMensaje('Usuario no encontrado', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}