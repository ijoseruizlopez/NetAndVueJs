using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibertadIncluit.DataAccess.Repositories;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.UnitTest.DataAccess;
using LibertadIncluit.Common.Utils;

namespace LibertadIncluit.UnitTest.DataAccess
{
    [TestClass]
    public class DecodeUnitTest
    {

        [TestMethod]
        public void DecodeWhitComodinSuccess()
        {
            var idSesionEncode = "NDA2ODA";
  
            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);
            Assert.IsTrue(idSesionDecode != null && idSesionDecode == "40680");
        }

        [TestMethod]
        public void DecodeWitOoutComodinSucess()
        {

            var  idSesionEncode = "NDA2ODA=";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsTrue(idSesionDecode != null && idSesionDecode == "40680");
        }


        [TestMethod]
        public void DecodeWhitComodinFail()
        {
            var idSesionEncode = "NDA2ODA";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsFalse(idSesionDecode != "40680");
        }

        [TestMethod]
        public void DecodeWitOoutComodinFail()
        {

            var idSesionEncode = "NDA2ODA=";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsFalse(idSesionDecode != "40680");
        }


        [TestMethod]
        public void DecodeTextLargeWhitComodinSuccess()
        {
            var idSesionEncode = "NQAAADMAAAAzAAAANwAAADcAAAA";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);
            Assert.IsTrue(idSesionDecode != null && idSesionDecode == "53377");
        }

        [TestMethod]
        public void DecodeTextLargeWitOoutComodinSucess()
        {

            var idSesionEncode = "NQAAADMAAAAzAAAANwAAADcAAAA=";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsTrue(idSesionDecode != null && idSesionDecode == "53377");
        }


        [TestMethod]
        public void DecodeTextLargeWhitComodinFail()
        {
            var idSesionEncode = "NQAAADMAAAAzAAAANwAAADcAAAA";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsFalse(idSesionDecode != "53377");
        }

        [TestMethod]
        public void DecodeTextLargeWitOoutComodinFail()
        {

            var idSesionEncode = "NQAAADMAAAAzAAAANwAAADcAAAA=";

            var idSesionDecode = EncodeHelper.DecodeFromBase64String(idSesionEncode);

            Assert.IsFalse(idSesionDecode != "53377");
        }
    }
}
