using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Common.Utils
{
    public class EncodeHelper
    {
        public static string DecodeFromBase64String(string encodedText)
        {

            if (encodedText != null && encodedText.Contains(" "))
                encodedText = encodedText.Replace(" ", "+");

            while ((encodedText.Length * 6) % 8 != 0) encodedText += "=";

            var decodeBase64 = string.IsNullOrWhiteSpace(encodedText)
                ? ""
                : Encoding.UTF8.GetString(Convert.FromBase64String(encodedText));

            decodeBase64 = decodeBase64.Replace("\0", "");

            return decodeBase64;

        }

        public static string EncodeToBase64String(string textToEncode)
        {
            return string.IsNullOrWhiteSpace(textToEncode)
                ? ""
                : Convert.ToBase64String(Encoding.UTF8.GetBytes(textToEncode));
        }
    }
}
