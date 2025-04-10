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
    public partial class tantargyform : Form
    {
        List<Tantargy> elfogadott = new List<Tantargy>();
        public tantargyform()
        {
            InitializeComponent();
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
            listBox_elfogadott.BackColor = backColor;
            listBox_elfogadott.ForeColor = foreColor;
            button1.BackColor = backColor;
            button1.ForeColor = foreColor;
            textBox1.BackColor = backColor;
            textBox1.ForeColor = foreColor;
            textBox2.BackColor = backColor;
            textBox2.ForeColor = foreColor;
            gomb.ForeColor = foreColor;
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://github.com/P3T8/Vizsgaremek",
                UseShellExecute = true
            });
        }


        private void tantargy_Load(object sender, EventArgs e)
        {
            adatfrisites();
        }

        private void adatfrisites()
        {
            //elfogadott = Program.db.getTantargyelfogadott();
            //listBox_elfogadott.Items.AddRange(elfogadott.ToArray());

            listBox_elfogadott.Items.Clear(); // Tisztítsd meg a ListBox-ot
            elfogadott = Program.db.getTantargyelfogadott();
            listBox_elfogadott.Items.AddRange(elfogadott.ToArray());
        }

        

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            
        }

        private void button3_Click_1(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(textBox1.Text) && !string.IsNullOrEmpty(textBox2.Text))
            {
                try
                {
                    // Új tantárgy példány létrehozása
                    Tantargy ujTantargy = new Tantargy
                    {
                        tantargy_nev = textBox1.Text,
                        oradij = Convert.ToInt32(textBox2.Text)
                    };

                    // Beszúrás az adatbázisba
                    Program.db.TantargyHozzaadas(ujTantargy);

                    // Frissítjük a listát
                    adatfrisites();

                    // Töröljük a TextBoxok tartalmát
                    textBox1.Text = "";
                    textBox2.Text = "";
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt: " + ex.Message, "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if (listBox_elfogadott.SelectedItem != null)
            {
                Tantargy kivalasztott = (Tantargy)listBox_elfogadott.SelectedItem;

                var megerosites = MessageBox.Show($"Biztosan törölni szeretnéd a tantárgyat: {kivalasztott.tantargy_nev}?",
                    "Megerősítés", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

                if (megerosites == DialogResult.Yes)
                {
                    Program.db.TantargyTorlese(kivalasztott.tantargy_id);
                    adatfrisites(); 
                }
            }
            else
            {
                MessageBox.Show("Nincs kiválasztva tantárgy!", "Figyelmeztetés", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }
    }
}
