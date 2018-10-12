using LibertadIncluit.DataAccess.Core;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.Domain.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.DataAccess.Repositories
{
    public interface IRepositorioArticulo
    {

        List<ArticulosSearch> BuscarArticuloPorDescipcion(int sucursal, string descripcion);


        Articulo BuscarDatosGeneralesArticulo(int sucursal, string CodigoArticulo);

        List<EanArticulo> BuscarEansArticulo(Articulo articulo, int sucursal);

        Estadistico BuscarEstadistico(Articulo articulo, EstadisticoEnum estadisticoEnum);
    }
}
