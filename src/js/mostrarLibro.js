const maximoCaracteres = 250;
let caracteresRestantes = maximoCaracteres;

$(function () {

    let parametros = new URLSearchParams(window.location.search);

    if (parametros.has('id')) {

        let id = parametros.get('id');
        let usuario = JSON.parse(window.localStorage.usuario);


        // Comprobamos si es un Invitado o no para poder añadir comentarios
        if (usuario.email == 'Invitado') {
            $('#comentariosAcciones').html('<p>Inicia sesión para dejar un comentario</p>');
        
        }else {

            $('#comentariosAcciones').html(`
            
                <section id="addComentarioSeccion">
                    <div class="form-group">
                    <textarea id="comentarioTextArea" type="text" class="form-control" placeholder="Introduce tu comentario"></textarea>
                    <p id="caracteresRestantes">250 caracteres restantes</p>
                    <button id="addComentario" class="btn btn-success">Añadir comentario</button>
                    </div>
                </section>
            
            `);
        }

        // Comprueba los caracteres restantes del comentario
        $('#caracteresRestantes').text(`${caracteresRestantes} caracteres restantes`);

        $('#comentarioTextArea').keyup(function () {

            let longitud = $(this).val().length;

            caracteresRestantes = maximoCaracteres - longitud;
            
            if (caracteresRestantes >= 0)
                $('#caracteresRestantes').text(`${caracteresRestantes} caracteres restantes`);
            else 
                $(this).val($(this).val().substr(0, maximoCaracteres));
            
        });
        
        $.get('../src/php/obtenerLibro.php', {id: id}, function(data) {
            
            $('title').text(`${data.message.tituloLibro}`);

            $('#imagen').html(`

                <div id="imagenContenedor">
                    <img src="${data.message.imagenLibro}" alt="${data.message.tituloLibro}">
                </div>
            
            `);

            $('#genero').html(`
            
                <p id="generos">${data.message.generoLibro}</p>
            
            `);

            librosRecomendados(data.message.generoLibro, function(recomendaciones) {

                recomendaciones.message = recomendaciones.message.filter(element => element.idLibro != id);
                let resultado;
                let articulos;

                // <article>
                //         <div class="contenedorImagen text-center">
                //             <img src="${imagenLibro}" alt="${tituloLibro}">
                //         </div>
                //         <p class="text-center mt-2"><a href="verLibro.html?id=${idLibro}">${tituloLibro}</a></p>
                //     </article>

                if (recomendaciones.message.length == 0) resultado = 'No hay libros recomendados.';
                else {

                    resultado = `
                    
                    <div id="carouselRecomendaciones" class="carousel slide carousel-fade" data-ride="carousel">
                        <div class="carousel-inner">
                        
                    `;

                    console.log(resultado);
                    
                    articulos = recomendaciones.message.map(({imagenLibro, tituloLibro, idLibro}, index) => {

                    if (index == 0)
                    
                        return `

                        <div class="carousel-item active">
                            <img src="${imagenLibro}" class="d-block w-100" alt="${tituloLibro}"">
                                <div class="carousel-caption d-none d-md-block">
                                <p class="text-center mt-2"><a href="verLibro.html?id=${idLibro}">${tituloLibro}</a></p>
                            </div>
                        </div>

                        `;

                    else

                        return `

                            <div class="carousel-item">
                                <img src="${imagenLibro}" class="d-block w-100" alt="${tituloLibro}"">
                                    <div class="carousel-caption d-none d-md-block">
                                    <p class="text-center mt-2"><a href="verLibro.html?id=${idLibro}">${tituloLibro}</a></p>
                                </div>
                            </div>

                        `;
                    }).join('');


                    resultado += `

                        ${articulos}

                        </div>

                            <a class="carousel-control-prev" href="#carouselRecomendaciones" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselRecomendaciones" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                            </a>
                        </div>
                    
                    `;

                }
                    
                $('#recomendaciones').html(`
                
                
                    <h4 class="text-center mb-4">Otros libros que podrían gustarte</h4>
                    
                    ${resultado}

                
                `);
            });

            $('#informacion').html(`

                <h1 class="text-center">${data.message.tituloLibro}</h1>
                <h4>${data.message.autorLibro}</h4>
                <p id="descripcion">${data.message.descripcionLibro}</p>

            
            `);

        })

        $.get('../src/php/obtenerComentarios.php', {id: id}, function(data) {

            if (data.status == 200) {

                let comentarios = data.message.map(element => {
                    
                    return `
                    
                        <div id="comentarioCard">
                            <div id="comentarioHeader">
                                <p>${element.emailUsuario}</p>
                            </div>
                            <div id="comentarioBody">
                                <p>${element.comentario}</p>
                            </div>
                        </div>
    
                    `;
                });
    
                $('#comentarios').html(comentarios);
            }


        })

        $('#addComentario').click(function () {

            let idUsuario = usuario.id;
            let comentario = $('#comentarioTextArea').val();

            insertarComentario(idUsuario, id, comentario);
        });
    }



});

function insertarComentario (idUsuario, idLibro, comentario) {

    $.get('../src/php/insertarComentario.php', {idUsuario: idUsuario, idLibro: idLibro, comentario: comentario}, function (data) {
        
        if (data.status == 200) window.location.reload();
        else alert('Error');

    });

}

function librosRecomendados(generos, callback) {

    let genero = generos.split('|');

    console.log(genero);

    genero = genero[Math.floor(Math.random() * genero.length)];

    console.log(genero);

    $.post(`${PHP_BASE}librosRecomendados.php`, {genero: genero}, callback);

}