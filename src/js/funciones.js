const PHP_BASE = '../src/php/';

function getDiasRestantes(fecha) {

    let actual = new Date();  
    
    // To calculate the time difference of two dates 
    let Difference_In_Time = fecha.getTime() - actual.getTime(); 
    
    // To calculate the no. of days between two dates 
    return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
}

function cerrarSesion() {

    window.localStorage.removeItem('usuario');
    window.location = 'entrada.html';

}

function acortarTexto(s, n){
    var cut= s.indexOf(' ', n);
    if(cut== -1) return s;
    return s.substring(0, cut)
}

function obtenerLibros() {

    $.get(`${PHP_BASE}obtenerLibros.php`, function(data) {
        
        if (data.status === 200) {
            
            let contenido = '';

            data.message.forEach(({tituloLibro, descripcionLibro, idLibro, imagenLibro, generoLibro, puntuacionLibro, autorLibro, stockLibro}) => {

                // let botonTomarPrestado = stockLibro > 0 ? `
                
                // <button class="btn botonTomarPrestado" name="${tituloLibro}" data-id="${idLibro}" title="Tomar prestado">
                //     <i class="fas fa-shopping-bag"></i>
                // </button>
                
                
                // `
                // :
                // `
                // <button class="btn botonListaDeseados" name="${tituloLibro}" data-id="${idLibro}" title="Añadir a tu lista de deseos">
                //     <i class="far fa-star"></i>
                // </button>

                // `;

                contenido += `

                <a href="verLibro.html?id=${idLibro}" target="_blank" class="article">
                <article class="tarjeta" id="${idLibro}" data-genero="${generoLibro}" data-autor="${autorLibro}" data-puntuacion="${puntuacionLibro}">
                    <div class="imagen">
                    <img src="${imagenLibro}" alt="${tituloLibro}">
                    <div class="puntuacionLibro">
                        <p>${puntuacionLibro}</p>
                    </div>
                    </div>
                    <div class="texto">
                    <p class="titulo">${tituloLibro}</p>
                    <p class="descripcion">${acortarTexto(descripcionLibro, 70)}...</p>
                    <p class="acciones">
                        <a class="btn" href="verLibro.html?id=${idLibro}" title="Ver libro">
                        <i class="fas fa-eye"></i>
                        </a>
    
                    <button class="btn botonEliminar" title="Eliminar libro" data-toggle="modal" data-id="${idLibro}" data-target="#confirmarEliminarLibro">
                        <i class="fas fa-trash"></i>
                    </button>
    
                    <button class="btn botonTomarPrestado" name="${tituloLibro}" data-id="${idLibro}" title="Tomar prestado">
                        <i class="fas fa-shopping-bag"></i>
                    </button>

                    <button class="btn botonListaDeseados" name="${tituloLibro}" data-id="${idLibro}" title="Añadir a tu lista de deseos">
                        <i class="far fa-star"></i>
                    </button>
                    </p>
                    </div>
                    </article>
                    </a>

                `;

                
            });
            
            $('#libros').html(contenido);

            if (usuario.rol == 'usuario') {
                $('.botonEliminar').remove();
            }

            if (usuario.email == 'Invitado') {
                $('.botonTomarPrestado').remove();
            }

            $('.spinner-border').hide();
        
        }else {

            $('#libros').html('<h3>No hay libros para mostrar en estos momentos.</h3>');

        }

        if(!usuario.id) {
            $('.tarjeta').each(function() {
                guardarLibro($(this), $(this).find('.acciones')[0].outerHTML);
            });
        }

        // Obtenemos estos libros aquí para forzar a que se ejecute justo después de cargar el contenido en el html
        obtenerLibrosPrestados();
        obtenerListaDeseados();
        

    });

}

function eliminarLibro(id) {

    $.get(`${PHP_BASE}eliminarLibro.php`, {idLibro: id}, function(data) {


        if (data.status == 200) {

            guardarAlerta(data.message);

            window.location.reload();
        }


    });

}

function añadirLibro() {

    $('.btn').prop('disabled', true);

    let titulo = $('#tituloLibroInput').val();
    let autor = $('#autorLibroInput').val();
    let descripcion = $('#descripcionLibroInput').val();
    let puntuacion = $('#puntuacionLibroInput').val();
    let genero = $('#generoLibroInput').val();
    let imagen = $('#imagenLibroInput').val();

    $.post(`${PHP_BASE}insertarLibro.php`, {tituloLibro: titulo, autorLibro: autor, descripcionLibro: descripcion, puntuacionLibro: puntuacion, generoLibro: genero, imagenLibro: imagen}, function(data) {

        $('.btn').prop('disabled', false);

        guardarAlerta(data.message);

        window.location.reload();



    });

}

