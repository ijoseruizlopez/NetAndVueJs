using LibertadIncluit.Application.Services.Services.Validate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services.Validate
{
    public interface IValidateService
    {
        UserDto ValidarUsuario(string usuarioEncode);
    }
}
