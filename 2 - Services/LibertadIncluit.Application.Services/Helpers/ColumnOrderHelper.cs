using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Helpers
{
    public class ColumnOrderHelper
    {
        public static TupleIndexDirection GetColumnAndOrder(string order)
        {
            TupleIndexDirection tupleIndexDirection = new TupleIndexDirection();
            var orderIndex = IntegerHelper.ValidOrInvalidStringToInteger(order);
            orderIndex = orderIndex / 2;

     
            if (IntegerHelper.ValidOrInvalidStringToInteger(order) % 2 != 0)
            {
                tupleIndexDirection.orderDirection = OrderDirection.Ascending;
                orderIndex++;
            }
            else
            {
                tupleIndexDirection.orderDirection = OrderDirection.Descending;
            }
            tupleIndexDirection.orderIndex = orderIndex;

            return tupleIndexDirection;
        }
    }
}
