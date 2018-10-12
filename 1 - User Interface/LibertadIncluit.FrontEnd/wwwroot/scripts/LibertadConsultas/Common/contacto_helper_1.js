/*
Para el predictivo de Contactos. Las siguientes propiedades deben estar en la entidad:

p_ContactosSuggestions --> Array para las sugerencias (default = [])
p_ContactosSuggestionsBoxEstado --> Variable para los estados del contenedor de sugerencias (default = 1)
p_ContactosSuggestionsBoxTimer --> Variable para el timer que previene el Ajax en el tipeo (default = 0)

*/
function UpdateContactosSuggestionsBox(entity, query) {
    if (!query || query.length < 3) {
        clearTimeout(entity.p_SuggestionsBoxTimer);
        entity.p_ContactosSuggestions = [];
        entity.p_ContactosSuggestionsBoxEstado = 1;
        vm.$forceUpdate();
        return;
    } else {
        clearTimeout(entity.p_ContactosSuggestionsBoxTimer);
        entity.p_ContactosSuggestionsBoxEstado = 2;
        vm.$forceUpdate();
        entity.p_ContactosSuggestionsBoxTimer = setTimeout(function () {
            var encodedQuery = Base64.encode(query);

            $.getJSON("/api/ContactsCrud/GetAutocompleteContactos/" + encodedQuery,
                function (json) {
                    if (json.length === 0) {
                        entity.p_ContactosSuggestionsBoxEstado = 1;
                        vm.$forceUpdate();
                        return;
                    }
                    entity.p_ContactosSuggestions = json;
                    entity.p_ContactosSuggestionsBoxEstado = 3;
                    vm.$forceUpdate();
                    return;
                });
        }, 1000);
    }
}
function FillAddresseeField(entity, contactoSuggestion) {
    entity.p_ContactosSuggestionsBoxEstado = 1;
    entity.Destinatario = contactoSuggestion.Email;
}