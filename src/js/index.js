// TODO Mostrar modal como alerta para las acciones.
// TODO Si la fecha de un libro se ha pasado, mostrar la fila de color rojo.

const PHP_BASE = '../src/php/';

let idLibro;

let usuario;

let multaPagada = false;

if (window.localStorage.usuario) usuario = JSON.parse(window.localStorage.usuario);
else {
    window.localStorage.setItem('usuario', JSON.stringify(usuario = {
        email: 'Invitado',
        rol: 'usuario'
    }));
}

$(function () {


    obtenerLibros();
    obtenerLibrosPrestados();

    administrarMulta();
    obtenerMulta();

    $('#usuario').text(usuario.email);

    usuario.email == 'Invitado' ? $('#entradaTexto').show() : $('#entradaTexto').hide();
    
    $('#libros').on('click', '.botonEliminar', function () {

        idLibro = $(this).data('id');
        
        
    });

    $('#libros').on('click', '.botonTomarPrestado', function() {

        idLibro = $(this).data('id');

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
    
});

function obtenerLibros() {

    $.get(`${PHP_BASE}obtenerLibros.php`, function(data) {
        
        if (data.status === 200) {


            
            let contenido = '';

            data.message.forEach(({tituloLibro, descripcionLibro, idLibro, imagenLibro}) => {


                contenido += `

                    <article class="tarjeta">
                    <div class="imagen">
                    <img src="${imagenLibro}" alt="${tituloLibro}">
                    </div>
                    <div class="texto">
                    <p class="titulo">${tituloLibro}</p>
                    <p class="descripcion">${acortarTexto(descripcionLibro, 70)}...</p>
                    <p class="acciones">
                        <a class="btn" href="verLibro.html?id=${idLibro}" title="Ver libro">
                        <i class="fas fa-eye"></i>
                    </a>
    
                    <button class="btn botonEliminar" data-toggle="modal" data-id="${idLibro}" data-target="#confirmarEliminarLibro">
                        <i class="fas fa-trash"></i>
                    </button>
    
                    <button class="btn botonTomarPrestado" name="${tituloLibro}" data-id="${idLibro}" title="Tomar prestado">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                    </p>
                    </div>
                </article>

                `;

            });

            $('#libros').html(`${contenido}`);

            if (usuario.rol == 'usuario') {
                $('.botonEliminar').each(function () {
                    $(this).remove();
                });
            }

            if (usuario.email == 'Invitado') {
                $('.botonTomarPrestado').each(function () {
                    $(this).remove();
                });
            }

            $('.spinner-border').hide();
        
        }else {

            $('#libros').html('<h3>No hay libros para mostrar en estos momentos.</h3>');

        }


    });

}

function eliminarLibro(id) {

    $.get(`${PHP_BASE}eliminarLibro.php`, {idLibro: id}, function(data) {


        if (data.status == 200) window.location.reload();
        else alert('Error al borrar');


    });

}

function añadirLibro() {

    let titulo = $('#tituloLibroInput').val();
    let autor = $('#autorLibroInput').val();
    let descripcion = $('#descripcionLibroInput').val();
    let puntuacion = $('#puntuacionLibroInput').val();
    let genero = $('#generoLibroInput').val();
    let imagen = $('#imagenLibroInput').val();

    $.post(`${PHP_BASE}insertarLibro.php`, {tituloLibro: titulo, autorLibro: autor, descripcionLibro: descripcion, puntuacionLibro: puntuacion, generoLibro: genero, imagenLibro: imagen}, function(data) {


        if (data.status === 200) {

            alert('Libro añadido correctamente');
            window.location.reload();

        }

    });

}

function obtenerLibrosPrestados() {


    $.get(`${PHP_BASE}obtenerLibrosPrestados.php`, {idUsuario: usuario.id}, function(data) {


        if (data.status === 200) {

            let tabla = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Devolver antes de</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                <tbody>
            `;

            data.message.forEach(element => {
                
                tabla += `<tr>
                    <td><a href="../verLibro.html?id=${element.idLibro}" >${element.tituloLibro}</a></td>
                    <td>${element.fechaDevolver} (${getDiasRestantes(new Date(element.fechaDevolver))} días)</td>
                    <td>
                        <button class="btn botonDevolverLibro" data-tituloLibro="${element.tituloLibro}" data-id="${element.idLibro}">
                            <i class="fas fa-arrow-circle-right"></i>
                        </button>
                    </td>
                    
                    `;

                // Si el usuario tiene ya el libro, no le saldrá la opción de tomarlo de nuevo
                $('.botonTomarPrestado').each(function () {

                    if ($(this).attr('name') == element.tituloLibro) $(this).remove();

                })

            });

            tabla += `</tbody>
            </table>`;

            $('#librosPrestados').html(tabla);

        }else if (usuario.email == 'Invitado') {
            $('#librosPrestados').html(`<p>Inicia sesión para empezar a añadir libros a tu biblioteca.</p>`);
        }
        else {

            $('#librosPrestados').html(`<p>${data.message}</p>`);

        }


    });

}

function tomarPrestado(idLibro) {

    $.get(`${PHP_BASE}prestarLibro.php`, {idUsuario: usuario.id, idLibro: idLibro}, function(data) {

        if (data.status == 200) {

            window.location.reload();

        }

    });

}

function devolverLibro(idLibro) {

    $.get(`${PHP_BASE}devolverLibro.php`, {idUsuario: usuario.id, idLibro: idLibro}, function(data) {
    
        if (data.status == 200) {
        
            alert(data.message);

            window.location.reload();

        }


    });

}

/**
 * @description Comprobamos si el usuario se ha pasado del límite de fecha para devolver el libro.
 * Si es así, le ponemos una multa.
 */
function administrarMulta() {

    $.get(`${PHP_BASE}obtenerLibrosPrestados.php`, {idUsuario: usuario.id}, function(data) {

        if (data.status == 200) {

            let libros = data.message;

            let actual = new Date();
            let tieneMulta = false;

            // Comprobamos si el usuario se ha pasado de fecha en alguno de los libros.
            libros.forEach(({fechaDevolver}) => {
                let libro = new Date(fechaDevolver);

                if ( (libro < actual) && !tieneMulta ) {
                    ponerMulta();
                    tieneMulta = true;
                }
            });

        }

    });

}

/**
 * @description Ponemos una multa al usuario
 */
function ponerMulta() {

    $.get(`${PHP_BASE}ponerMulta.php`, {idUsuario: usuario.id}, function(data) {

        if (data.status == 200) {

            alert('Usted tiene una multa');
            window.location.reload();

        }

    });

}

// TODO Formulario de pago para quitar la multa.

/**
 * @description Comprobamos si el usuario tiene una multa
 */
function obtenerMulta() {

    $.get(`${PHP_BASE}obtenerMulta.php`, {idUsuario: usuario.id}, function(data) {

        let {multaHasta, multaUsuario} = data.message;

        // Si el usuario tiene una multa: Comprobamos si la fecha ha pasado o si ha pagado.
        // Si no es así, mostramos una alerta al usuario con la multa
        if (multaUsuario == 1){

            let fechaActual = new Date();
            let fechaMulta = new Date(multaHasta);

            if (fechaActual >= fechaMulta || multaPagada) {

                $.get(`${PHP_BASE}quitarMulta.php`, {idUsuario: usuario.id}, function(data) {

                    if (data.status == 200) {
                        alert('Multa quitada');
                        window.location.reload();
                    }

                })

            }else {
                $('#alertas').show();
                $('#alerta').html(`Tiene una multa por pasarse el plazo para devolver un libro. Su cuenta queda restringida y no podrá tomar prestados más libros hasta la fecha ${multaHasta} o hasta que no pague 10€. <button class="btn btn-warning" id="pagarMulta">Pagar</button>`);
            }

        }
        else
            $('#alertas').hide();

    });

}

function acortarTexto(texto, longitud){
    var cut= texto.indexOf(' ', longitud);
    if(cut== -1) return texto;
    return texto.substring(0, cut)
}