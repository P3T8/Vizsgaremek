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
    public partial class diakform : Form
    {
        List<Diak> regisztraltak = new List<Diak>();
        List<Diak> folyamatban = new List<Diak>();
        public diakform()
        {
            InitializeComponent();
        }

        private void diak_Load(object sender, EventArgs e)
        {
            adatfrisites();
        }

        private void adatfrisites()
        {
            regisztraltak = Program.db.getDiakRegisztraltak();
            listBox_regisztralt_diak.Items.AddRange(regisztraltak.ToArray());
            folyamatban = Program.db.getDiakFolyamatban();
            listBox_varakozik_diak.Items.AddRange(folyamatban.ToArray());
        }

        private void button1_Click(object sender, EventArgs e)
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
            listBox_varakozik_diak.BackColor = backColor;
            listBox_varakozik_diak.ForeColor = foreColor;
            listBox_regisztralt_diak.BackColor = backColor;
            listBox_regisztralt_diak.ForeColor = foreColor;
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

        private void listBox_regisztralt_diak_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox_regisztralt_diak.SelectedIndex < 0)
            {
                return;
            }
            Diak kivalasztottdiak = (Diak)listBox_regisztralt_diak.SelectedItem;
            DiakRegisztralt form = new DiakRegisztralt(kivalasztottdiak);
            form.ShowDialog();
            listBox_varakozik_diak.Items.Clear();
            listBox_regisztralt_diak.Items.Clear();
            adatfrisites();
        }

        private void listBox_varakozik_diak_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox_varakozik_diak.SelectedIndex < 0)
            {
                return;
            }
            Diak kivalasztottdiak = (Diak)listBox_varakozik_diak.SelectedItem;
            DiakVarakozik form = new DiakVarakozik(kivalasztottdiak, this);
            form.ShowDialog();
            listBox_varakozik_diak.Items.Clear();
            listBox_regisztralt_diak.Items.Clear();
            adatfrisites();
        }
    }
}
