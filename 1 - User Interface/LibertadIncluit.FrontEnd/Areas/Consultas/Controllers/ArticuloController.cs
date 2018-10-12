using LibertadIncluit.FrontEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LibertadIncluit.FrontEnd.Areas.LibertadConsultas.Controllers
{
    [RouteArea("Consultas")]
    public class ArticuloController : Controller
    {
        // GET: LibertadConsultas/Articulo
        [Route("/Consultas/Articulo/Buscar/{id}")]
        public ActionResult Buscar(string id)
        {
            ViewBag.UsuarioEncode = id;
            return View("MainPanel");
        }
    }
}