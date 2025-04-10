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
    public partial class TanarRegisztralt : Form
    {
        Tanar tanar = null;
        public TanarRegisztralt(Tanar kapottTanar)
        {
            InitializeComponent();
            tanar = kapottTanar;
        }

        private void TanarRegisztralt_Load(object sender, EventArgs e)
        {
            label15.Text = tanar.TNev;
            label16.Text = tanar.Iranyitoszam;
            label17.Text = tanar.Varos;
            label18.Text = tanar.Utca;
            label19.Text = tanar.Hazszam.ToString();
            label20.Text = tanar.Email;
            label21.Text = tanar.Telefonszam;
            label22.Text = tanar.Dijszabas.ToString();
            label23.Text = tanar.Bemutatkozas;
            label24.Text = tanar.BSzamla.ToString();
            label25.Text = tanar.Adoszam;
            label26.Text = tanar.IBAN;
            label27.Text = tanar.Aktiv.ToString();
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
            label7.BackColor = backColor;
            label7.ForeColor = foreColor;
            label8.BackColor = backColor;
            label8.ForeColor = foreColor;
            label9.BackColor = backColor;
            label9.ForeColor = foreColor;
            label10.BackColor = backColor;
            label10.ForeColor = foreColor;
            label11.BackColor = backColor;
            label11.ForeColor = foreColor;
            label12.BackColor = backColor;
            label12.ForeColor = foreColor;
            label13.BackColor = backColor;
            label13.ForeColor = foreColor;
            label14.BackColor = backColor;
            label14.ForeColor = foreColor;
            label15.BackColor = backColor;
            label15.ForeColor = foreColor;
            label16.BackColor = backColor;
            label16.ForeColor = foreColor;
            label17.BackColor = backColor;
            label17.ForeColor = foreColor;
            label18.BackColor = backColor;
            label18.ForeColor = foreColor;
            label19.BackColor = backColor;
            label19.ForeColor = foreColor;
            label20.BackColor = backColor;
            label20.ForeColor = foreColor;
            label21.BackColor = backColor;
            label21.ForeColor = foreColor;
            label22.BackColor = backColor;
            label22.ForeColor = foreColor;
            label23.BackColor = backColor;
            label23.ForeColor = foreColor;
            label24.BackColor = backColor;
            label24.ForeColor = foreColor;
            label25.BackColor = backColor;
            label25.ForeColor = foreColor;
            label26.BackColor = backColor;
            label26.ForeColor = foreColor;
            label27.BackColor = backColor;
            label27.ForeColor = foreColor;
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://github.com/P3T8/Vizsgaremek",
                UseShellExecute = true
            });
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Program.db.TanarTorlese(tanar.TanarId);
            MessageBox.Show("Tanar sikeresen törölve!");
            this.Close();
        }
    }
}
