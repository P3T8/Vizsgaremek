
namespace vizsga
{
    partial class fooldal
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(fooldal));
            this.label1 = new System.Windows.Forms.Label();
            this.tanar = new System.Windows.Forms.PictureBox();
            this.diak = new System.Windows.Forms.PictureBox();
            this.tantargy = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.trackBar1 = new System.Windows.Forms.TrackBar();
            ((System.ComponentModel.ISupportInitialize)(this.tanar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.diak)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.tantargy)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("MS Reference Sans Serif", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.label1.Location = new System.Drawing.Point(403, 46);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(421, 38);
            this.label1.TabIndex = 0;
            this.label1.Text = "Okos magántanár kereső";
            // 
            // tanar
            // 
            this.tanar.Image = ((System.Drawing.Image)(resources.GetObject("tanar.Image")));
            this.tanar.InitialImage = ((System.Drawing.Image)(resources.GetObject("tanar.InitialImage")));
            this.tanar.Location = new System.Drawing.Point(98, 194);
            this.tanar.Name = "tanar";
            this.tanar.Size = new System.Drawing.Size(258, 262);
            this.tanar.TabIndex = 1;
            this.tanar.TabStop = false;
            this.tanar.Click += new System.EventHandler(this.tanar_Click);
            // 
            // diak
            // 
            this.diak.Image = ((System.Drawing.Image)(resources.GetObject("diak.Image")));
            this.diak.Location = new System.Drawing.Point(497, 194);
            this.diak.Name = "diak";
            this.diak.Size = new System.Drawing.Size(258, 262);
            this.diak.TabIndex = 2;
            this.diak.TabStop = false;
            this.diak.Click += new System.EventHandler(this.diak_Click);
            // 
            // tantargy
            // 
            this.tantargy.Image = ((System.Drawing.Image)(resources.GetObject("tantargy.Image")));
            this.tantargy.Location = new System.Drawing.Point(906, 194);
            this.tantargy.Name = "tantargy";
            this.tantargy.Size = new System.Drawing.Size(258, 262);
            this.tantargy.TabIndex = 3;
            this.tantargy.TabStop = false;
            this.tantargy.Click += new System.EventHandler(this.tantargy_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(1142, 610);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(49, 50);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 11;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click_1);
            // 
            // trackBar1
            // 
            this.trackBar1.Cursor = System.Windows.Forms.Cursors.Hand;
            this.trackBar1.LargeChange = 4;
            this.trackBar1.Location = new System.Drawing.Point(608, 591);
            this.trackBar1.Maximum = 1;
            this.trackBar1.Name = "trackBar1";
            this.trackBar1.Size = new System.Drawing.Size(102, 56);
            this.trackBar1.TabIndex = 12;
            this.trackBar1.Scroll += new System.EventHandler(this.trackBar1_Scroll);
            // 
            // fooldal
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1255, 672);
            this.Controls.Add(this.trackBar1);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.tantargy);
            this.Controls.Add(this.diak);
            this.Controls.Add(this.tanar);
            this.Controls.Add(this.label1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "fooldal";
            this.Text = "Főoldal ";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.fooldal_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.tanar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.diak)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.tantargy)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.PictureBox tanar;
        private System.Windows.Forms.PictureBox diak;
        private System.Windows.Forms.PictureBox tantargy;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.TrackBar trackBar1;
    }
}

