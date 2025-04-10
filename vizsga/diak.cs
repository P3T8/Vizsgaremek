using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vizsga
{
    public class Diak
    {
        public int diak_id { get; set; }
        public string d_nev { get; set; }
        public string email { get; set; }
        public string jelszo { get; set; }
        public bool aktiv { get; set; }
        public override string ToString()
        {
            return this.d_nev;
        }
    }
}
