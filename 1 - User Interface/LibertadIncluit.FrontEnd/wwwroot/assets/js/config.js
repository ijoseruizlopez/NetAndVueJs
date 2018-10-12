/*Variables globales para el footer*/
window.Usuario = "";
window.Legajo = "";
window.Sucursal = "";


/*Variables de redireccion*/

window.UrlInicioSesion = "http://10.147.26.100/LoginLibertadPro/";
window.UrlCerrarSesion = "http://10.147.26.100/LoginLibertadPro/";


/*Funciones globales*/
var CerrarSesion = function () {
    window.location = UrlCerrarSesion;
    return window.location;
}


