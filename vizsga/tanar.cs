using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vizsga
{
    public class Tanar
    {
        public int TanarId { get; set; }
        public string TNev { get; set; }
        public string Iranyitoszam { get; set; }
        public string Varos { get; set; }
        public string Utca { get; set; }
        public int Hazszam { get; set; }
        public string Email { get; set; }
        public string Jelszo { get; set; }
        public string Telefonszam { get; set; }
        public decimal Dijszabas { get; set; }
        public string Bemutatkozas { get; set; }
        public int BSzamla { get; set; }
        public string Adoszam { get; set; }
        public bool Aktiv { get; set; }
        public string IBAN { get; set; }
        public override string ToString()
        {
            return this.TNev;
        }
    }
}
