

// Funcion que se llama cuando se carga la página
function FormBinding(id, queryRelatedEntityId) {

    vm.$data.p_ErrorMessage = "";
    vm.$data.p_SuccessMessage = "";

    // Obtenemos la entidad
    var url = queryRelatedEntityId
        ? window.WebApiBaseUrl + "/Edit/" + id + queryRelatedEntityId
        : window.WebApiBaseUrl + "/Edit/" + id;
    
    $.getJSON(url, { __: new Date().getTime() }) // con el getTime() evitamos que IE cachee la web api
        .done(function(data) {
            if (data == null) {
                vm.$data.p_ErrorMessage = window.validate_WebApiEntityNotFoundMessage;
                $("input").attr("disabled", "true");
                $("textarea").attr("disabled", "true");
                $("select").attr("disabled", "true");
                $("button").attr("disabled", "true");
                return;
            }

            // Nos guardamos la cultura actual
            window.Global_CurrentCulture = data.CurrentCulture;

            // Se actualizan los campos del model, en base a los datos del webapi
            HydrateFields(data);

        })
        .error(ExceptionCatcher)
        .always(quitPreloader);
}



// Funcion que se ejecuta cuando se confirma el formulario
function FormSubmit() {

    vm.$data.p_ErrorMessage = "";
    vm.$data.p_SuccessMessage = "";
    $("button[type='submit']").attr("disabled", true);

    var entityJson = JSON.stringify(vm.$data, ExcludePrivateFields);

    if (window.IsDeleting) {

        // Se está eliminando

        $.ajax({
                url: window.WebApiBaseUrl + "/Delete/" + vm.$data.Id,
                type: "DELETE",
                data: entityJson,
                contentType: "application/json;chartset=utf-8",
                //dataType: "json",
                processData: true,
                error: ExceptionCatcher
            })
            .done(
                function() {
                    vm.$data.p_SuccessMessage = window.validate_WebApiEntityDeletedMessage;
                });

    } else if (window.IsRenewing) {

        // Se está renovando (programas)

        $.ajax({
                url: window.WebApiBaseUrl + "/RenewWithChanges/" + vm.$data.Id,
                type: "PUT",
                data: entityJson,
                contentType: "application/json;chartset=utf-8",
                //dataType: "json",
                processData: true,
                error: ExceptionCatcher
            })
            .done(
                function () {
                    vm.$data.p_SuccessMessage = window.validate_WebApiEntityRenewedMessage;
                });

    } else if (vm.$data.Id !== -1) {

        // Es una modificacion

        $.ajax({
            url: WebApiBaseUrl + "/Edit/" + vm.$data.Id,
                type: "PUT",
                data: entityJson,
                contentType: "application/json;chartset=utf-8",
                //dataType: "json",
                processData: true,
                error: ExceptionCatcher
            })
            .done(
                function() {
                    vm.$data.p_SuccessMessage = window.validate_WebApiEntityUpdatedMessage ;
                });

    } else {

        // Es una alta

        $.ajax({
            url: WebApiBaseUrl+"/Add",
                type: "POST",
                data: entityJson,
                contentType: "application/json;chartset=utf-8",
                //dataType: "json",
                processData: true,
                error: ExceptionCatcher
            })
            .done(
                function(data) {
                    vm.$data.p_SuccessMessage = window.validate_WebApiEntityAddedMessage;

                    if (vm.$data.p_ReturnId) {
                        //Aquí viene el Id del viaje cargado
                        vm.$data.Id = data;
                    }
                });
    }
}

 

function ExceptionCatcher(ex) {

    $("button[type='submit']").attr("disabled", false);
    if (ex.status === 404) {
        if (!window.WebApi_WebApiNotFoundMessage) {
            vm.$data.p_ErrorMessage = "Web api not found.";
        } else {
            vm.$data.p_ErrorMessage = window.validate_WebApiNotFoundMessage ;
        }
        return;
    }
    if (ex.status === 401) {
        if (!window.validate_WebApiInsufficientRightsMessage) {
            vm.$data.p_ErrorMessage = "You have insufficient rights to access this resource.";
        } else {
            vm.$data.p_ErrorMessage = window.validate_WebApiInsufficientRightsMessage;
        }
        return;
    }
    if (ex.status === 500) {
        var errorObj = JSON.parse(ex.responseText);

        if (errorObj.error.indexOf("DELETE statement conflicted with the REFERENCE constraint") !== -1) {
            vm.$data.p_ErrorMessage = "No se puede eliminar este registro. Hay datos que dependen de él";
            return;
        }

        if (errorObj.error.indexOf("String was not recognized as a valid DateTime") !== -1) {
            vm.$data.p_ErrorMessage = "Ha ingresado una fecha/hora con formato inválido. Por favor, utilice el calendario que se despliega en cada campo.";
            return;
        }

        if (errorObj.error.indexOf("IX_") !== -1) {
            var mensajeError = errorObj.error;
            var valorRepetido = mensajeError.substring(mensajeError.indexOf("(") + 1, mensajeError.indexOf(")"));
            var campo = mensajeError.substring(mensajeError.indexOf("IX_"), mensajeError.indexOf("\'.")).split("_")[2].toLowerCase();
            if (campo === "identificaciontributaria") {
                campo = "CUIT";
            }
            if (campo === "iddispositivo") {
                campo=" ID del Dispositivo"
            }
            if (campo === "identificacionmochila") {
                campo = " ID de mochila";
            }
            if (campo === "imeichip") {
                campo="IMEI del Chip"
            }
            if (campo === "imeidispositivo") {
                campo="IMEI del Dispositivo"
            }
            if (campo === "nombrebroker") {
                campo = "Broker";
            }
            if (campo === "razonsocial") {
                campo = "Avl";
            }
            if (campo === "nombrecompaniaseguro") {
                campo = "nombre para Compania de seguro ";
            }
            if (campo === "numerodocumento") {
                campo = "numero de documento";
            }

            vm.$data.p_ErrorMessage = "El " + campo + " " + valorRepetido + " ya existe";




            var str = "Hello World!";
            var res = str.toUpperCase();

            return;
        }
        vm.$data.p_ErrorMessage = errorObj.error;
        return;
    }
    vm.$data.p_ErrorMessage = ex;
}

////Manejamos errores de Vue para que se muestren como alert
//Vue.config.errorHandler = function (err, vm, info) {
//    window.alert(err);
//}

//Manejamos warnings de Vue para que se muestren en panel de error
Vue.config.warnHandler = function (msg) {
    vm.$data.p_ErrorMessage = msg;
}