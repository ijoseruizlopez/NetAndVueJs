/** ********************************************** **
	Your Custom Javascript File
	Put here all your custom functions
*************************************************** **/


/** Preloader
 **************************************************************** **/
function quitPreloader() {
    if (jQuery('#preloader').length > 0) {

        jQuery('#preloader').fadeOut(500, function () {
            jQuery('#preloader').css("display", "none"); 
        });
    }
}

function showPreloader() {
    jQuery('#preloader').fadeIn(500, function() {
        jQuery('#preloader').css("display", "block");
    });
}

// Para hacer que los page-header queden estaticos al scrollear
var startPageHeaderPos = -1;
var globalPageHeader;
var globalPageHeaderReplacer;

function findPosY(obj) {
    var curtop = 0;
    if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        curtop += obj.offsetTop;
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}
// end scrolling util



/**-------- GUARDAR ESTADO DEL MENÚ LATERAL (ABIERTO/CERRADO) --------**/

//Al abrir o cerrar el menú lateral, guardamos una cookie para recordar su estado
$('#mobileMenuBtn').on('click', function () {

    if ($('body').hasClass('min')) {
        SaveCookie("AssistCargo.SimonMips.HiddenAsideMenu", false, 15 * 24 * 60 * 60);
    } else {
        SaveCookie("AssistCargo.SimonMips.HiddenAsideMenu", true, 15 * 24 * 60 * 60);
    }
});

//Hacemos que el menú se cierre si la cookie es true. La página siempre carga con el menú abierto
$(document).ready(function () {

    // Si no encuentra el aside, es el login u otra ventanita, sale
    if (!$('#aside').prop('style'))
        return;

    var menuEscondido = GetCookie("AssistCargo.SimonMips.HiddenAsideMenu");

    if (menuEscondido === "true") {

        $('#aside').prop('style').removeProperty('display');
        $('#mobileMenuBtn').removeClass('active');

        //Esto lo robamos de un js del Smarty, parte de la funcion del botón que esconde/abre el menú.
        jQuery("#middle").css({ "margin-left": "0" });
        jQuery('body').addClass('min');

        if (jQuery('#aside nav li.el_primary.menu-open ul.sub-menu').prop('style')) {
            jQuery('#aside nav li.el_primary.menu-open ul.sub-menu').prop('style').removeProperty("display");
        }

        jQuery("#sideNav>h3").hide();
        jQuery('#aside nav li.el_primary').removeClass('menu-open');
    } else {

        $('#aside').prop('style').removeProperty('display');
    }
});
/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/