let errorDOM = '.error';

$(function (){


    $(errorDOM).toggle();
    $('#realizarCompra').prop('disabled', true);

    // Validar DNI
    $('#inputDNI').focusout(function() {

        let valor = this.value;
        let dniRegex = new RegExp('^[0-9]{8}[A-z]$');

        // Comprobamos si la letra del DNI es válida
        if (comprobarLetraDNI(valor)) {

            if (!dniRegex.test(valor))
                mostrarError($(this), 'Introduzca un DNI válido');
            else 
                ocultarError($(this));
        }else {
            mostrarError($(this), 'Introduzca un DNI válido');

        }

    });

    // Validar tarjeta de crédito
    $('#inputTarjetaCredito').keyup(function() {

        if ($(this).val().length < 18) {
    
            // Añadimos un espacio cada 4 números
            if ($(this).val().length == 4 || $(this).val().length == 9 || $(this).val().length == 14) $(this).val($(this).val() + ' ');
    
            // Comprobamos el tipo de tarjeta
            if ($(this).val().length >= 5) {
    
                comprobarTipoTarjetaCredito($(this));
    
            }
            
            
        }else {
            $(this).val($(this).val().substring(0, 19));
        }
        
        
    });

    $('#inputTarjetaCredito').focusout(function () {

        let valor = this.value;
        let tarjetaCreditoRegex = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/);

        comprobarTipoTarjetaCredito($(this));

        if (!tarjetaCreditoRegex.test(valor)) {

            let nuevoValor = '';
    
            for (let index = 0; index < $(this).val().length; index++) {
                const element = $(this).val()[index];
                
                if (index == 3 || index == 7 || index == 11) nuevoValor += `${element} `;
                else nuevoValor += element;
    
            }
    
            $(this).val(nuevoValor);
        }
        // mostrarError($(this), 'El número de tarjeta de crédito debe tener el siguiente formato: 1234 5678 1234 5678');
        else 
            ocultarError($(this));



    });
    
    // Validar fecha de caducidad
    $('#inputFechaCaducidad').focusout(function () {

        
        if ($(this)[0].valueAsDate < new Date())
            mostrarError($(this), 'La tarjeta de crédito ha caducado. Introduzca una tarjeta válida');
        else 
            ocultarError($(this));


    });

    // Validar CCV
    $('#inputCCV').focusout(function() {

        let valor = this.value;
        let dniRegex = new RegExp('^[0-9]{3}$');

        if (!dniRegex.test(valor))
            mostrarError($(this), 'Introduzca un CCV válido');
        else 
            ocultarError($(this));


    });

    $('#inputCCV').keyup(function() {

        if ($(this).val().length > 3) $(this).val($(this).val().substring(0, 3));


    });
    
    // Validar errores e inputs sin rellenar
    $('#pagarMultaModal input').focusout(function() {

        let hayError = false;
        let inputEnBlanco = false;

        // Primero comprobamos si hay inputs sin rellenar
        $('#pagarMultaModal input').each(function () {

            if ($(this).val() == '') 
                inputEnBlanco = true;

        });

        // Si el usuario ha rellenado todo, comprobamos que no haya errores
        if (!inputEnBlanco) {

            $('div > .error').each(function () {
    
                if ($(this).css('display') !== 'none' && !hayError) hayError = true;

                $('#realizarCompra').prop('disabled', hayError)
            })
        
        }else {
            $('#realizarCompra').prop('disabled', true)
        }

    })


    $('#realizarCompra').click(function (e) {
        e.preventDefault();

    });

});

function mostrarError(thisObj, error = '') {

    thisObj.parent().find(errorDOM).text(error);
    thisObj.parent().find(errorDOM).show();

}

function ocultarError(thisObj) {

    thisObj.parent().find(errorDOM).hide();


}

function tipoTarjetaCredito(clase) {

    $('#tipoTarjetaCredito').removeClass();
    $('#tipoTarjetaCredito').addClass(`fab fa-cc-${clase}`);
}

function comprobarTipoTarjetaCredito(thisObj) {

    // Comprobamos el tipo de tarjeta
    if (thisObj.val().length >= 5) {
        
        switch(thisObj.val().charAt(5)) {
            
            case '3':
                tipoTarjetaCredito('amex');
                break;
            case '4':
                tipoTarjetaCredito('visa');
                break;
            case '5':
                tipoTarjetaCredito('mastercard');
                break;

            default:
                tipoTarjetaCredito('');
                break;

        }

    }

}

function comprobarLetraDNI(dni) {

    let letra = dni.substring(dni.length - 1).toUpperCase();
    let digitos = parseInt(dni.substring(0, dni.length - 1));

    let letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    return letra == letras.charAt(digitos % 23);

}