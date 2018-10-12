using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Helpers
{
    public static class IntegerHelper
    {
        public static int ValidOrInvalidStringToInteger(string value)
        {
            int number;

            return int.TryParse(value, out number) ? number : 0;
        }
    }
}
