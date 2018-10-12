using LibertadIncluit.Application.Services.Services.Articulo.Dto;
using LibertadIncluit.Application.Services.Services.Validate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Factory
{
    public class FactoryDtoUtil
    {

        private static FactoryDtoUtil _factoryDtoUtil;

        public List<ArticuloLiteDto> _listaLiteArticuloDto { get; set; }

        public  List<ArticuloDto> _listaArticulosDto { get; set; }


        private FactoryDtoUtil()
        {
            createArticuloLiteDto();
            createArticulosDto();
        }

        public static FactoryDtoUtil getFactoryDtoUtil()
        {
            if (_factoryDtoUtil == null)
                _factoryDtoUtil = new FactoryDtoUtil();

            return _factoryDtoUtil;
        }

        private  void createArticuloLiteDto()
        {
            _listaLiteArticuloDto = new List<ArticuloLiteDto>();

            _listaLiteArticuloDto.Add(new ArticuloLiteDto { Id = 1, CodigoArticulo = "73127", CodEan = "7791813050353", Descripcion = "PEPSI LATA X 310 CC" });
            _listaLiteArticuloDto.Add(new ArticuloLiteDto { Id = 2, CodigoArticulo = "341", CodEan = "7790895640896", Descripcion = "SPRITE LATA X 310 CC" });
            _listaLiteArticuloDto.Add(new ArticuloLiteDto { Id = 3, CodigoArticulo = "340", CodEan = "7790895005114", Descripcion = "COCA LATA X 310 CC" });
        }



        private  void createArticulosDto()
        {
            _listaArticulosDto = new List<ArticuloDto>();

            ArticuloDto articuloUno = new ArticuloDto();

            articuloUno.CodigoArticulo = "73127";
            articuloUno.Descripcion = "PEPSI LATA X 310 CC";
            articuloUno.Estado = "Activo";
            articuloUno.ClasificacionSurtido = "A";
            articuloUno.HabilitadoParaVenta = "SI";
            articuloUno.Stock = 10;
            articuloUno.UnidadMedida = "CM3";
            articuloUno.StockEnTransito = 5;
            articuloUno.FechaDeEnvio = "01/01/2019";
            articuloUno.PrecioVigente = 40;
            articuloUno.TipoPrecio = "Barato";
            articuloUno.FechaUltimaModificacion = "02/02/2019";
            articuloUno.UrlImagen = "/wwwroot/assets/imagenesArticulo/Pepsi.png";
            articuloUno.Peso = 50;



            articuloUno.Grupo = new EstadisticoDto() { Id = 3, Descripcion = "Masivo" };
            articuloUno.Sector = new EstadisticoDto() { Id = 40, Descripcion = "Bebidas" };
            articuloUno.Familia = new EstadisticoDto() { Id = 1, Descripcion = "Gaseosas" };
            articuloUno.SubFamilia = new EstadisticoDto() { Id = 3420, Descripcion = "Gaseosas Cola" };
            articuloUno.Categoria = new EstadisticoDto() { Id = 3, Descripcion = "Regular" };
            articuloUno.SubCategoria = new EstadisticoDto() { Id = 5, Descripcion = "Mas de 2 Lts" };

            
            

            _listaArticulosDto.Add(articuloUno);


            ArticuloDto articuloDos = new ArticuloDto();

            articuloDos.CodigoArticulo = "341";
            articuloDos.Descripcion = "SPRITE LATA X 310 CC";
            articuloDos.Estado = "Activo";
            articuloDos.ClasificacionSurtido = "A";
            articuloDos.HabilitadoParaVenta = "SI";
            articuloDos.Stock = 10;
            articuloDos.UnidadMedida = "CM3";
            articuloDos.StockEnTransito = 5;
            articuloDos.FechaDeEnvio = "01/01/2019";
            articuloDos.PrecioVigente = 40;
            articuloDos.TipoPrecio = "Barato";
            articuloDos.FechaUltimaModificacion = "02/02/2019";
            articuloDos.UrlImagen = "/wwwroot/assets/imagenesArticulo/Sprite.png";
            articuloDos.Peso = 50;

            articuloDos.Grupo = new EstadisticoDto() { Id = 3, Descripcion = "Masivo" };
            articuloDos.Sector = new EstadisticoDto() { Id = 40, Descripcion = "Bebidas" };
            articuloDos.Familia = new EstadisticoDto() { Id = 1, Descripcion = "Gaseosas" };
            articuloDos.SubFamilia = new EstadisticoDto() { Id = 3420, Descripcion = "Gaseosas Cola" };
            articuloDos.Categoria = new EstadisticoDto() { Id = 3, Descripcion = "Regular" };
            articuloDos.SubCategoria = new EstadisticoDto() { Id = 5, Descripcion = "Mas de 2 Lts" };
            

            _listaArticulosDto.Add(articuloDos);


            ArticuloDto articuloTres = new ArticuloDto();

            articuloTres.CodigoArticulo = "340";
            articuloTres.Descripcion = "COCA LATA X 310 CC";
            articuloTres.Estado = "Activo";
            articuloTres.ClasificacionSurtido = "A";
            articuloTres.HabilitadoParaVenta = "SI";
            articuloTres.Stock = 10;
            articuloTres.UnidadMedida = "CM3";
            articuloTres.StockEnTransito = 5;
            articuloTres.FechaDeEnvio = "01/01/2019";
            articuloTres.PrecioVigente = 40;
            articuloTres.TipoPrecio = "Barato";
            articuloTres.FechaUltimaModificacion = "02/02/2019";
            articuloTres.UrlImagen = "/wwwroot/assets/imagenesArticulo/CocaCola.png";
            articuloTres.Peso = 50;

            articuloTres.Grupo = new EstadisticoDto() { Id = 3, Descripcion = "Masivo" };
            articuloTres.Sector = new EstadisticoDto() { Id = 40, Descripcion = "Bebidas" };
            articuloTres.Familia = new EstadisticoDto() { Id = 1, Descripcion = "Gaseosas" };
            articuloTres.SubFamilia = new EstadisticoDto() { Id = 3420, Descripcion = "Gaseosas Cola" };
            articuloTres.Categoria = new EstadisticoDto() { Id = 3, Descripcion = "Regular" };
            articuloTres.SubCategoria = new EstadisticoDto() { Id = 5, Descripcion = "Mas de 2 Lts" };

           
           

            _listaArticulosDto.Add(articuloTres);
        }


        public UserDto getUsuario()
        {
            UserDto usuario = new UserDto();
            usuario.NombreUsuario = "Jose Ruiz";
            usuario.Legajo = "55230";
            usuario.Sucursal = "102";
            return usuario;
        }
    }
}
