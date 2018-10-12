using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LibertadIncluit.FrontEnd.WebAPI.BaseController
{
    
    public class BaseWebApiController : ApiController
    {

        public BaseWebApiController()
        {

        }

        [HttpGet]
        [Route("GetCurrentTime")]
        public string GetCurrentTime()
        {
            var now = DateTime.Now;
            return now.ToShortDateString() + " " + now.ToString("HH:mm");
        }
    }
}