using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibertadIncluit.Application.Services.Services
{
    public class SearchResult<TResult> : BaseDto
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<TResult> Result { get; set; }
    }
}
