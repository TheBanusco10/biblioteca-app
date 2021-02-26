$(function () {

    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else {
            console.log('Todo correcto');
        }

        form.classList.add('was-validated');
      }, false);
    });


    $('[data-toggle="tooltip"]').tooltip();

    $('#registrarseCard').hide();
    $('#error').hide();


    $('#enlaceRegistrarse').click(function () {

        $('#iniciarSesionCard').hide();
        $('#registrarseCard').show();

    });

    $('#enlaceIniciarSesion').click(function () {

        $('#iniciarSesionCard').show();
        $('#registrarseCard').hide();

    });

    $('#enlaceInvitado').click(function () {

        window.localStorage.removeItem('usuario');
        
        window.location = '../index.html';

    });

    $('#botonIniciarSesion').click(function (e) {
    
        e.preventDefault();
        
        $.post('../src/php/obtenerUsuario.php', $('#formularioIniciarSesion').serialize())
        .done(function (data) {
                // Redirigir al index y mostrar mensaje de inicio correcto
                if (data.status === 200) {

                    window.localStorage.setItem('usuario', JSON.stringify({

                        id: data.message.idUsuario,
                        email: data.message.emailUsuario,
                        rol: data.message.rolUsuario

                    }));

                    window.location = '../index.html';
                }else {
                    $('#errorTexto').text(data.message);
                    $('#error').show();
                }
            })

    })
    
    $('#botonRegistrarse').click(function (e) {
    
        e.preventDefault();
    
        $.post('../src/php/nuevoUsuario.php', $('#formularioRegistro').serialize())
            .done(function (data) {

                alert(res.message.emailUsuario);

            })

    })



})