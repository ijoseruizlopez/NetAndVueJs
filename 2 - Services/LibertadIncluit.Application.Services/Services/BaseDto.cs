using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services
{
    public class BaseDto
    {
        public int Id { get; set; }

        public override bool Equals(object obj)
        {
            var compareTo = obj as BaseDto;

            if (ReferenceEquals(this, compareTo))
            {
                return true;
            }

            if (ReferenceEquals(null, compareTo))
            {
                return false;
            }

            return Id.Equals(compareTo.Id);
        }

        public static bool operator ==(BaseDto a, BaseDto b)
        {
            if (ReferenceEquals(a, null) && ReferenceEquals(b, null))
            {
                return true;
            }

            if (ReferenceEquals(a, null) || ReferenceEquals(b, null))
            {
                return false;
            }

            return a.Equals(b);
        }

        public static bool operator !=(BaseDto a, BaseDto b)
        {
            return !(a == b);
        }

        public override int GetHashCode()
        {
            return (GetType().GetHashCode() * 33) + Id.GetHashCode();
        }

        public override string ToString()
        {
            return GetType().Name + " [Id=" + Id + "]";
        }
    }
}
