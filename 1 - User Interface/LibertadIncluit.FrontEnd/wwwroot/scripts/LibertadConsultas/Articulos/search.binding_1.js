// Comon helper for Table Crud operations

var vm = new Vue({
    el: window.ListBindElementName,
    data: {
        TextToSearch: "",
        ArticuloSelection: null,
        EmptyResultDescription: false,
        EmptyResultCodEan: false,
        LoadingResultCodArticuloEan: false,
        LoadingResultDescription: false,
        CodArticuloEanSearch: "",
        DescriptionSearch: "",
        PreviousTextToSearch: "",
        CurrentPage: 1,
        CurrentOrder: 1,
        PageSize: 20,
        PreviousPageSize: 20,
        TotalPageCount: 1,
        TotalCount: 0,
        Entities: [],
        MostrarTabla: false,
        p_PromocionSelection: null,

        minAncho: false,
        MementoUsuario: null,
        UsuarioAbreviado: null,


        inicioSesion: false,
        errorInicioSesion: false,
        ToManyResults: false,
        RequestActive: false,
        EnterMoreThreeCaracteres: false,
        EnterMoreOneCaracteres: false,
        currentSort: "CodigoInterno",
        currentSortDir: "asc",

        BanderaEnter: false,

        p_ActionMessage: "",
        p_ErrorMessage: ""
    },
    created: function () {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed: function () {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {

        //sortedEntities: function () {
        //    return this.Entities.sort((a, b) => {
        //        let modifier = 1;
        //        if (this.currentSortDir === 'desc') modifier = -1;
        //        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        //        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        //        return 0;
        //    });
        //}
    },

    watch: {
        RequestActive: function (val) {
            if (this.RequestActive) {
                $('#scanerSearchTabLi').addClass('disabledTab');
                $('#descriptionTabLi').addClass('disabledTab');
            }
            else {
                $('#scanerSearchTabLi').removeClass('disabledTab');
                $('#descriptionTabLi').removeClass('disabledTab'); 
            }
        },
        inicioSesion: function () {
            if (this.inicioSesion) {
                $('#divTitleCons').removeClass('mainDivConsulta');
                $('#divBodyCons').removeClass('mainDivConsulta');
            }
        }

    },


    methods: {

        ClearValidationCodArticuloEan: function () {
            this.BanderaEnter = false;
            this.EnterMoreOneCaracteres = false

        },
        ClearValidationDescription: function () {
            this.BanderaEnter = false;
            this.ToManyResults = false;
            this.EnterMoreThreeCaracteres = false

        },

        ClearDescription: function () {
            this.Entities = [];
            this.DescriptionSearch = "";
            this.EmptyResultDescription = false;
            this.EnterMoreThreeCaracteres = false;
            this.ToManyResults = false;
            if (document.getElementById("SearchPanelDescriptionToSearch"))
                document.getElementById("SearchPanelDescriptionToSearch").focus();
        },
        ClearCodArticuloEan: function () {

            this.BanderaEnter = false;
            this.EnterMoreOneCaracteres = false
            this.CodArticuloEanSearch = "";
            this.EmptyResultCodEan = false;
            this.EnterMoreOneCaracteres = false;

            if (document.getElementById("SearchPanelTextToSearch"))
                document.getElementById("SearchPanelTextToSearch").focus();
        },
        ClearError: function () {
            this.p_ErrorMessage = "";
        },

        NotIsCaracterEspecial: function (evt) {
            this.BanderaEnter = false;
            this.EnterMoreOneCaracteres = false

            evt = (evt) ? evt : window.event;
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            } else
                true;
        },

        sort: function (s) {

            if ('CodigoArticulo' == s)
                this.ChangeOrderWithoutRefresh(1);

            if ('CodEan' == s)
                this.ChangeOrderWithoutRefresh(2);

            if ('Descripcion' == s)
                this.ChangeOrderWithoutRefresh(3);

            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;

            if ('Descripcion' == s) {
                vm.$data.Entities.sort(function (a, b) {
                    var modifier = 1;
                    if (vm.$data.currentSortDir === 'desc') modifier = -1;
                    if (a[vm.$data.currentSort] < b[vm.$data.currentSort]) return -1 * modifier;
                    if (a[vm.$data.currentSort] > b[vm.$data.currentSort]) return 1 * modifier;
                    return 0;
                });
            } else {
                vm.$data.Entities.sort(function (a, b) {
                    var modifier = 1;
                    if (vm.$data.currentSortDir === 'desc') modifier = -1;
                    if (parseInt(a[vm.$data.currentSort]) < parseInt(b[vm.$data.currentSort])) return -1 * modifier;
                    if (parseInt(a[vm.$data.currentSort]) > parseInt(b[vm.$data.currentSort])) return 1 * modifier;
                    return 0;
                });
            }
        },

        handleResize: function () {

            if (window.innerWidth <= 320) {
                if (this.MementoUsuario == null) {
                    this.MementoUsuario = window.Usuario;
                    if (window.Usuario.length > 21) {
                        window.Usuario = window.Usuario.slice(0, 18);
                        document.getElementById("Usuario").innerHTML = window.Usuario + "...";
                    }

                }

            }
            else {
                if (window.Usuario)
                    if (this.MementoUsuario != null) {
                        window.Usuario = this.MementoUsuario;
                        document.getElementById("Usuario").innerHTML = window.Usuario;
                        this.MementoUsuario = null;
                    }
            }
        },

        CenterSearchClick: function (idElement) {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = e.target.attributes.href.value;
                $(target + ' input').focus();
                vm.$data.SearchDescription();
            })
        },

        CenterSearch: function (idElement) {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = e.target.attributes.href.value;
                vm.$data.BanderaEnter = true;
                $(target + ' input').focus();
            })
        },

        GetClassForButton: function (buttonNumber) {
            if (buttonNumber > this.TotalPageCount) {
                return "disabled";
            }
            if (buttonNumber === this.CurrentPage) {
                return "active";
            }
            return "";
        },

        GetClassForFirstButton: function () {

            if (this.CurrentPage === 1 || (this.CurrentPage === this.TotalPageCount && this.CurrentPage === 1)) {
                return "disabled";
            }
            return "";
        },

        GetClassForLastButton: function () {
            if (this.CurrentPage === this.TotalPageCount) {
                return "disabled";
            }
            return "";
        },

        CleanNoResult: function () {

            if (this.CodArticuloEanSearch == "")
                this.EmptyResultCodEan = false;

        },

        CleanDescriptionNoResult: function () {
            this.ToManyResults = false;
            if (this.DescriptionSearch == "")
                this.EmptyResultDescription = false;

        },

        SearchCodArticuloEANClick: function () {
            vm.$data.BanderaEnter = false;
            this.SearchCodArticuloEAN();
        },

        SearchCodArticuloEAN: function (evt) {

            try {


                evt = (evt) ? evt : window.event;

                if (vm.$data.BanderaEnter) {
                    vm.$data.BanderaEnter = false;
                    return;
                }


                this.Entities = [];

                if (this.CodArticuloEanSearch == null || this.CodArticuloEanSearch.length < 3) {
                    this.EnterMoreOneCaracteres = true;
                    return;
                }
                this.LoadingResultDescription = true;
                this.EnterMoreOneCaracteres = false;
                this.RequestActive = true;
                this.LoadingResultCodArticuloEan = true;
                this.EmptyResultCodEan = false;
                this.p_ErrorMessage = "";

                var idFilter1 = vm.$data.IdFilter1;
                var currentOrder = vm.$data.CurrentOrder;
                var CodArticuloEanSearch = vm.$data.CodArticuloEanSearch;

                var url = window.WebApiSearchUrl + "/SearchCodigoEan" + "?codigoArticuloEan=" + CodArticuloEanSearch;

                $.ajax({
                    dataType: "json",
                    url: url,
                    headers: { 'Sucursal': window.Sucursal },
                    type: 'GET',
                    success: function (data) {
                        vm.$data.RequestActive = false;
                        vm.$data.LoadingResultCodArticuloEan = false;
                        vm.$data.LoadingResultDescription = false;
                        if (data == null) {
                            ArticuloSelection = null;
                            vm.$data.EmptyResultCodEan = true;
                            return;
                        } else {
                            vm.$data.ArticuloSelection = data;
                        }

                    }
                }).error(ExceptionCatcher);

            } catch (e) {

                this.RequestActive = false;
                this.LoadingResultCodArticuloEan = false;
                this.LoadingResultDescription = false;
                this.p_ErrorMessage = "Ocurrió un error, intente más tarde nuevamente o consulte con su administrador.";
                console.error("Detalles del error: " + e);
            }
        },

        SearchDescriptionClick: function () {
            vm.$data.BanderaEnter = false;
            this.SearchDescription();
        },

        SearchDescription: function (evt) {

            try {
                evt = (evt) ? evt : window.event;

                if (vm.$data.BanderaEnter) {
                    vm.$data.BanderaEnter = false;
                    return;
                }

                this.Entities = [];

                if (this.DescriptionSearch == null || this.DescriptionSearch.length < 3) {
                    this.EnterMoreThreeCaracteres = true;
                    return;
                }

                this.EnterMoreThreeCaracteres = false;
                this.RequestActive = true;
                this.LoadingResultDescription = true;
                this.EmptyResultDescription = false;
                this.ToManyResults = false;
                this.Entities = [];
                this.SelectedEntities = [];
                this.p_ErrorMessage = "";

                var description = Base64.encode(this.DescriptionSearch);


                var url = window.WebApiSearchUrl + "/SearchDescription?description=" + description;


                $.ajax({
                    dataType: "json",
                    url: url,
                    headers: { 'Sucursal': window.Sucursal },
                    type: 'GET',
                    success: function (data) {
                        vm.$data.LoadingResultDescription = false;
                        vm.$data.RequestActive = false;
                        if (data == null) {
                            vm.$data.EmptyResultDescription = true;
                            vm.$data.p_ErrorMessage = window.WebApi_NoDataToShow;
                            return;
                        }

                        if (data.length == 0)
                            vm.$data.EmptyResultDescription = true;
                        else
                            vm.$data.EmptyResultDescription = false;

                        if (data.length >= 26) {

                            vm.$data.ToManyResults = true;
                        }
                        else {
                            vm.$data.ToManyResults = false;
                            vm.$data.Entities = data;
                        }

                    }
                }).error(ExceptionCatcher);



            } catch (e) {
                vm.$data.RequestActive = false;
                vm.$data.ToManyResults = false;
                vm.$data.LoadingResultDescription = false;
                this.p_ErrorMessage = "Ocurrió un error, intente más tarde nuevamente o consulte con su administrador.";
                console.log("Detalles del error: " + e);
            }

        },

        ChangeOrderWithoutRefresh: function (columnNumber) {
            var newOrder = columnNumber * 2 - 1;

            if (newOrder <= 0) {
                newOrder = 1;
            }

            if (vm.$data.CurrentOrder === newOrder) {
                vm.$data.CurrentOrder++;
            } else if (vm.$data.CurrentOrder === newOrder + 1) {
                vm.$data.CurrentOrder--;
            } else {
                vm.$data.CurrentOrder = newOrder;
            }
        },

        ChangeOrder: function (columnNumber) {

            this.ChangeOrderWithoutRefresh(columnNumber);

            this.SearchDescription();
        },

        ChangePageSize: function (pageSize) {
            this.PageSize = parseInt(pageSize);
            vm.SearchDescription();
        },

        ClearTextToSearch: function () {
            this.TextToSearch = "";
            vm.SearchDescription();
        },


        ViewItem: function (itemId) {

            vm.$data.CodArticuloEanSearch = itemId;
            this.SearchCodArticuloEAN();

            vm.$forceUpdate();
        },

        keyUpTable: function (index) {
            $("#myTable").find("tbody").find('tr:eq(' + (index - 1) + ')').focus();
        },


        keydownTable: function (index) {
            $("#myTable").find("tbody").find('tr:eq(' + (index + 1) + ')').focus();
        },

        BackSearch: function () {
            this.ArticuloSelection = null;
            this.CodArticuloEanSearch = null;
            this.DescriptionSearch = "";
            this.$forceUpdate();
        }

    }
});

