/*
Para el predictivo de Localidades. Las siguientes propiedades deben estar en la entidad:

p_LocalidadesSuggestions --> Array para las sugerencias (default = [])
p_SuggestionsBoxEstado --> Variable para los estados del contenedor de sugerencias (default = 1)
p_SuggestionsBoxTimer --> Variable para el timer que previene el Ajax en el tipeo (default = 0)

*/
function UpdateSuggestionsBox(entity, query) {
    if (!query || query.length < 3) {
        clearTimeout(entity.p_SuggestionsBoxTimer);
        entity.p_LocalidadesSuggestions = [];
        entity.p_SuggestionsBoxEstado = 1;
        vm.$forceUpdate();
        return;
    } else {
        clearTimeout(entity.p_SuggestionsBoxTimer);
        entity.p_SuggestionsBoxEstado = 2;
        vm.$forceUpdate();
        entity.p_SuggestionsBoxTimer = setTimeout(function () {
            $.getJSON("/api/CitiesCrud/GetAutocompleteLocalidades/" + entity.IdPais + "/" + entity.IdProvincia + "/" + query,
                function (json) {
                    if (json.length === 0) {
                        entity.p_SuggestionsBoxEstado = 1;
                        vm.$forceUpdate();
                        return;
                    }
                    entity.p_LocalidadesSuggestions = json;
                    entity.p_SuggestionsBoxEstado = 3;
                    vm.$forceUpdate();
                    return;
                });
        }, 1000);
    }
}
function FillLocalidadFields(entity, localidadSuggestion) {
    entity.p_SuggestionsBoxEstado = 1;
    entity.Localidad = localidadSuggestion.NombreLocalidad;
    entity.CodigoPostal = localidadSuggestion.CodigoPostal;
}

function FillLocalidadFields2(entity, localidadSuggestion) {
    entity.p_SuggestionsBoxEstado = 1;
    entity.Localidad = localidadSuggestion.NombreLocalidad;
}

//Para obtener el combo de provincias al seleccionar un pais
function GetComboProvincia(entity, paisId) {
    entity.p_ComboProvincia = [];
    $.getJSON("/api/ProvincesCrud/GetComboProvincia/" + paisId,
        function(data) {
            entity.p_ComboProvincia = data;
            vm.$forceUpdate();
        });
}