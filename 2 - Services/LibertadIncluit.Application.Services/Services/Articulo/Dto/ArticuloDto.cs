using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services.Articulo.Dto
{
    public class ArticuloDto : BaseDto
    {

        public ArticuloDto()
        {
            Grupo = new EstadisticoDto();
            Sector = new EstadisticoDto();
            Familia = new EstadisticoDto();
            SubFamilia = new EstadisticoDto();
            Categoria = new EstadisticoDto();
            SubCategoria = new EstadisticoDto();
        }

        public string CodigoArticulo { get; set; }
        public string Descripcion { get; set; }
        public List<EanArticuloDto> Eans { get; set; }

        public string Estado { get; set; }

        public EstadisticoDto Grupo { get; set; }

        public EstadisticoDto Sector { get; set; }

        public EstadisticoDto Familia { get; set; }

        public EstadisticoDto SubFamilia { get; set; }

        public EstadisticoDto Categoria { get; set; }

        public EstadisticoDto SubCategoria { get; set; }

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