//Manejamos errores de Vue para que se muestren como alert
Vue.config.errorHandler = function (err, vm, info) {
    window.alert(err);
}

//Manejamos warnings de Vue para que se muestren en panel de error
Vue.config.warnHandler = function (msg) {
    vm.$data.p_ErrorMessage = msg;
}


function quitPreloader() {
    if (jQuery('#preloader').length > 0) {

        jQuery('#preloader').fadeOut(500, function () {
            jQuery('#preloader').css("display", "none");
            if (document.getElementById("SearchPanelTextToSearch"))
                document.getElementById("SearchPanelTextToSearch").focus();
        });
    }
}

function ValidateUser() {
    try {

        var url = window.WebApiValidateUser + "/Validate?text=" + window.usuarioEncode;

        $.ajax({
            url: url,
            type: "GET",
            async: true
        }).done(function (data) {
            if (data == null) {
                vm.$data.errorInicioSesion = true;
            }
            else {
                window.Usuario = data.NombreUsuario;
                document.getElementById("Usuario").innerHTML = window.Usuario;
                window.Legajo = data.Legajo;
                document.getElementById("Legajo").innerHTML = "Leg: " + window.Legajo;
                window.Sucursal = data.Sucursal;
                document.getElementById("Sucursal").innerHTML = "Suc: " + window.Sucursal;
                vm.$data.inicioSesion = true;
            }

        }).error(function () {
            document.getElementById("iconMenu").style.display = 'none';
            vm.$data.errorInicioSesion = true;
            vm.$data.p_ErrorMessage = "Ocurrió un error al validar el usuario, intente más tarde nuevamente o consulte con su administrador"
        }).always(quitPreloader);;

    } catch (e) {
        vm.$data.errorInicioSesion = true;
        console.Error("Detalles del error: " + e);
    }
}


function IniciarSesion() {
    window.location = window.UrlInicioSesion;
    return window.location;
}


function GoToViewPage(id) {
    location.href = window.ViewUrlPath + id;
    return location.href;
}

function ExceptionCatcher(ex) {
    vm.$data.RequestActive = false;
    vm.$data.LoadingResultDescription = false;
    vm.$data.LoadingResultCodArticuloEan = false;
    vm.$data.CurrentPage = 1;
    vm.$data.TotalPageCount = 1;
    vm.$data.TotalCount = 0;

    if (ex.status === 404) {

        vm.$data.p_ErrorMessage = "El servicio de la Web api no esta disponible.";
        return;
    } else {
        var errorObj = JSON.parse(ex.responseText);
        console.error("Detalles del error: " + errorObj);
        vm.$data.p_ErrorMessage = "Ocurrió un error, intente más tarde nuevamente o consulte con su administrador";
        return;
    }

    vm.$data.p_ErrorMessage = ex;
}
