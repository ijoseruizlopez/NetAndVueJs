using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Domain.Model.Entidades
{
    public class Articulo : BaseEntity
    {
        public List<EanArticulo> Eans { get; set; }

        public Estadistico Grupo { get; set; }

        public Estadistico Sector { get; set; }

        public Estadistico Familia { get; set; }

        public Estadistico SubFamilia { get; set; }

        public Estadistico Categoria { get; set; }

        public Estadistico SubCategoria { get; set; }

        public string CodigoArticulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }

        public string ClasificacionSurtido { get; set; }

        public string HabilitadoParaVenta { get; set; }

        public int? Stock { get; set; }

        public string UnidadMedida { get; set; }

        public int? StockEnTransito { get; set; }

        public string FechaDeEnvio { get; set; }

        public decimal? PrecioVigente { get; set; }

        public string TipoPrecio { get; set; }

        public string FechaUltimaModificacion { get; set; }

        public string UrlImagen { get; set; }

        public decimal? Ancho { get; set; }

        public decimal? Largo { get; set; }

        public decimal? Altura { get; set; }
 
        public decimal? Peso { get; set; }


    }
}
