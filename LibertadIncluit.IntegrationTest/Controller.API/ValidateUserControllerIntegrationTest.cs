using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibertadIncluit.FrontEnd.WebAPI;
using LibertadIncluit.Application.Services.Services.Validate;
using LibertadIncluit.DataAccess.Repositories;
using System.Web.Http;
using System.Net.Http;

namespace LibertadIncluit.IntegrationTest.Controller.API
{
    [TestClass]
    public class ValidateUserControllerIntegrationTest
    {

        /*Validamos instancias de objetos, mas no valores, ya que estos datos 
         * pueden cambiar en el tiempo segun a la base a la que se apunte
         Los id tambien pueden fallar ya que */

        ValidateUserController controller;
        IValidateService service;
        IRepositorioUser repositorio;

        public ValidateUserControllerIntegrationTest()
        {
            repositorio = new RepositorioUser();
            service = new ValidateService(repositorio);
            controller = new ValidateUserController(service);
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
        }


        [TestMethod]
        public void ValidateUserWhitComodinSuccessIntegration()
        {
            var idSesionEncode = "NDA2ODA";
            var UserDto = controller.Validate(idSesionEncode);

            Assert.IsTrue(UserDto != null);
        }

        [TestMethod]
        public void ValidateUserWitOoutComodinSucessIntegration()
        {

            var idSesionEncode = "NDA2ODA=";

            var UserDto = controller.Validate(idSesionEncode);

            Assert.IsTrue(UserDto != null);
        }


        [TestMethod]
        public void ValidateUserWhitComodinFailIntegration()
        {
            var idSesionEncode = "NDA2ODA=";

            var UserDto = controller.Validate(idSesionEncode);

            Assert.IsFalse(UserDto == null);
        }

        [TestMethod]
        public void ValidateUserWitOoutComodinFailIntegration()
        {

            var idSesionEncode = "NDA2ODA=";

            var UserDto = controller.Validate(idSesionEncode);

            Assert.IsFalse(UserDto == null);
        }


        [TestMethod]
        [ExpectedException(typeof(HttpResponseException))]
        public void ValidateUserExceptionSucessIntegration()
        {

            var idSesionEncode = "1111";

            var UserDto = controller.Validate(idSesionEncode);
        }
    }

}