function obtenerLibrosPrestados() {

    if (usuario.id) {

        $.get(`${PHP_BASE}obtenerLibrosPrestados.php`, {idUsuario: usuario.id}, function(data) {
    
    
            if (data.status === 200) {
    
                let tabla = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Devolver antes de</th>
                                <th scope="col">Devolver libro</th>
                            </tr>
                        </thead>
                    <tbody>
                `;
    
                data.message.forEach(element => {
    
                    let colorFila = '';
    
                    if (getDiasRestantes(new Date(element.fechaDevolver)) < 3 && getDiasRestantes(new Date(element.fechaDevolver)) > 1) colorFila = 'bg-warning';
                    else if (getDiasRestantes(new Date(element.fechaDevolver)) < 1) colorFila = 'bg-danger-devolverLibro';
                    
                    tabla += `<tr class="${colorFila}">
                        <td><a href="../verLibro.html?id=${element.idLibro}" >${element.tituloLibro}</a></td>
                        <td>${element.fechaDevolver} (${getDiasRestantes(new Date(element.fechaDevolver))} días)</td>
                        <td>
                            <button class="btn botonDevolverLibro" data-tituloLibro="${element.tituloLibro}" data-id="${element.idLibro}" title="Devolver libro">
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

                $('#tusLibrosBadge').text(data.message.length);

    
            }else {
    
                $('#librosPrestados').html(`<p>${data.message}.</p>`);
                $('#pagarMulta').prop('disabled', false);

    
            }
    
    
        });
    
    }else $('#librosPrestados').html(`<p>Inicia sesión para empezar a añadir libros a tu biblioteca.</p>`);


}

function tomarPrestado(idLibro) {

    $.get(`${PHP_BASE}prestarLibro.php`, {idUsuario: usuario.id, idLibro: idLibro}, function(data) {

        
        guardarAlerta(data.message);
        window.location.reload()

    });

}

function devolverLibro(idLibro) {

    $.get(`${PHP_BASE}devolverLibro.php`, {idUsuario: usuario.id, idLibro: idLibro}, function(data) {
    
        if (data.status == 200) {
        
            window.location.href = 'index.html#tusLibrosMenu';
            window.location.reload();
            
        }
        
        guardarAlerta(data.message);

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

            $.get(`${PHP_BASE}obtenerFecha.php`, function(data) {
                
                let actual = new Date(data);
    
                // Comprobamos si el usuario se ha pasado de fecha en alguno de los libros.
                libros.forEach(({fechaDevolver}) => {
                    let fechaLibro = new Date(fechaDevolver);
    
                    if ( (fechaLibro < actual) && !tieneMulta ) {
                        ponerMulta();
                        tieneMulta = true;
                    }
                });
            })


        }

    });

}

/**
 * @description Ponemos una multa al usuario
 */
function ponerMulta() {

    $.get(`${PHP_BASE}ponerMulta.php`, {idUsuario: usuario.id}, function(data) {

        if (data.status == 200) {

            guardarAlerta('Usted tiene una multa por no devolver un libro');
            window.location.reload();

        }

    });

}

/**
 * @description Comprobamos si el usuario tiene una multa
 */
function obtenerMulta() {

    $.get(`${PHP_BASE}obtenerMulta.php`, {idUsuario: usuario.id}, function(data) {
        
        let {multaHasta, multaUsuario} = data.message;

        // Si el usuario tiene una multa: Comprobamos si la fecha ha pasado o si ha pagado.
        // Si no es así, mostramos una alerta al usuario con la multa
        if (multaUsuario == 1){

            $.get(`${PHP_BASE}obtenerFecha.php`, function(data) {

                let fechaActual = new Date(data);
                let fechaMulta = new Date(multaHasta);
    
                if (fechaActual >= fechaMulta || multaPagada) {
    
                    $.get(`${PHP_BASE}quitarMulta.php`, {idUsuario: usuario.id}, function(data) {
    
                        if (data.status == 200) {
                            guardarAlerta(data.message);
                            window.location.reload();
                        }
    
                    })
    
                }else {
                    $('#alertas').show();
                    $('#alerta').html(`
                    
                    IMPORTANTE: Antes de pagar DEBE DEVOLVER TODOS los libros que estén PASADOS DE FECHA. <br />
                    
                    Tiene una multa por pasarse el plazo para devolver un libro. Su cuenta queda restringida y no podrá tomar prestados más libros hasta la fecha ${multaHasta} o hasta que no pague 10€. <button class="btn btn-warning" data-toggle="modal" data-target="#pagarMultaModal" data-toggle="tooltip" data-placement="right" title="Primero debe devolver todos los libros pasados de fecha" id="pagarMulta">Pagar</button>`);
                    $('.botonTomarPrestado').remove();
                }
            });

        }
        else
            $('#alertas').hide();


    });

}

