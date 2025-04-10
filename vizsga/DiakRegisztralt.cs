using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vizsga
{
    public partial class DiakRegisztralt : Form
    {
        Diak diak = null;
        public DiakRegisztralt(Diak kapottdiak)
        {
            InitializeComponent();
            diak = kapottdiak;
        }

        private void DiakRegisztralt_Load(object sender, EventArgs e)
        {
            label8.Text = diak.diak_id.ToString();
            label4.Text = diak.d_nev;
            label5.Text = diak.email;
            label6.Text = diak.aktiv.ToString();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            Program.db.DiakTorlese(diak.diak_id);
            MessageBox.Show("Diák sikeresen törölve!");
            this.Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close(); //bezárja az oldalt
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            //trackbar jobbra húzásával fekete lesz a háttér míg balra húzásnál az alapértelmezett fehér 
            Color backColor = (trackBar1.Value == 1) ? Color.FromArgb(36, 36, 36) : Color.White;
            Color foreColor = (trackBar1.Value == 0) ? Color.Black : Color.White;
            this.BackColor = backColor;
            this.ForeColor = foreColor;
            button2.BackColor = backColor;
            button2.ForeColor = foreColor;
            button3.ForeColor = foreColor;
            label1.BackColor = backColor;
            label1.ForeColor = foreColor;
            label2.BackColor = backColor;
            label2.ForeColor = foreColor;
            label3.BackColor = backColor;
            label3.ForeColor = foreColor;
            label4.BackColor = backColor;
            label4.ForeColor = foreColor;
            label5.BackColor = backColor;
            label5.ForeColor = foreColor;
            label6.BackColor = backColor;
            label6.ForeColor = foreColor;
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://github.com/P3T8/Vizsgaremek",
                UseShellExecute = true
            });
        }

        
    }
}
