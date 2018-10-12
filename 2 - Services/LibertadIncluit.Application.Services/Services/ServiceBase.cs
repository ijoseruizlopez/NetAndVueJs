using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services
{
    public class ServiceBase
    {
        public string getIdSistema()
        {
            return ConfigurationManager.AppSettings["IdSistema"].ToString();
        }

        public string BuscarImagenArticulo(string CodigoArticulo)
        {
            string strRepositorioImagenesLocal = ConfigurationManager.AppSettings["RepositorioImagenesLocal"].ToString() + CodigoArticulo;
            string strRepositorioImagenesWeb = ConfigurationManager.AppSettings["RepositorioImagenesWeb"].ToString() + CodigoArticulo;
            string _imgdb = string.Format("{0}.jpg", strRepositorioImagenesLocal);
            string _imgdb1 = string.Format("{0}.png", strRepositorioImagenesLocal);
            string _imgdb2 = string.Format("{0}.bmp", strRepositorioImagenesLocal);
            string _imgdb3 = string.Format("{0}.gif", strRepositorioImagenesLocal);

            if (System.IO.File.Exists(_imgdb))
                return string.Format("{0}.jpg", strRepositorioImagenesWeb);
            else if (System.IO.File.Exists(_imgdb1))
                return string.Format("{0}.png", strRepositorioImagenesWeb);
            else if (System.IO.File.Exists(_imgdb2))
                return string.Format("{0}.bmp", strRepositorioImagenesWeb);
            else if (System.IO.File.Exists(_imgdb3))
                return string.Format("{0}.gif", strRepositorioImagenesWeb);
            else
                return  ConfigurationManager.AppSettings["SinRepositorioImagenes"].ToString();
        }
    }
}
