using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Domain.Model.Entidades
{
    public class ArticulosSearch : BaseEntity
    {
        public string CodigoArticulo { get; set; }
        public string CodEan { get; set; }
        public string Descripcion { get; set; }
    }
}
