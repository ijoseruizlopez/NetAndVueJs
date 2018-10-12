using LibertadIncluit.Application.Services.Services.Articulo;
using LibertadIncluit.Application.Services.Services.Validate;
using LibertadIncluit.DataAccess;
using LibertadIncluit.DataAccess.Repositories;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.FrontEnd.Resolver;
using System;
using System.Web.Http;
using System.Web.Mvc;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;

namespace LibertadIncluit.FrontEnd
{
    public static class UnityConfig
    {
        private static Lazy<IUnityContainer> container =
             new Lazy<IUnityContainer>(() =>
             {
                 var container = new UnityContainer();
                 RegisterTypes(container);
                 return container;
             });

        public static IUnityContainer Container => container.Value;


        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IArticuloService, ArticuloService>(new HierarchicalLifetimeManager());
            container.RegisterType<IValidateService, ValidateService>(new HierarchicalLifetimeManager());
            container.RegisterType<IRepositorioArticulo, RepositorioArticulo>(new HierarchicalLifetimeManager());
            container.RegisterType<IRepositorioUser, RepositorioUser>(new HierarchicalLifetimeManager());
        }

        public static void RegisterComponents()
        {

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(Container));
            GlobalConfiguration.Configuration.DependencyResolver = new UnityResolver(Container);
        }

    }
}