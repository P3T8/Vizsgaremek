using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vizsga
{
    public partial class DiakVarakozik : Form
    {
        Diak diak = null;
        //List<Tanar> folyamatban = new List<Tanar>();
        public diakform szulofrom;
        public DiakVarakozik(Diak kapottDiak, diakform form)
        {
            InitializeComponent();
            diak = kapottDiak;
            szulofrom = form;
        }

        public DiakVarakozik(Diak kivalasztottdiak)
        {
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Program.db.DiakTorlese(diak.diak_id);
            MessageBox.Show("Diák sikeresen törölve!");
            this.Close();
        }

        private void DiakVarakozik_Load(object sender, EventArgs e)
        {
            label8.Text = diak.diak_id.ToString();
            label4.Text = diak.d_nev;
            label5.Text = diak.email;
            label6.Text = diak.aktiv.ToString();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Program.db.DiakAktivalas(diak.diak_id);
            MessageBox.Show("Diák sikeresen aktiválva!");
            this.Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            //trackbar jobbra húzásával fekete lesz a háttér míg balra húzásnál az alapértelmezett fehér 
            Color backColor = (trackBar1.Value == 1) ? Color.FromArgb(36, 36, 36) : Color.White;
            Color foreColor = (trackBar1.Value == 0) ? Color.Black : Color.White;
            this.BackColor = backColor;
            this.ForeColor = foreColor;
            button1.ForeColor = foreColor;
            button2.BackColor = backColor;
            button2.ForeColor = foreColor;
            button3.ForeColor = foreColor;
        }
    }
}
