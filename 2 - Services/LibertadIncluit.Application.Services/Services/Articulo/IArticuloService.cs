using LibertadIncluit.Application.Services.Services.Articulo.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services.Articulo
{
    public interface IArticuloService
    {
        ArticuloDto SearchCodigoEan(string codArticuloEan, int sucursal);
        List<ArticuloLiteDto> BuscarArticuloPorDescipcion(string text, int sucursal);

    }
}
