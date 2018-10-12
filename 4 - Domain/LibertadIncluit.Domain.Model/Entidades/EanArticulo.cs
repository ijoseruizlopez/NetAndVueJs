using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Domain.Model.Entidades
{
    public class EanArticulo: BaseEntity
    {
        public string Ean { get; set; }
        public bool Activo
        {
            get
            {
                return ActivoInt == 1;
            }  
        }
    }
}
