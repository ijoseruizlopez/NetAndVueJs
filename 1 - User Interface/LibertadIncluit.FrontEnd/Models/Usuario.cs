using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibertadIncluit.FrontEnd.Models
{
    public class Usuario
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }

        public int Legajo { get; set; }

        public int Sucursal { get; set; }
    }
}