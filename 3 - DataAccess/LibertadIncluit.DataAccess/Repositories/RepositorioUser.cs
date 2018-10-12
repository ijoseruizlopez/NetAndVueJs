using LibertadIncluit.DataAccess.Core;
using LibertadIncluit.Domain.Model.Entidades;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.DataAccess.Repositories
{
    public class RepositorioUser : IRepositorioUser
    {

        public User ValidateUser(string idSesion, string idSistema)
        {
            try
            {
                using (var ctx = new UserContext())
                {
                    var pIdSesion = new OracleParameter("p_legajo", OracleDbType.NVarchar2, 10, idSesion.ToString(), ParameterDirection.Input);

                    var pIdSistema = new OracleParameter("p_idSistema", OracleDbType.NVarchar2, 3, idSistema.ToString(), ParameterDirection.Input);

                    var pErrTxt = new OracleParameter("p_err_txt", DBNull.Value);

                    var pErrNum = new OracleParameter("p_err_num", DBNull.Value);

                    var cCursor = new OracleParameter("c_usuario", OracleDbType.RefCursor, ParameterDirection.Output);

                    return ctx.Database.SqlQuery<User>("BEGIN  admvalcred.LI_PKG_USUARIOS.P_VERIFICAR_USUARIO_X_SESSION(:p_legajo, :p_idSistema, :c_usuario, :p_err_txt, :p_err_num); end; ",

                         pIdSesion, pIdSistema, cCursor, pErrTxt, pErrNum).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

        }
    }
}
