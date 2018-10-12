var WebApiBaseUrl = "/api/Articulo";

var vm = new Vue({
    el: "#ArticuloBind",
    data: {
        Id: 0,
        Ean: "",
        Descripcion:"",
        p_ErrorMessage: "",
        p_SuccessMessage: ""
    },

    methods: {

    }
    
});


function HydrateFields(data) {

    vm.$data.Id = data.Id;
    vm.$data.Ean = data.Ean;
    vm.$data.Descripcion = data.Descripcion;
}


