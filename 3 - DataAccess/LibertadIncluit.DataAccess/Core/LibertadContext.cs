namespace LibertadIncluit.DataAccess.Core
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class LibertadContext : DbContext
    {
        public LibertadContext()
            : base("name=LibertadContext")
        {
        }
    }

}