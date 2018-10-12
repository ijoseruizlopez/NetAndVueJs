// Comon helper for Table Crud operations

var vm = new Vue({
    el: window.ListBindElementName,
    data: {
        TextToSearch: "",
        PreviousTextToSearch: "",
        CurrentPage: 1,
        CurrentOrder: 1,
        PageSize: 20,
        PreviousPageSize: 20,
        TotalPageCount: 1,
        TotalCount: 0,
        Entities: [],

        p_ActionMessage: "",
        p_ErrorMessage: ""
    },

    computed: {
        PageButtons: function () {
            var pages;

            if (this.TotalPageCount <= 3) {
                pages = [1, 2, 3];
                return pages;
            } else if (this.CurrentPage < this.TotalPageCount) {
                var offset = 0;
                if (this.CurrentPage === 1) {
                    offset = 1;
                }
                var currentOffsetPage = this.CurrentPage + offset;

                if (currentOffsetPage <= 1)
                    pages = [currentOffsetPage + 1, currentOffsetPage + 2, currentOffsetPage+3];
                else
                    pages = [currentOffsetPage - 1, currentOffsetPage, currentOffsetPage + 1];

                return pages;
            } else {
                pages = [this.TotalPageCount - 2, this.TotalPageCount - 1, this.TotalPageCount];
                return pages;
            }
        }
    },

    methods: {
        GetClassForButton: function(buttonNumber) {
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

        GetClassForLastButton: function() {
            if (this.CurrentPage === this.TotalPageCount) {
                return "disabled";
            }
            return "";
        },

        Refresh: function () {

            this.p_ErrorMessage = "";

            // La pagina nunca puede ser menos de 5 elementos
            if (vm.$data.PageSize <= 5) {
                vm.$data.PageSize = 5;
            }

            if (!vm.$data.PageSize) {
                vm.$data.PageSize = 20;
            }

            if (vm.$data.PreviousTextToSearch !== vm.$data.TextToSearch) {
                // Si cambiaron la busqueda, nos vamos a la pagina 1 y actualizamos la variable que recuerda el valor anterior
                vm.$data.CurrentPage = 1;
                vm.$data.PreviousTextToSearch = vm.$data.TextToSearch;
            }
            if (vm.$data.PreviousPageSize !== vm.$data.PageSize) {
                // Si cambiaron el largo de pagina, nos vamos a la pagina 1 y actualizamos la variable que recuerda el valor anterior
                vm.$data.CurrentPage = 1;
                vm.$data.PreviousPageSize = vm.$data.PageSize;
            }


            var page = vm.$data.CurrentPage;
            var pageSize = vm.$data.PageSize;
            var idFilter1 = vm.$data.IdFilter1;
            var currentOrder = vm.$data.CurrentOrder;


            //Si hay mas filtros concatenas con +|+

            //Codificamos el text to search
            var textToSearch = Base64.encode(this.TextToSearch);


            var url = window.WebApiSearchUrl + "/Search/" + page + "/" + pageSize
                + "?text=" + textToSearch + "&order=" + currentOrder;

            $.getJSON(url, { __: new Date().getTime() }) // con el getTime() evitamos que IE cachee la web api
                .done(function (data) {
                    if (data == null) {
                        vm.$data.p_ErrorMessage = window.WebApi_NoDataToShow;
                        return;
                    }

                    // Nos guardamos la cultura actual
                    window.Global_CurrentCulture = data.CurrentCulture;

                    if (data.CurrentPage > data.TotalPageCount) {
                        data.CurrentPage = data.TotalPageCount;
                    }

                    //Vaciamos el array de items seleccionados
                    vm.$data.SelectedEntities = [];

                    // Metemos los datos devueltos por la webapi en el viewmodel    
                    vm.$data.CurrentPage = parseInt(data.CurrentPage === 0 && data.TotalCount > 0 ? 1 : data.CurrentPage);
                    vm.$data.PageSize = parseInt(data.PageSize);
                    vm.$data.TotalPageCount = parseInt(data.TotalPageCount);
                    vm.$data.TotalCount = parseInt(data.TotalCount);
                    vm.$data.Entities = data.Result;
                })
                .error(ExceptionCatcher);
        },

        ChangeOrderWithoutRefresh: function(columnNumber) {
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
            this.Refresh();
        },

        ChangePageSize: function (pageSize) {
            this.PageSize = parseInt(pageSize);
            vm.Refresh();
        },

        ClearTextToSearch: function() {
            this.TextToSearch = "";
            vm.Refresh();
        },

        EditItem: function(itemId) {
            return GoToEditPage(itemId);
        },

        ViewItem: function (itemId) {
            return GoToViewPage(itemId);
        },

        DeleteItem: function(itemId) {
            return GoToDeletePage(itemId);
        },

        CancelItem: function (itemId, isCancelled) {
            return GoToCancelPage(itemId, isCancelled);
        },

        SelectItem: function (item) {

            if (this.IsItemSelected(item.Id)) {
                var index = -1;

                for (var i = 0; i < this.SelectedEntities.length; i++) {
                    if (this.SelectedEntities[i].Id === item.Id) {
                        index = i;
                        break;
                    }
                }

                if (index > -1) {
                    this.SelectedEntities.splice(index, 1);
                }
            } else {
                this.SelectedEntities.push(item);
            }
        },

        SelectAllItems: function () {
            if (this.Entities.length === this.SelectedEntities.length) {
                //Si estan todos los items seleccionados, dejamos el array vacio
                this.SelectedEntities = [];
            } else {
                this.SelectedEntities = [];
                for (var i = 0; i < this.Entities.length; i++) {
                    this.SelectedEntities.push(this.Entities[i]);
                }
            }
        },

        IsItemSelected: function(itemId) {
            for (var i = 0; i < this.SelectedEntities.length; i++) {
                if (this.SelectedEntities[i].Id === itemId) {
                    return true;
                }
            }

            return false;
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


function TableBind() {
    vm.Refresh();
}

function SavePaginationCookies(includeFilter) {
    var expiration = 5 * 60; //5 minutos
    var expirationPageSize = 31556926;
    SaveCookie(window.PaginationCookiesName + "TextToSearch", Base64.encode(vm.$data.TextToSearch), expiration);
    SaveCookie(window.PaginationCookiesName + "PreviousTextToSearch", Base64.encode(vm.$data.PreviousTextToSearch), expiration);
    SaveCookie(window.PaginationCookiesName + "CurrentPage", vm.$data.CurrentPage, expiration);
    SaveCookie(window.PaginationCookiesName + "PageSize", vm.$data.PageSize, expirationPageSize);
    SaveCookie(window.PaginationCookiesName + "ColumnOrder", vm.$data.CurrentOrder, expiration);

    if (includeFilter) {
        if (window.HaveTextAndFilterCombo) {
            if (window.HaveTextAndFilterCombo || window.HaveOneTextAndCombo) {
                SaveCookie(window.PaginationCookiesName + "IdFilter1", vm.$data.IdFilter1, expiration);
            }
        } else {
            if (window.HaveOneFilterCombo) {
                SaveCookie(window.PaginationCookiesName + "IdFilter1", vm.$data.IdFilter1, expiration);
            }
            if (window.HaveTwoFilterCombo) {
                SaveCookie(window.PaginationCookiesName + "IdFilter1", vm.$data.IdFilter1, expiration);
                SaveCookie(window.PaginationCookiesName + "IdFilter2", vm.$data.IdFilter2, expiration);
            }
        }

        if (window.filtrosParaViaje) {
            var expiracionCookiesViajes = 8 * 60 * 60; //8 horas

            SaveCookie(window.PaginationCookiesName + "IdFilter1", vm.$data.IdFilter1, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "IdFilter2", vm.$data.IdFilter2, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "IdFilter3", vm.$data.IdFilter3, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "IdFilter4", vm.$data.IdFilter4, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "IdFilter5", vm.$data.IdFilter5, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "IdFilter6", vm.$data.IdFilter6, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "FilterDate1", vm.$data.FilterDate1, expiracionCookiesViajes);
            SaveCookie(window.PaginationCookiesName + "FilterDate2", vm.$data.FilterDate2, expiracionCookiesViajes);
        }

    }
}

function GoToFirstPage() {

    if (vm.$data.CurrentPage === 1 || vm.$data.CurrentPage === 0) {
        return;
    }
    vm.$data.CurrentPage = 1;
    vm.Refresh();
}

function PageBackward() {
    if (vm.$data.CurrentPage === 1 || vm.$data.CurrentPage === 0) {
        return;
    }
    vm.$data.CurrentPage = vm.$data.CurrentPage - 10;
    if (vm.$data.CurrentPage < 1) {
        vm.$data.CurrentPage = 1;
    }
    vm.Refresh();
}

function GoToPage(page) {
    page = page ? parseInt(page): 1;
    if (page > vm.$data.TotalPageCount) {
        return;
    }
    if (vm.$data.CurrentPage === page) {
        return;
    }
    vm.$data.CurrentPage = page;
    vm.Refresh();
}

function PageForward() {
    if (vm.$data.CurrentPage === vm.$data.TotalPageCount) {
            return;
    }
    vm.$data.CurrentPage = vm.$data.CurrentPage + 10;
    if (vm.$data.CurrentPage > vm.$data.TotalPageCount) {
        vm.$data.CurrentPage = vm.$data.TotalPageCount;
    }
    vm.Refresh();
}

function GoToLastPage() {
    if (vm.$data.CurrentPage === vm.$data.TotalPageCount) {
        return;
    }
    vm.$data.CurrentPage = vm.$data.TotalPageCount;
    vm.Refresh();
}

function GoToEditPage(id) {
    location.href = window.EditUrlPath + id;
    return location.href;
}

function GoToEditWithoutChangesPage(id) {
    location.href = window.EditWithoutChangesUrlPath + id;
}

function GoToRenewWithoutChangesPage(id) {
    location.href = window.RenewUrlPath + id;
}

function GoToRenewWithChangesPage(id) {
    location.href = window.RenewWithChangesUrlPath + id;
}

function GoToExtendPage(id) {
    location.href = window.ExtendUrlPath + id;
}

function GoToDeletePage(id) {
    location.href = window.DeleteUrlPath + id;
    return location.href;
}

function GoToCancelPage(id, isCancelled) {
    location.href = window.CancelUrlPath + id + "?isCancelled=" + isCancelled;
    return location.href;
}

function GoToViewPage(id) {
    location.href = window.ViewUrlPath + id;
    return location.href;
}

function GoToViewPageTravel(id, tipoServicio) {
    location.href = window.ViewUrlPath + id + "?tipoServicio=" + tipoServicio;
    return location.href;
}

function GoToTravelAuthorizationPage(id) {
    location.href = window.AuthorizationUrlPath + id;
    return location.href;
}

function GoToStartTravelPage(id) {
    location.href = window.StartUrlPath + id;
    return location.href;
}

function GoToCancelTravelPage(id) {
    location.href = window.CancelUrlPath + id;
    return location.href;
}

function GoToCancelTravelExtranPage(id) {
    location.href = window.CancelExtranetUrlPath + id;
    return location.href;
}

function SinisterTravelPage(id) {
    location.href = window.SinesterUrlPath + id;
    return location.href;
}

function GoToFinalizeTravelPage(id) {
    location.href = window.FinalizehUrlPath + id;
    return location.href;
}

function GoToAssignTravelPage(id) {
    location.href = window.AssignTravelUrlPath + id;
    return location.href;
}

function GoToTrackingPage(id) {
    location.href = window.TrackingUrlPath + id;
    return location.href;
}

function GoToCustomerConciliatePage(id) {
    location.href = window.CustomerConciliateUrlPath + id;
    return location.href;
}

function GoToMoveServicesPage(id) {
    location.href = window.MoveServicesUrlPath + id;
    return location.href;
}

function ExceptionCatcher(ex) {
    vm.$data.CurrentPage = 1;
    vm.$data.TotalPageCount = 1;
    vm.$data.TotalCount = 0;

    if (ex.status === 404) {
 
        vm.$data.p_ErrorMessage = "Web api not found.";
        return;
    }
    if (ex.status === 401) {
        //if (ex.statusText === "Unauthorized") {
        //    location.reload();
        //    return;
        //}
        vm.$data.p_ErrorMessage = "You have insufficient rights to access this resource.";
        return;
    }
    if (ex.status === 500) {
        var errorObj = JSON.parse(ex.responseText);
        vm.$data.p_ErrorMessage = errorObj.error;
        return;
    }
    vm.$data.p_ErrorMessage = ex;
}

// SearchPanel Loading circle
$(document).ajaxStart(function () {
    $('#SearchPanelLoadingCircle').show();
});
$(document).ajaxStop(function () {
    $('#SearchPanelLoadingCircle').hide();
});
