// This is an old version, for a more recent version look at
// https://jsfiddle.net/DRSDavidSoft/zb4ft1qq/2/
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength);
    return object.value;
}

function numeros(e, object) {
    var tecla = e.keyCode;

    if (tecla === 8 || tecla === 9 || tecla === 13) {
        return true;
    }

    var patron;
    if (tecla !== 39) {
        
    
    if (tecla === 46) {
        if (object.indexOf(".") !== -1) {
            patron = /[0-9]/;

        } else {
            patron = /[0-9 '.']/;
        }
    }else if (object.indexOf(".") !== -1) {
        patron = /[0-9]/;
    } else {
        patron = /[0-9 '.']/;
        }
    
    var tecla_final = String.fromCharCode(tecla);
        return patron.test(tecla_final);
    }
    return false;
}

//function numeros(e, object) {
//    var tecla = e.keyCode;

//    if (tecla === 8 || tecla === 9 || tecla === 13) {
//        return true;
//    }

//    var str = object;
//    var patron;
//    if (str.indexOf(".") !== -1) {
//        patron = /[0-9]/;
//    } else {
//        patron = /[0-9 '.']/;
//    }
//      var patron = /[0-9 '.']/;
//var tecla_final = String.fromCharCode(tecla);
//return patron.test(tecla_final);
//}

function numerosSinPunto(e) {
    var tecla = e.keyCode;

    if (tecla === 8 || tecla === 9 || tecla === 13) {
        return true;
    }

    var patron = /[0-9 ]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}