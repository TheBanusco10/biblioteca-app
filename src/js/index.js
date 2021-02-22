// TODO Mostrar modal como alerta para las acciones.

const PHP_BASE = '../src/php/';

let idLibro;

let usuario;

let multaPagada = false;

let libros = [];

if (window.localStorage.usuario) usuario = JSON.parse(window.localStorage.usuario);
else {
    window.localStorage.setItem('usuario', JSON.stringify(usuario = {
        email: 'Invitado',
        rol: 'usuario'
    }));
}

$(function () {

    $('#alertas').hide();

    obtenerLibros();
    obtenerLibrosPrestados();

    administrarMulta();
    obtenerMulta();


    // Cambiamos las acciones del header según el usuario y comprobamos el comportamiento.
    $('#usuario').text(usuario.email);

    if (usuario.email == 'Invitado') {

        $('#cerrarSesion').remove();
        $('#entradaTexto').show();

    }else $('#entradaTexto').remove();

    usuario.rol == 'bibliotecario' ? '' : $('#headerAcciones').remove();

    $('#cerrarSesion').click(function () {
        cerrarSesion();
    })
    /******************/

    $('#inputBusqueda').keyup(function() {
        buscarLibro($(this).val());
    })
    
    $('#libros').on('click', '.botonEliminar', function () {

        idLibro = $(this).data('id');
        
        
    });

    $('#libros').on('click', '.botonTomarPrestado', function() {

        idLibro = $(this).data('id');

        console.log('Tomando prestado');

        tomarPrestado(idLibro);

    });

    $('#librosPrestados').on('click', '.botonDevolverLibro', function() {

        idLibro = $(this).data('id');

        devolverLibro(idLibro);

    });

    $('#confirmarEliminarLibro').click(function (e) {
        if (e.target.id === '#eliminarLibro') {
            eliminarLibro(idLibro);
        }
    })

    $('#confirmarAñadirLibro').click(function () {

        añadirLibro();

    });

    $('#alertas').on('click', '#pagarMulta', function () {

        multaPagada = true;
        obtenerMulta();
    
    });

    $('#eliminarUsuarioBoton').click(function () {
        mostrarUsuarios();
    });
    
});

