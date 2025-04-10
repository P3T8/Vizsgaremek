using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vizsga
{
    public partial class fooldal : Form
    {
        public fooldal()
        {
            InitializeComponent();
        }


        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void tanar_Click(object sender, EventArgs e)
        {
            tanarform form2 = new tanarform(); // példányosítottuk a Form2 osztályt
            this.Hide(); // elrejtettük a fooldal ablakot
            form2.FormClosed += (sendObject, args) =>
            {
                // eltávolítjuk a lehetséges hivatkozásokat a Form2 objektumra
                form2.Dispose(); // lefoglalt erőforrások felszabadítása
                form2 = null; // semmivé tesszük a Form2 objektumot
                GC.Collect(); // szemétgyűjtő futtatása
                this.Show(); // Ha a hívott ablak megszűnt, térjen vissza ide
            };
            form2.Show(); // megjelenítettük a Form1 ablakot
        }

        private void diak_Click(object sender, EventArgs e)
        {
            diakform form3 = new diakform(); // példányosítottuk a Form3 osztályt
            this.Hide(); // elrejtettük a fooldal ablakot
            //form3.Show(); // megjelenítettük a Form3 ablakot
            form3.FormClosed += (sendObject, args) =>
            {
                // eltávolítjuk a lehetséges hivatkozásokat a Form3 objektumra
                form3.Dispose(); // lefoglalt erőforrások felszabadítása
                form3 = null; // semmivé tesszük a Form1 objektumot
                GC.Collect(); // szemétgyűjtő futtatása
                this.Show(); // Ha a hívott ablak megszűnt, térjen vissza ide
            };
            form3.Show(); // megjelenítettük a Form1 ablakot
        }

        private void tantargy_Click(object sender, EventArgs e)
        {

            tantargyform form4 = new tantargyform(); // példányosítottuk a Form4 osztályt
            this.Hide(); // elrejtettük a fooldal ablakot
            form4.Show(); // megjelenítettük a Form4 ablakot
            form4.FormClosed += (sendObject, args) =>
            {
                // eltávolítjuk a lehetséges hivatkozásokat a Form4 objektumra
                form4.Dispose(); // lefoglalt erőforrások felszabadítása
                form4 = null; // semmivé tesszük a Form4 objektumot
                GC.Collect(); // szemétgyűjtő futtatása
                this.Show(); // Ha a hívott ablak megszűnt, térjen vissza ide
            };
            form4.Show(); // megjelenítettük a Form1 ablakot
        }

        private void fooldal_FormClosing(object sender, FormClosingEventArgs e)
        {
            //messagebox-al megkérdezzük hogy tényleg be akarja e zárni, ha igenre nyom bezárja ha a nemre akkor ektünik a felugró ablak és a program továbbra is fut
            DialogResult valasztasEredmenye = MessageBox.Show("Valóban szeretne kilépni?", "Exit alert", MessageBoxButtons.YesNo);
            if (valasztasEredmenye == DialogResult.Yes)
            {
                Environment.Exit(0);
            }
            else
            {
                e.Cancel = true;
            }
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            //trackbar jobbra húzásával fekete lesz a háttér míg balra húzásnál az alapértelmezett fehér 
            Color backColor = (trackBar1.Value == 1) ? Color.FromArgb(36,36,36)  : Color.White;
            Color foreColor = (trackBar1.Value == 0) ? Color.Black : Color.White;
            this.BackColor = backColor;
            this.ForeColor = foreColor;
        }

        private void pictureBox1_Click_1(object sender, EventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "https://github.com/P3T8/Vizsgaremek",
                UseShellExecute = true
            });
        }

    }
}
