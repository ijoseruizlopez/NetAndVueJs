using LibertadIncluit.Application.Services.Helpers;
using LibertadIncluit.Application.Services.Services.Articulo.Dto;
using LibertadIncluit.Common.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibertadIncluit.Domain.Model.Entidades;
using LibertadIncluit.DataAccess;
using LibertadIncluit.Application.Services.Factory;
using LibertadIncluit.DataAccess.Repositories;
using AutoMapper;
using LibertadIncluit.Domain.Model.Enums;

namespace LibertadIncluit.Application.Services.Services.Articulo
{
    public class ArticuloService : ServiceBase, IArticuloService
    {

        private static IMapper _mapper;

        readonly IRepositorioArticulo _repository;

        private static FactoryDtoUtil _FactoryDtoUtil;


        public ArticuloService(IRepositorioArticulo repository)
        {
            if (_mapper == null)
            {
                _mapper = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ArticulosSearch, ArticuloLiteDto>()
                        .ReverseMap();

                    cfg.CreateMap<LibertadIncluit.Domain.Model.Entidades.Articulo, ArticuloDto>()
                        .ReverseMap();

                    cfg.CreateMap<Estadistico, EstadisticoDto>()
                        .ReverseMap();

                    cfg.CreateMap<EanArticulo, EanArticuloDto>()
                        .ReverseMap();

                }).CreateMapper();
            }


            _repository = repository;
            _FactoryDtoUtil = FactoryDtoUtil.getFactoryDtoUtil();
        }

        public ArticuloDto SearchCodigoEan(string codigoArticuloEan, int sucursal)
        {
            LibertadIncluit.Domain.Model.Entidades.Articulo articulo = _repository.BuscarDatosGeneralesArticulo(sucursal, codigoArticuloEan);
            ArticuloDto articuloDto = null;
            if (articulo != null)
            {
                articulo.Eans = _repository.BuscarEansArticulo(articulo, sucursal);

                articulo.Grupo = _repository.BuscarEstadistico(articulo, EstadisticoEnum.Grupo);

                articulo.Sector = _repository.BuscarEstadistico(articulo, EstadisticoEnum.Sector);

                articulo.Familia = _repository.BuscarEstadistico(articulo, EstadisticoEnum.Familia);

                articulo.SubFamilia = _repository.BuscarEstadistico(articulo, EstadisticoEnum.SubFamilia);

                articulo.Categoria = _repository.BuscarEstadistico(articulo, EstadisticoEnum.Categoria);

                articulo.SubCategoria = _repository.BuscarEstadistico(articulo, EstadisticoEnum.SubCategoria);

                articulo.UrlImagen = BuscarImagenArticulo(articulo.CodigoArticulo);

                articuloDto = _mapper.Map<ArticuloDto>(articulo);
            }

            return articuloDto;
        }

        public List<ArticuloLiteDto> BuscarArticuloPorDescipcion(string text, int sucursal)
        {
            SearchResult<ArticuloLiteDto> sarchResultDto = new SearchResult<ArticuloLiteDto>();

            text = EncodeHelper.DecodeFromBase64String(text);

            var listArticulos = _repository.BuscarArticuloPorDescipcion(sucursal, text);

            var listArticuloDto = _mapper.Map<List<ArticuloLiteDto>>(listArticulos);

            return listArticuloDto;
        }

    }
}
