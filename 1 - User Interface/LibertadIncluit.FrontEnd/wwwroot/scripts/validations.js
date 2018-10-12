function validaFecha(fecha) {
    if (!fecha || fecha === "") return true;

    if (!moment(fecha, window.momentDateFormat).isValid()) return false;

    var fechaComponentes = fecha.split("/");
    var anios = parseInt(fechaComponentes[2]);
    return anios > 1900 && anios < 2100;

    //if (fecha === "" || !fecha) {
    //    return false;
    //}
    //return fecha.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
}

function validaFechaHora(fechaHora) {
    if (fechaHora === "") return true;

    if (!fechaHora.match(/^\d\d?\/\d\d?\/\d\d\d\d\ \d\d?\:\d\d$/)) return false;

    var fechaComponentes = fechaHora.split("/");
    var anios = parseInt(fechaComponentes[2].split(" ")[0]);
    return anios > 1900 && anios < 2100;

    //if (fechaHora !== "") {
    //    return fechaHora.match(/^\d\d?\/\d\d?\/\d\d\d\d\ \d\d?\:\d\d$/);
    //}
    //return true;
}

function validaHoyOAnterior(fecha) {
    //Dejamos que el Required ataje el vacío o null
    if (!fecha) return true;

    if (!validaFecha(fecha)) return false;

    var hoy = new Date().setHours(0, 0, 0, 0);
    var fechaDate = moment(fecha, window.validate_DatePicker_DateFormat.toUpperCase());

    return fechaDate <= hoy;
}

function validaAhoraOPosterior(fechaHoraString) {
    //Dejamos que el Required ataje el vacío o null
    if (!fechaHoraString) return true;

    if (!validaFechaHora(fechaHoraString)) return false;

    var ahora = moment(new Date(), window.validate_Moment_DateTimeFormat);
    var fechaHoraDate = moment(fechaHoraString, window.validate_Moment_DateTimeFormat);

    return fechaHoraDate > ahora;
}

function validaFechaNoAntigua(fecha) {
    if (!validaFecha(fecha)) return false;

    var fechaComponentes = fecha.split("/");
    return fechaComponentes[2] > 1900;
}

