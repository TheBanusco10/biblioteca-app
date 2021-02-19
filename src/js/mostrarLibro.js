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

            $('#informacion').html(`

                <h1 class="text-center">${data.message.tituloLibro}</h1>
                <h4>${data.message.autorLibro}</h4>
                <p id="descripcion">${data.message.descripcionLibro}</p>
                <p id="generos">${data.message.generoLibro}</p>

            
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