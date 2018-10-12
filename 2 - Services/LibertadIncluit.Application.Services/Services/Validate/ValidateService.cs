using AutoMapper;
using LibertadIncluit.Application.Services.Factory;
using LibertadIncluit.Application.Services.Services.Validate.Dto;
using LibertadIncluit.Common.Utils;
using LibertadIncluit.DataAccess.Repositories;
using LibertadIncluit.Domain.Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services.Validate
{
    public class ValidateService : ServiceBase, IValidateService
    {
        readonly IRepositorioUser _repository;
        private static IMapper _mapper;

        public ValidateService(IRepositorioUser repository)
        {
            _repository = repository;


            if (_mapper == null)
            {
                _mapper = new MapperConfiguration(cfg =>
                {

                    cfg.CreateMap<User, UserDto>()
                    .ForMember(dest => dest.NombreUsuario, opt=> opt.ResolveUsing(fa => fa.nombre_usuario))
                    .ForMember(dest => dest.Sucursal, opt => opt.ResolveUsing(fa => fa.sucursal))
                        .ReverseMap();

                }).CreateMapper();
            }
        }

        public UserDto ValidarUsuario(string usuarioEncode)
        {
            UserDto usuario = null;

            var usuarioDecode = EncodeHelper.DecodeFromBase64String(usuarioEncode);

            var user = _repository.ValidateUser(usuarioDecode, getIdSistema());

            if (user != null)
                usuario = _mapper.Map<UserDto>(user);

            return usuario;
        }
    }
}
