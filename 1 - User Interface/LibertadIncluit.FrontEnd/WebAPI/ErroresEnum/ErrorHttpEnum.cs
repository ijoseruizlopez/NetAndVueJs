using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace LibertadIncluit.FrontEnd.WebAPI.ErroresEnum
{
    public enum ErrorHttpEnum
    {
        [Description("No está Autorizado A realizar la búsqueda ya que el Encabezado de la petición no posee los datos de la sucursal.")]
        ElEnCabezadoDeLaPeticionNoContieneLaSucursal = 1,
    }
}