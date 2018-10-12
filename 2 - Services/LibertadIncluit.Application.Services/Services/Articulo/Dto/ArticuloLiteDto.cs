using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services.Articulo.Dto
{
    public class ArticuloLiteDto : BaseDto
    {
        public string CodigoArticulo { get; set; }
        public string CodEan { get; set; }
        public string Descripcion { get; set; }
    }
}
