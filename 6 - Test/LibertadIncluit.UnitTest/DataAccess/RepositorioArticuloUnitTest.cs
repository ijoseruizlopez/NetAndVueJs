using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibertadIncluit.DataAccess.Repositories;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.Domain.Model.Enums;

namespace LibertadIncluit.UnitTest.DataAccess
{
    [TestClass]
    public class RepositorioArticuloUnitTest
    {
        IRepositorioArticulo repositorioArticulo;

        public RepositorioArticuloUnitTest()
        {
            repositorioArticulo = new RepositorioArticulo();
        }

        [TestMethod]
        public void SearchArticuloPorDescipcionSucess()
        {
            var descripcion = "coca cola x";
            var sucursal = 102;
            var  listArticulos  = repositorioArticulo.BuscarArticuloPorDescipcion(sucursal, descripcion);
            Assert.IsTrue(listArticulos.Count > 0);
        }

        [TestMethod]
        public void SearchArticuloPorDescipcionFail()
        {
            var descripcion = "coca cola x";
            var sucursal = 102;

            var listArticulos = repositorioArticulo.BuscarArticuloPorDescipcion(sucursal, descripcion);
            Assert.IsFalse(listArticulos.Count == 0);
        }


        [TestMethod]
        public void SearchDatosGeneralesArticuloSucess()
        {
            var codigoArticulo = "36005";
            var sucursal = 102;

            var articulo = repositorioArticulo.BuscarDatosGeneralesArticulo(sucursal, codigoArticulo);

            Assert.IsTrue(articulo!=null);
        }


        [TestMethod]
        public void SearchDatosGeneralesArticuloFail()
        {
            var codigoArticulo = "36005";
            var sucursal = 102;

            var articulo = repositorioArticulo.BuscarDatosGeneralesArticulo(sucursal, codigoArticulo);

            Assert.IsFalse(articulo == null);
        }


        [TestMethod]
        public void SearchEansArticuloSucesss()
        {
          
            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };
            var sucursal = 102;

            var eans = repositorioArticulo.BuscarEansArticulo(articulo, sucursal);

            Assert.IsTrue(eans != null && eans.Count>0);
        }



        [TestMethod]
        public void SearchEansArticuloFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };
            var sucursal = 102;

            var eans = repositorioArticulo.BuscarEansArticulo(articulo, sucursal);

            Assert.IsFalse(eans.Count == 0);
        }


        [TestMethod]
        public void SearchEstadisticoGrupoSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico= repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Grupo);

            Assert.IsTrue(estadistico!=null && estadistico.Descripcion.Equals("MASIVO"));
        }



        [TestMethod]
        public void SearchEstadisticoGrupoFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Grupo);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("MASIVO"));
        }


        [TestMethod]
        public void SearchEstadisticoSectorSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Sector);

            Assert.IsTrue(estadistico != null && estadistico.Descripcion.Equals("BEBIDAS ALCOHOL"));
        }

        
        [TestMethod]
        public void SearchEstadisticoSectorFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Sector);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("BEBIDAS ALCOHOL"));
        }

        [TestMethod]
        public void SearchEstadisticoFamiliaSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Familia);

            Assert.IsTrue(estadistico != null && estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoFamiliaFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Familia);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoSubfamiliaSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.SubFamilia);

            Assert.IsTrue(estadistico != null && estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoSubfamiliaFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.SubFamilia);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoCategoriaSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Categoria);

            Assert.IsTrue(estadistico != null && estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoCategoriaFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.Categoria);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("FERNETS"));
        }


        [TestMethod]
        public void SearchEstadisticoSubCategoriaSucesss()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.SubCategoria);

            Assert.IsTrue(estadistico != null && estadistico.Descripcion.Equals("750ML"));
        }


        [TestMethod]
        public void SearchEstadisticoSubCategoriaFail()
        {

            Articulo articulo = new Articulo() { CodigoArticulo = "36005" };

            var estadistico = repositorioArticulo.BuscarEstadistico(articulo, EstadisticoEnum.SubCategoria);

            Assert.IsFalse(estadistico == null || !estadistico.Descripcion.Equals("750ML"));
        }
    }
}
