using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vizsga
{
        public class Tantargy
        {
            public int tantargy_id { get; set; }
            public string tantargy_nev { get; set; }
            public int oradij { get; set; }
        public override string ToString()
        {
            return this.tantargy_nev;
        }
    }
}
