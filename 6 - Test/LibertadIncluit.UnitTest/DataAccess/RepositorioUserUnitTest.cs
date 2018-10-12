using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibertadIncluit.DataAccess.Repositories;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.UnitTest.DataAccess;

namespace LibertadIncluit.UnitTest.DataAccess
{
    [TestClass]
    public class RepositorioUserUnitTest
    {
        IRepositorioUser repositorioUser;

        public RepositorioUserUnitTest()
        {
            repositorioUser = new RepositorioUser();
        }

        [TestMethod]
        public void ValidateUserSuccess()
        {
            var idSesion = "40680";
            var idSistema = "206";
            var  user  = repositorioUser.ValidateUser(idSesion, idSistema);

            Assert.IsTrue(user!=null);
        }

        [TestMethod]
        public void ValidateUserFail()
        {
            var idSesion = "40680";
            var idSistema = "102";
            var user = repositorioUser.ValidateUser(idSesion, idSistema);

            Assert.IsTrue(user == null);
        }

    }
}
