using System.Web.Mvc;

namespace LibertadIncluit.FrontEnd.Areas.LibertadConsultas
{
    public class LibertadConsultasAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Consultas";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Consultas_default",
                "Consultas/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "LibertadIncluit.FrontEnd.Areas.LibertadConsultas.Controllers" }
            );
        }
    }
}