function añadirListaDeseados(idLibro) {

    $.post(`${PHP_BASE}nuevoDeseo.php`, {idLibro: idLibro, idUsuario: usuario.id}, function(data) {

        guardarAlerta(data.message);
        window.location.reload();

    });

}

function obtenerListaDeseados() {

    if (usuario.id) {

        $.get(`${PHP_BASE}obtenerDeseados.php`, {idUsuario: usuario.id}, function(data) {
    
    
            if (data.status === 200) {
    
                let tabla = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                    <tbody>
                `;
    
                data.message.forEach(element => {
    
                    tabla += `<tr class="deseadosFila">
                        <td><a href="../verLibro.html?id=${element.idLibro}" name="${element.tituloLibro}">${element.tituloLibro}</a></td>
                        <td>${element.autorLibro}</td>
                        <td class="accionesDeseados">
                            <button class="btn botonQuitarListaDeseados" data-id="${element.idLibro}" title="Quitar de la lista de deseados">
                            
                                <i class="far fa-window-close"></i>

                            </button>
                        </td>
                        
                        `;
    
                    // Si el usuario tiene ya el libro en su lista, no le saldrá la opción de nuevo
                    $('.botonListaDeseados').each(function () {
    
                        if ($(this).attr('name') == element.tituloLibro) {

                            $(this).removeClass('botonListaDeseados');
                            $(this).addClass('enLista');
                            $(this).attr('title', 'Ya está en tu lista de deseados');

                            $(this).html('<i class="fas fa-star"></i>');

                        }
    
                    })
    
                });
    
                tabla += `</tbody>
                </table>`;
    
                $('#librosDeseados').html(tabla);

                $('#listaDeseadosBadge').text(data.message.length);

                let librosDisponibles = data.message.filter(element => element.stockLibro > 0);
                let alerta = '';
                librosDisponibles.forEach(element => {
                    
                    $('.deseadosFila').each(function () {

                        if ($(this).find('a').attr('name') == element.tituloLibro) {
                            $(this).find('.accionesDeseados').append(`
                                <button class="btn botonTomarPrestado" name="${element.tituloLibro}" data-id="${element.idLibro}" title="Tomar prestado">
                                    <i class="fas fa-shopping-bag"></i>
                                </button>
                            `);
                    
                        }
                    })
                    alerta += `<p>${element.tituloLibro}</p>`;

                });

                if (librosDisponibles.length != 0) {
                    guardarAlerta(`Los siguientes libros están disponibles: ${alerta}`);
                }


                
            }else {
                $('#librosDeseados').text(data.message);
            }
            
            $('.tarjeta').each(function () {
                guardarLibro($(this), $(this).find('.acciones')[0].outerHTML);
    
            });

            let alerta = comprobarAlerta();
            if (alerta) {
                mostrarAlerta(alerta);
            }
    
        });
    
    }else {
        $('.botonListaDeseados').remove();
        $('#librosDeseados').html(`<p>Inicia sesión para empezar a añadir libros a tu lista de deseados.</p>`);
    } 


}

/**
 * 
 * @param {*} thisObj 
 * @param {String} acciones Párrafo con las acciones de cada tarjeta
 */
function guardarLibro(thisObj, acciones) {

    let libro = {
        idLibro: thisObj.attr('id'),
        tituloLibro: thisObj.find('.titulo').text(),
        imagenLibro: thisObj.find('img').attr('src'),
        descripcionLibro: thisObj.find('.descripcion').text(),
        generoLibro: thisObj.data('genero'),
        autorLibro: thisObj.data('autor'),
        puntuacionLibro: thisObj.data('puntuacion'),
        acciones: acciones

    }

    libros.push(libro);

}

function buscarLibro(libro) {

    let tipoBusqueda = $('#tipoBusqueda').val();

    let librosResultado = [];
    
    let buscar = true;

    switch(tipoBusqueda) {

        case 'Titulo':
            librosResultado = librosCoincidentes('tituloLibro', libro);
            break;

        case 'Genero':
            librosResultado = librosCoincidentes('generoLibro', libro);
            break;

        case 'Autor':
            librosResultado = librosCoincidentes('autorLibro', libro);
            break;

        case 'Puntuacion':
            librosResultado = librosCoincidentes('puntuacionLibro', libro, true);
            break;

        default:
            buscar = false;
            break;
    }

    if (buscar) {

        let resultado = librosResultado.map(({tituloLibro, generoLibro, autorLibro, descripcionLibro, idLibro, imagenLibro, acciones, puntuacionLibro}) => {
    
            return `
    
            <a href="verLibro.html?id=${idLibro}" target="_blank" class="article">
            <article class="tarjeta" id="${idLibro}" data-genero="${generoLibro}" data-autor="${autorLibro}" data-puntuacion="${puntuacionLibro}">
                <div class="imagen">
                <img src="${imagenLibro}" alt="${tituloLibro}">
                <div class="puntuacionLibro">
                    <p>${puntuacionLibro}</p>
                </div>
                </div>
                <div class="texto">
                <p class="titulo">${tituloLibro}</p>
                <p class="descripcion">${acortarTexto(descripcionLibro, 70)}...</p>
                ${acciones}
                </div>
                </article>
                </a>


    
            `;
    
        }).join('');
    
        $('#libros').html(resultado);

        quitarBotones();
    }
    

}

/**
 * 
 * @param {String} busqueda tituloLibro, generoLibro, autorLibro, puntuacionLibro
 * @param {String} libro Valor para buscar
 * @param {Boolean} puntuacion Si se va a buscar por puntuación
 * @returns {Array} Libros que coincidan
 */
function librosCoincidentes(busqueda, libro, puntuacion = false) {

    // Comprobamos si se busca por puntuación para que no de problemas el toLowerCase()
    if (puntuacion)
        return libros.filter(element => element[busqueda] >= libro);
    else
        return libros.filter(element => element[busqueda].toLowerCase().includes(libro.toLowerCase()));


}

function mostrarUsuarios() {

    $.get(`${PHP_BASE}obtenerUsuarios.php`, function(data) {

        if (data.status == 200) {

            let contenido = data.message.map(({emailUsuario, rolUsuario, idUsuario}) => {
                return `
                
                <tr>
                    <td>${emailUsuario}</td>
                    <td>${rolUsuario}</td>
                    <td>

                        <button class="btn" onclick="eliminarUsuario(${idUsuario})">
                        <i class="fas fa-trash"></i>
                        </button>
                    
                    </td>
                </tr>
                
                `;
            }).join('');

            $('#usuarios').html(`
            

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${contenido}
                    </tbody>
                </table>

            
            `);

        }

    });

}

function eliminarUsuario(idUsuario) {

    $.post(`${PHP_BASE}eliminarUsuario.php`, {idUsuario: idUsuario}, function(data) {

        guardarAlerta(data.message);
        window.location.reload();

    });

}

function añadirUsuario() {

    let tipo = $('label.active > input').attr('id');

    $.post(`${PHP_BASE}nuevoUsuario.php`, {email: $('#emailInput').val(), password: $('#contraseñaInput').val(), tipo: tipo}, function(data) {


        guardarAlerta(data.message);
        window.location.reload();

    });

}

function quitarLibroDeseado(idLibro) {

    $.get(`${PHP_BASE}eliminarDeseo.php`, {idLibro: idLibro}, function(data) {

        guardarAlerta(data.message);
        window.location.reload();
        
    })

}

function guardarAlerta(mensaje) {

    window.localStorage.setItem('alerta', JSON.stringify({
        mensaje: mensaje
    }));
}

function mostrarAlerta(alerta) {

    $('#alertaInicio').find('#alertaTexto').append(alerta.mensaje);
    $('#alertaInicio').show();
    window.localStorage.removeItem('alerta');

    // Tras 10 segundos la alerta se quita sola
    setTimeout(function() {
        $("#alertaInicio").alert('close');
    }, 10000);

}

function comprobarAlerta() {

    if (window.localStorage.alerta) return JSON.parse(window.localStorage.alerta);

}

function quitarBotones() {

    if (usuario.id) {

        if (usuario.rol != 'bibliotecario') {
            console.log('Quitando');
            $('.botonEliminar').remove();

        }

    }else {
        $('.botonListaDeseados').remove();
        $('.botonEliminar').remove();
        $('.botonTomarPrestado').remove();

    }

}