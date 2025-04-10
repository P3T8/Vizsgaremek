using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vizsga
{
    internal static class Program
    {
        
        public static Adatbazis db = new Adatbazis();
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new fooldal());

        }
    }
}
