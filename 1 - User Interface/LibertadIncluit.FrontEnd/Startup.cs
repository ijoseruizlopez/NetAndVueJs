using LibertadIncluit.Application.Services.Services.Articulo;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Unity;
using Unity.Lifetime;

[assembly: OwinStartupAttribute(typeof(LibertadIncluit.FrontEnd.Startup))]
namespace LibertadIncluit.FrontEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
