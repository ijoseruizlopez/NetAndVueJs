using LibertadIncluit.DataAccess.Core;
using LibertadIncluit.Domain.Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.DataAccess.Repositories
{
    public interface IRepositorioUser
    {

        User ValidateUser(string idSesion, string idSistema);

    }
}
