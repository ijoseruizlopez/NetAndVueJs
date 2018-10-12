using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibertadIncluit.FrontEnd.WebAPI;
using LibertadIncluit.Application.Services.Services.Validate;
using LibertadIncluit.DataAccess.Repositories;
using System.Web.Http;
using System.Net.Http;
using LibertadIncluit.Application.Services.Services.Articulo;

namespace LibertadIncluit.IntegrationTest.Controller.API
{
    [TestClass]
    public class ArticuloControllerIntegrationTest
    {
        ArticuloController controller;
        IArticuloService service;
        IRepositorioArticulo repositorio;

        public ArticuloControllerIntegrationTest()
        {
            repositorio = new RepositorioArticulo();
            service = new ArticuloService(repositorio);
            controller = new ArticuloController(service);
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
        }

        [TestMethod]
        public void ValidateSearchDescriptionSuccessIntegration()
        {
            //Encode => coca cola x
            var idSesionEncode = "Y29jYSBjb2xhIHg=";

            if (!controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Add("Sucursal", "102");

            var listArticuloLiteDto = controller.SearchDescription(idSesionEncode);

            Assert.IsTrue(listArticuloLiteDto != null);
        }

        [TestMethod]
        public void ValidateSearchDescriptionFailIntegration()
        {
            //Encode => coca cola x
            var textEncode = "Y29jYSBjb2xhIHg=";

            if (!controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Add("Sucursal", "102");

            var listArticuloLiteDto = controller.SearchDescription(textEncode);

            Assert.IsTrue(listArticuloLiteDto != null);
        }

        [TestMethod]
        public void ValidateSearchCodigoEanSuccessIntegration()
        {
            if (!controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Add("Sucursal", "102");

            //Encode => coca cola x
            var textEncode = "404295";

            var listArticuloLiteDto = controller.SearchCodigoEan(textEncode);

            Assert.IsTrue(listArticuloLiteDto != null);
        }

        [TestMethod]
        public void ValidateSearchCodigoEanFailIntegration()
        {
            //Encode => coca cola x
            var textEncode = "404295";

            if (!controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Add("Sucursal", "102");

            var listArticuloLiteDto = controller.SearchCodigoEan(textEncode);

            Assert.IsFalse(listArticuloLiteDto == null);
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException))]
        public void ValidateSearchDescriptionExceptionSucessIntegration()
        {
            if (controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Remove("Sucursal");

            var textEncode = "Y29jYSBjb2xhIHg=";

            controller.SearchDescription(textEncode);
        }

        [TestMethod]
        [ExpectedException(typeof(HttpResponseException))]
        public void ValidateSearchCodigoEanExceptionSucessIntegration()
        {

            if (controller.Request.Headers.Contains("Sucursal"))
                controller.Request.Headers.Remove("Sucursal");

            var textEncode = "404295";

            controller.SearchCodigoEan(textEncode);
        }
    }

}
