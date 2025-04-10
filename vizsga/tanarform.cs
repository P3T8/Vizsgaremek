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
using vizsga;

namespace vizsga
{
    public partial class tanarform : Form
    {
        List<Tanar> regisztraltak = new List<Tanar>();
        List<Tanar> folyamatban = new List<Tanar>();

        public tanarform()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Close(); //bezárja az oldalt
        }

        private void tanar_Load(object sender, EventArgs e)
        {
            adatfrisites();
        }

        private void adatfrisites()
        {
            regisztraltak = Program.db.getTanarRegisztraltak();
            listBox_regisztraltak.Items.AddRange(regisztraltak.ToArray());
            folyamatban = Program.db.getTanarFolyamatban();
            listBox_folyamatban.Items.AddRange(folyamatban.ToArray());
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            //trackbar jobbra húzásával fekete lesz a háttér míg balra húzásnál az alapértelmezett fehér 
            Color backColor = (trackBar1.Value == 1) ? Color.FromArgb(36, 36, 36) : Color.White;
            Color foreColor = (trackBar1.Value == 0) ? Color.Black : Color.White;
            this.BackColor = backColor;
            this.ForeColor = foreColor;
            listBox_folyamatban.BackColor = backColor;
            listBox_folyamatban.ForeColor = foreColor;
            listBox_regisztraltak.BackColor = backColor;
            listBox_regisztraltak.ForeColor = foreColor;
            button1.BackColor = backColor;
            button1.ForeColor = foreColor;
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://github.com/P3T8/Vizsgaremek",
                UseShellExecute = true
            });
        }

        public void listBox_folyamatban_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox_folyamatban.SelectedIndex<0)
            {
                return;
            }
            Tanar kivalasztottTanar = (Tanar)listBox_folyamatban.SelectedItem;
            TanarJovahagyasa form = new TanarJovahagyasa(kivalasztottTanar, this);
            form.ShowDialog();
            // Frissítés visszatérés után
            listBox_folyamatban.Items.Clear();
            listBox_regisztraltak.Items.Clear();
            adatfrisites();
        }

        public void listBox_regisztraltak_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox_regisztraltak.SelectedIndex < 0)
            {
                return;
            }
            Tanar kivalasztottTanar = (Tanar)listBox_regisztraltak.SelectedItem;
            TanarRegisztralt form = new TanarRegisztralt(kivalasztottTanar);
            form.ShowDialog();
            listBox_folyamatban.Items.Clear();
            listBox_regisztraltak.Items.Clear();
            adatfrisites();
        }
    }
}
