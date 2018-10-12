using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Domain.Model.Entidades
{
    public class User
    {

        public string Legajo { get; set; }

        public string nombre_usuario { get; set; }

        public int id_sistema { get; set; }

        public string nom_sistema { get; set; }

        public string nombre_suc { get; set; }

        public string sucursal { get; set; }

        public string perfil { get; set; }
    }
}
