using LibertadIncluit.Application.Services.Services.Articulo;
using LibertadIncluit.Application.Services.Services.Articulo.Dto;
using LibertadIncluit.Common.Utils;
using LibertadIncluit.FrontEnd.WebAPI.ErroresEnum;
using LibertadIncluit.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LibertadIncluit.FrontEnd.WebAPI
{

    [RoutePrefix("api/Articulo")]
    public class ArticuloController : ApiController
    {

        readonly IArticuloService _service;
        log4net.ILog _log;

        public ArticuloController(IArticuloService service)
        {
            _service = service;
            SetDependences();
        }

        private void SetDependences()
        {
            if (_log == null)
            {
                ILogger appLogger = LibertadIncluit.Logger.Logger.getLooger();
                appLogger.initLog("LibertadIncluit.FrontEnd.WebAPI");
                _log = appLogger.GetLogger("LibertadIncluit.FrontEnd.WebAPI.ArticuloController");
            }
        }

        [HttpGet]
        [Route("SearchDescription")]
        public List<ArticuloLiteDto> SearchDescription(string description)
        {
            try
            {
                if (Request.Headers.Contains("Sucursal"))
                {
                    int sucursal = Convert.ToInt32(Request.Headers.GetValues("Sucursal").First());

                    return _service.BuscarArticuloPorDescipcion(description, sucursal);
                }
                else
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ExtensionMethods.ToDescription(ErrorHttpEnum.ElEnCabezadoDeLaPeticionNoContieneLaSucursal)));
                }

            }
            catch (Exception ex)
            {
                description = EncodeHelper.DecodeFromBase64String(description);
                _log.ErrorFormat("\n<<Error:>>\n{0}\n<<En:>>\n{1}\n<<Datos:>>\n{2}", ex.Message, ex.StackTrace, description);
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

        }

        [HttpGet]
        [Route("SearchCodigoEan")]
        public ArticuloDto SearchCodigoEan(string codigoArticuloEan)
        {
            try
            {
                if (Request.Headers.Contains("Sucursal"))
                {
                    int sucursal = Convert.ToInt32(Request.Headers.GetValues("Sucursal").First());

                    return _service.SearchCodigoEan(codigoArticuloEan, sucursal);
                }
                else
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ExtensionMethods.ToDescription(ErrorHttpEnum.ElEnCabezadoDeLaPeticionNoContieneLaSucursal)));
                }

            }
            catch (Exception ex)
            {
                _log.ErrorFormat("\n<<Error:>>\n{0}\n<<En:>>\n{1}\n<<Datos:>>\n{2}", ex.Message, ex.StackTrace, codigoArticuloEan);
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }

        }

    }
}
