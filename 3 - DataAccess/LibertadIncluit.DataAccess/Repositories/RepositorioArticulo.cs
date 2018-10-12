using LibertadIncluit.DataAccess.Core;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.Domain.Model.Enums;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.DataAccess.Repositories
{
    public class RepositorioArticulo:  RepositoryBase<Articulo>, IRepositorioArticulo
    {

        public List<ArticulosSearch> BuscarArticuloPorDescipcion(int sucursal,string descripcion)
        {
            try
            {
                using (var ctx = new LibertadContext())
                {
                    var pSurcusal = new OracleParameter("p_sucursal", sucursal);
                    var pDescripcion = new OracleParameter("p_desc_articulo", descripcion);
                    var cCursor = new OracleParameter("c_articulo", OracleDbType.RefCursor, ParameterDirection.Output);
                    return ctx.Database.SqlQuery<ArticulosSearch>("BEGIN  LI_PKG_ARTICULO_CONSULTA.P_BUSCAR_ARTICULO_DESCRIPCION(:p_sucursal, :p_desc_articulo, :c_articulo); end; ",
                         pSurcusal,
                         pDescripcion,
                         cCursor).ToList();
                }
            }
            catch
            {

                throw;
            }

        }

        public Articulo BuscarDatosGeneralesArticulo(int sucursal, string CodigoArticulo)
        {
            try
            {
                using (var ctx = new LibertadContext())
                {
                    var pSurcusal = new OracleParameter("p_sucursal", sucursal);
                    var pCodigoArticulo = new OracleParameter("p_CodigoArticulo", CodigoArticulo);
                    var cCursor = new OracleParameter("c_datosArticulo", OracleDbType.RefCursor, ParameterDirection.Output);

                    return ctx.Database.SqlQuery<Articulo>("BEGIN  LI_PKG_ARTICULO_CONSULTA.P_BUSCAR_DATOS_GENERALES(:p_sucursal, :p_CodigoArticulo, :c_datosArticulo); end; ",
                         pSurcusal,
                         pCodigoArticulo,
                         cCursor).FirstOrDefault();
                }
            }
            catch
            {
                throw;
            }
        }


        public List<EanArticulo> BuscarEansArticulo(Articulo articulo, int sucursal)
        {
            try
            {
                using (var ctx = new LibertadContext())
                {
                    var pSurcusal = new OracleParameter("p_sucursal", sucursal);
                    var pCodigoArticulo = new OracleParameter("p_CodigoArticulo", articulo.CodigoArticulo);
                    var cCursor = new OracleParameter("c_datosEAN", OracleDbType.RefCursor, ParameterDirection.Output);

                    return  ctx.Database.SqlQuery<EanArticulo>("BEGIN  LI_PKG_ARTICULO_CONSULTA.P_BUSCAR_EANS(:p_sucursal, :p_CodigoArticulo, :c_datosEAN); end; ",
                         pSurcusal,
                         pCodigoArticulo,
                         cCursor).ToList();

                }
            }
            catch
            {
                throw;
            }
        }

        public Estadistico BuscarEstadistico(Articulo articulo, EstadisticoEnum estadisticoEnum)
        {
            try
            {
                using (var ctx = new LibertadContext())
                {
                    var pCodigoArticulo = new OracleParameter("p_CodigoArticulo", articulo.CodigoArticulo);
                    var pTipoEstadistico = new OracleParameter("p_TipoEstadistico", (int) estadisticoEnum);

                    var cCursor = new OracleParameter("c_datosEstadistico", OracleDbType.RefCursor, ParameterDirection.Output);

                    return ctx.Database.SqlQuery<Estadistico>("BEGIN  LI_PKG_ARTICULO_CONSULTA.P_BUSCAR_DATOS_ESTADISTICO(:p_CodigoArticulo, :p_TipoEstadistico, :c_datosEstadistico); end; ",
                         pCodigoArticulo,
                         pTipoEstadistico,
                         cCursor).FirstOrDefault();

                }
            }
            catch
            {
                throw;
            }
        }
    }
}
