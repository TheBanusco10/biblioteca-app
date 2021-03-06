let idLibro;
let usuario;

let multaPagada = false;
let tieneMulta = false;

let libros = [];


if (window.localStorage.usuario) usuario = JSON.parse(window.localStorage.usuario);
else {
    window.localStorage.setItem('usuario', JSON.stringify(usuario = {
        email: 'Invitado',
        rol: 'usuario'
    }));
}

$(function () {

    $('[data-toggle="tooltip"]').tooltip();

    $('#alertaInicio').hide();

    $('#alertas').hide();

    administrarMulta();
    
    obtenerLibros();
    obtenerMulta();

    // Cambiamos las acciones del header según el usuario y comprobamos el comportamiento.
    $('#usuario').text('Bienvenido/a, ' + usuario.email);

    if (usuario.email == 'Invitado') {

        $('#cerrarSesion').remove();
        $('#entradaTexto').show();

    }else $('#entradaTexto').remove();

    usuario.rol == 'bibliotecario' ? '' : $('#headerAcciones').remove();

    $('#cerrarSesion').click(function () {
        cerrarSesion();
    })
    /******************/

    $('#tipoBusqueda').change(function () {
        switch($(this).val()) {

            case 'Genero':
                $('#inputBusqueda').attr('placeholder', 'Drama|Misterio|...');
                break;
            case 'Autor':
            $('#inputBusqueda').attr('placeholder', 'David Jiménez');
            break;
            case 'Puntuacion':
                $('#inputBusqueda').attr('placeholder', '0, 1, 2 ... 10');
                break;

            default:
                $('#inputBusqueda').attr('placeholder', 'Palabras ordenadas...');
                break;

        }
    });

    // Cuando termina la animación activamos el focus del input de búsqueda
    setTimeout(() => {

        $('#inputBusqueda').focus();

    }, 2000);

    $('#inputBusqueda').keyup(function() {

        buscarLibro($(this).val());
    })
    
    $('#libros').on('click', '.botonEliminar', function () {

        idLibro = $(this).data('id');
        
        
    });

    $(document).on('click', '.botonTomarPrestado', function() {

        idLibro = $(this).data('id');

        tomarPrestado(idLibro);

    });

    $('#libros').on('click', '.botonListaDeseados', function() {

        idLibro = $(this).data('id');
        
        añadirListaDeseados(idLibro, usuario.id);

    });

    $('#librosDeseados').on('click', '.botonQuitarListaDeseados', function() {

        idLibro = $(this).data('id');

        console.log('click');
        
        quitarLibroDeseado(idLibro);

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

    $('#confirmarAñadirUsuario').click(function () {

        añadirUsuario();

    });

    $('#realizarCompra').click (function () {
        
        multaPagada = true;
        obtenerMulta();
    
    });

    $('#eliminarUsuarioBoton').click(function () {
        mostrarUsuarios();
    });
    
});

