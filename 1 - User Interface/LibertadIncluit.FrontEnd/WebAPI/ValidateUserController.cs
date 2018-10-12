using LibertadIncluit.Application.Services.Services.Validate;
using LibertadIncluit.Application.Services.Services.Validate.Dto;
using LibertadIncluit.Logger;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LibertadIncluit.FrontEnd.WebAPI
{

    [RoutePrefix("api/ValidateUser")]
    public class ValidateUserController : ApiController
    {
        readonly IValidateService _service;
        log4net.ILog _log;

        public ValidateUserController(IValidateService service)
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
                _log = appLogger.GetLogger("LibertadIncluit.FrontEnd.WebAPI.ValidateUserController");
            }
        }

        [HttpGet]
        [Route("Validate")]
        public UserDto Validate(string text)
        {
            try
            {
                return _service.ValidarUsuario(text);
            }
            catch (Exception ex)
            {
                _log.ErrorFormat("\n<<Error:>>\n{0}\n<<En:>>\n{1}\n<<Datos:>>\n{2}", ex.Message, ex.StackTrace, text);
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
           
        }
    }
}
