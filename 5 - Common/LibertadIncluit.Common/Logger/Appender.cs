using log4net.Appender;
using System.Configuration;


namespace LibertadIncluit.Logger
{
    public class Appender : AdoNetAppender
    {
        private const string LogNetCS = "SMP";
        public new string ConnectionString
        {
            get { return base.ConnectionString; }
            set { base.ConnectionString = ConfigurationManager.ConnectionStrings[LogNetCS].ConnectionString; }
        }
    }
}