function validaEmail(email) {
    if (!email || 0 === email.length) {
        return true;
    } else {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
}

function validaPrecio(precio) {
    if (precio === "" || !precio) {
        return false;
    }
    return precio.match(/^\d+(\.\d{1,2})?$/);
}

function validaCuit(cuit) {
    var digito;
    if (typeof cuit === "undefined")
        return true;
    if (cuit === null)
        return true;
    cuit = cuit.toString().replace(/[-_]/g, "");
    if (cuit === "")
        return true; //No estamos validando si el campo esta vacio, eso queda para el "required"
    if (cuit.length !== 11)
        return false;
    else {
        var mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var total = 0;
        for (var i = 0; i < mult.length; i++) {
            total += parseInt(cuit[i]) * mult[i];
        }
        var mod = total % 11;
        digito = mod === 0 ? 0 : mod === 1 ? 9 : 11 - mod;
    }
    return digito === parseInt(cuit[10]);
}


function validarLargoCBU(numero) {
    if (numero.length !== 22) { return false }
    return true;
}
//function validarBloque1(bloque1) {
//    if (bloque1.length !== 8) { return false }
//    var banco = bloque1.substr(0, 3);
//    var digitoVerificador1 = bloque1[3];
//    var sucursal = bloque1.substr(4, 3);
//    var digitoVerificador2 = bloque1[7];
//    var suma = banco[0] * 7 +
//        banco[1] * 1 +
//        banco[2] * 3 +
//        digitoVerificador1 * 9 +
//        sucursal[0] * 7 +
//        sucursal[1] * 1 +
//        sucursal[2] * 3;
//    var diferencia = 10 - (suma % 10);
//    return diferencia == digitoVerificador2;
//}
//function validarBloque2(bloque2) {
//    if (bloque2.length !== 14) { return false }
//    var digitoVerificador = bloque2[13];
//    var suma = bloque2[0] * 3 +
//        bloque2[1] * 9 +
//        bloque2[2] * 7 +
//        bloque2[3] * 1 +
//        bloque2[4] * 3 +
//        bloque2[5] * 9 +
//        bloque2[6] * 7 +
//        bloque2[7] * 1 +
//        bloque2[8] * 3 +
//        bloque2[9] * 9 +
//        bloque2[10] * 7 +
//        bloque2[11] * 1 +
//        bloque2[12] * 3;
//    var diferencia = 10 - (suma % 10);
//    return diferencia == digitoVerificador;
//}

function validaImei(imei) {

    if (imei == null || imei == '' ) return true;

    if (imei.length !== 15 || !imei.match(/^\d*$/)) {
        return false;
    }
    var nCheck = 0, nDigit = 0, bEven = false;

    for (var n = imei.length - 1; n >= 0; n--) {
        var cDigit = imei.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}

function validaDominio(dominio) {
    if (!dominio || dominio.length === 0) {
        return true;
    }
    var regex = /^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/;
    return regex.test(dominio.toUpperCase());
}

function validaDominioAcoplado(dominioAcoplado) {
    if (!dominioAcoplado || dominioAcoplado.length === 0) {
        return true;
    }

    if (validaDominio(dominioAcoplado)) return true;
    else if (dominioAcoplado.length >= 9) {
        var componenteDominioAcoplado = dominioAcoplado.substring(0, 3);
        var componenteDominioUnidad = dominioAcoplado.substring(3);

        return componenteDominioAcoplado.match(/^10\d{1}$/) && validaDominio(componenteDominioUnidad);
    }
    else return false;
}

function validaNumerosYGuiones(value) {
    if (!value || value.trim() === "") return true;

    return value.match(/^\d+(-\d+)*$/);
}

function validaNumerosYPuntos(value) {
    if (!value || value.trim() === "") return true;

    return value.match(/^\d+(\.\d+)*$/);
}

if ($.validator) {
    $.validator.addMethod("anyDate",
        function (value) {
            return validaFecha(value);
        }
    );
    $.validator.addMethod("anyDateTime",
        function (value) {
            return validaFechaHora(value);
        }
    );
    $.validator.addMethod("fechaHoyOAnterior",
        function (value) {
            return validaHoyOAnterior(value);
        }
    );
    $.validator.addMethod("fechaHoraAhoraOPosterior",
        function (value) {
            return validaAhoraOPosterior(value);
        }
    );
    $.validator.addMethod("anyPrice",
        function (value) {
            return validaPrecio(value);
        }
    );

    jQuery.validator.addMethod("checkYear", function (value, element) {
        var year = $(element).val();
        if (year != 0) {
            return (year > 1939) && (year <= (new Date()).getFullYear());
        }
       return true
    });

    //jQuery.validator.addMethod("checkYear", function (value, element) {
    //    var year = $(element).val();
    //    return (year > 1980) && (year <= (new Date()).getFullYear());
    //});

    $.validator.addMethod("cuit", validaCuit, 'CUIT Inválido');

    $.validator.addMethod("imei", validaImei);

    $.validator.addMethod("isEmail",
        function (email) {
            return validaEmail(email);
        }
    );

    //validador de Numeros != de '0'
    $.validator.addMethod('minStrict', function (value, el, param) {
        return value > param;
    });
    //Validador de dominios de automotores (argentina)
    $.validator.addMethod("dominio", validaDominio);

    //Validador dominio Acoplado (argentina)
    $.validator.addMethod("dominioAcoplado", validaDominioAcoplado);

    //Validador de números de teléfono
    $.validator.addMethod("telefono",
        function isTelefono(telefono) {
            if (!telefono || telefono.length === 0) {
                return true;
            }
            var regex = /^\+?([0-9]\-?){6,}$/;
            return regex.test(telefono);
        }
    );

    //Validador de números de nextel
    $.validator.addMethod("nextel",
        function isNextel(nextel) {
            if (!nextel || nextel.length === 0) {
                return true;
            }
            var regex = /^(\d+\*)+(\d)+$/gm;
            return regex.test(nextel);
        }
    );

    //Validador de CBU
    $.validator.addMethod("cbu",
        function isCbu(cbu) {
            if (cbu && cbu != "") {
                return validarLargoCBU(cbu);
            }
            return true
            //var val2 = validarBloque1(cbu.substr(0, 8));
            //var val3 = validarBloque2(cbu.substr(8, 14));
            //return val1 && val2 && val3;
        });

    //Validador de alias de cuenta bancaria
    $.validator.addMethod("aliasCuentaBancaria",
        function isAlias(alias) {
            if (!alias || alias.length === 0) {
                return true;
            }
            var regex = /^[A-z0-9\.-]*$/;
            return regex.test(alias);
        }
    );

    //Validador de numero de IP
    $.validator.addMethod("numeroIp",
        function isIp(ip) {
            if (!ip || ip.length === 0) {
                return true;
            }
            var regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return regex.test(ip);
        }
    );

    //Para disparar validación tienendo en cuenta un criterio que se define en el mismo validador
    $.validator.addMethod("passCustomValidation",
        function () {
            return false;
        });

    $.validator.addMethod("numerosYGuiones", validaNumerosYGuiones);
    $.validator.addMethod("numerosYPuntos", validaNumerosYPuntos);
}

function contarRequeridos(validatorErrorList) {
    var numeroDeRequeridos = 0;

    //$(":input").each(function () {
    //    var element = $(this);
    //    if (element.hasClass("error") && !element.val()) {
    //        numeroDeRequeridos++;
    //    }
    //});

    for (var i = 0; i < validatorErrorList.length; i++) {
        var element = $(validatorErrorList[i].element);
        if (!element.val()) {
            numeroDeRequeridos++;
        }   
    }

    return numeroDeRequeridos;
}

function validarAlMenosUnaLetra(name) {
    if (!name || 0 === name.length) {
        return false;
    } else {
        var regex = "w*[A-Za-z]\w*";
        return name.match(regex);
        //regex.test(name)
    }
}