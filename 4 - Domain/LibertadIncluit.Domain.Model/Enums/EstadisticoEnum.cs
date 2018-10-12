using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Domain.Model.Enums
{
    public enum EstadisticoEnum
    {
        [Description("Grupo")]
        Grupo = 1,

        [Description("Sector")]
        Sector = 2,

        [Description("Familia")]
        Familia = 3,

        [Description("SubFamilia")]
        SubFamilia = 4,

        [Description("Categoria")]
        Categoria = 5,

        [Description("SubCategoria")]
        SubCategoria = 6,
    }
}
