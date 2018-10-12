using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LibertadIncluit.FrontEnd.Controllers
{
    public class ErrorController : Controller
    {
        [Route("RequestError")]
        // GET: Error
        public ActionResult PageNotFound()
        {
            return View();
        }
    }
}