var notificationsMixin = {
    data: {
        IsSendable: false,
        Notificaciones: [
            //{
            //    Id: 1,
            //    FechaHora: "26/2/2018 14:00",
            //    Remitente: "MIPS",
            //    Asunto: "Inicio de viaje pendiente",
            //    Destinatarios: [
            //        {
            //            Id: 1,
            //            Detalle: "Cliente - Administrativo"
            //        },
            //        {
            //            Id: 2,
            //            Detalle: "Proveedor - Administrativo"
            //        }
            //    ]
            //},
            //{
            //    Id: 2,
            //    FechaHora: "26/2/2018 14:15",
            //    Remitente: "MIPS",
            //    Asunto: "Módulo Auditoría - Nueva auditoría",
            //    Destinatarios: [
            //        {
            //            Id: 1,
            //            Detalle: "Cliente - Administrativo"
            //        },
            //        {
            //            Id: 2,
            //            Detalle: "Proveedor - Administrativo"
            //        }
            //    ]
            //},
            //{
            //    Id: 3,
            //    FechaHora: "26/2/2018 14:30",
            //    Remitente: "MIPS",
            //    Asunto: "Módulo Custodias - Faltan campos",
            //    Destinatarios: [
            //        {
            //            Id: 1,
            //            Detalle: "Cliente - Administrativo"
            //        },
            //        {
            //            Id: 2,
            //            Detalle: "Proveedor - Administrativo"
            //        }
            //    ]
            //}
        ],

        NotificacionActiva: null,
        Destinatario: "",

        p_ComboDestinatarios: [
            {
                Id: 1,
                Detalle: "Destinatario 1"
            },
            {
                Id: 2,
                Detalle: "Destinatario 2"
            },
            {
                Id: 3,
                Detalle: "Destinatario 3"
            }
        ],

        p_ContactosSuggestions: [],
        p_ContactosSuggestionsBoxTimer: 0,
        p_ContactosSuggestionsBoxEstado: 1,

        CurrentPage: 1,
        CurrentOrder: 1,
        PageSize: 5,
        PreviousPageSize: 5,
        TotalPageCount: 1,
        TotalCount: 0,

        p_ErrorMessage: ""
    },

    methods: {

        AgregarDestinatario: function () {
            this.p_ErrorMessage = "";

            if (!validaEmail(this.DestinatarioManual)) {
                this.p_ErrorMessage = "Ingrese un e-mail válido";
                return;
            }

            this.NotificacionActiva.Destinatarios.push({
                Id: 0,
                Detalle: this.Destinatario
            });
        },

        EliminarDestinatario: function (index) {
            this.NotificacionActiva.Destinatarios.splice(index, 1);
        },

        UpdateContactosSuggestionsBox: function (entity, query) {
            window.UpdateContactosSuggestionsBox(entity, query);
        },

        FillAddresseeField: function (entity, contactoSuggestion) {
            window.FillAddresseeField(entity, contactoSuggestion);
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

            if (this.CurrentPage === 1 || this.CurrentPage === this.TotalPageCount) {
                return "disabled";
            }
            return "";
        },

        GetClassForLastButton: function () {
            if (this.CurrentPage === this.TotalPageCount) {
                return "disabled";
            }
            return "";
        }
    },

    //watch: {
    //    IsSendable: function (value) {
    //        if ($(".summernote").length) {
    //            if (value === false) {
    //                $(".summernote").summernote("disable");
    //            } else {
    //                $(".summernote").summernote("enable");
    //            }
    //        }
    //    }
    //},

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
                    pages = [currentOffsetPage + 1, currentOffsetPage + 2, currentOffsetPage + 3];
                else
                    pages = [currentOffsetPage - 1, currentOffsetPage, currentOffsetPage + 1];

                return pages;
            } else {
                pages = [this.TotalPageCount - 2, this.TotalPageCount - 1, this.TotalPageCount];
                return pages;
            }
        }
    },

    directives: {
        initsummernote: {
            inserted: function () {
                _editors();
            }
        }
    }
};