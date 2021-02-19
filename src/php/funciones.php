<?php


function devolverMensaje ($message, $status) {
    return json_encode(array(
        'message' => $message,
        'status' => $status
    ));
}

?>