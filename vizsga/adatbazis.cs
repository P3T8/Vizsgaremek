using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySqlConnector;

namespace vizsga
{
    class Adatbazis
    {
        MySqlConnection connection = null;
        MySqlCommand command = null;
        //private string connectionString = "Data Source=localhost\\SQLEXPRESS;Initial Catalog=vizsga;Integrated Security=True";
        private string connectionString = "Data Source=localhost\\SQLEXPRESS;Initial Catalog=vizsga;Integrated Security=True";


        public Adatbazis()
        {
            MySqlConnectionStringBuilder sb = new MySqlConnectionStringBuilder();
            sb.Server = "localhost";
            sb.UserID = "root";
            sb.Password = "";
            sb.Database = "magantanar";
            sb.Port = 3307;
            try
            {
                connection = new MySqlConnection(sb.ConnectionString);
                nyit();
                command = connection.CreateCommand();
                zar();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                Console.ReadLine();
                Environment.Exit(0);
            }
        }

        internal List<Tanar> getTanarRegisztraltak()
        {
            List<Tanar> vissza = new List<Tanar>();
            command.CommandText = "SELECT * FROM `tanar` WHERE `aktiv` = 'true' ORDER BY `tanar_id` ASC";
            try
            {
                nyit();
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Tanar uj = new Tanar();
                        uj.Adoszam = dr.GetString("Adoszam");
                        uj.Aktiv = bool.Parse( dr.GetString("Aktiv"));
                        uj.Bemutatkozas = dr.GetString("Bemutatkozas");
                        uj.BSzamla = dr.GetInt32("Bszamla");
                        uj.Dijszabas = int.Parse(dr.GetString("Dijszabas"));
                        uj.Email = dr.GetString("Email");
                        uj.Hazszam = int.Parse(dr.GetString("Hazszam"));
                        uj.IBAN = dr.GetString("IBAN");
                        uj.Iranyitoszam = dr.GetString("Iranyitoszam");
                        uj.Jelszo = dr.GetString("Jelszo");
                        uj.TanarId = dr.GetInt32("tanar_id");
                        uj.Telefonszam = dr.GetString("Telefonszam");
                        uj.TNev = dr.GetString("t_nev");
                        uj.Utca = dr.GetString("utca");
                        uj.Varos = dr.GetString("varos");
                        vissza.Add(uj);
                    }
                }
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
                Environment.Exit(0);
            }
            return vissza;
        }

        internal List<Tanar> getTanarFolyamatban()
        {
            List<Tanar> visszafoly = new List<Tanar>();
            command.CommandText = "SELECT * FROM `tanar` WHERE `aktiv` = 'false' ORDER BY `tanar_id` ASC";
            try
            {
                nyit();
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Tanar uj = new Tanar();
                        uj.Adoszam = dr.GetString("Adoszam");
                        uj.Aktiv = bool.Parse(dr.GetString("Aktiv"));
                        uj.Bemutatkozas = dr.GetString("Bemutatkozas");
                        uj.BSzamla = dr.GetInt32("Bszamla");
                        uj.Dijszabas = int.Parse(dr.GetString("Dijszabas"));
                        uj.Email = dr.GetString("Email");
                        uj.Hazszam = int.Parse(dr.GetString("Hazszam"));
                        uj.IBAN = dr.GetString("IBAN");
                        uj.Iranyitoszam = dr.GetString("Iranyitoszam");
                        uj.Jelszo = dr.GetString("Jelszo");
                        uj.TanarId = dr.GetInt32("tanar_id");
                        uj.Telefonszam = dr.GetString("Telefonszam");
                        uj.TNev = dr.GetString("t_nev");
                        uj.Utca = dr.GetString("utca");
                        uj.Varos = dr.GetString("varos");
                        visszafoly.Add(uj);
                    }
                }
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
                Environment.Exit(0);
            }
            return visszafoly;
        }

        internal List<Tantargy> getTantargyelfogadott()
        {
            List<Tantargy> visszafoly = new List<Tantargy>();
            command.CommandText = "SELECT * FROM `tantargyak` WHERE 1";
            try
            {
                nyit();
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Tantargy uj = new Tantargy();
                        uj.tantargy_id = dr.GetInt32("tantargy_id");
                        uj.tantargy_nev = dr.GetString("tantargy_nev");
                        uj.oradij = dr.GetInt32("oradij");
                        visszafoly.Add(uj);
                    }
                }
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
                Environment.Exit(0);
            }
            return visszafoly;
        }
        internal List<Diak> getDiakRegisztraltak()
        {
            List<Diak> vissza = new List<Diak>();
            command.CommandText = "SELECT * FROM `diak` WHERE `aktiv` = 'true' ORDER BY `diak_id` ASC";
            try
            {
                nyit();
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Diak uj = new Diak();
                        uj.aktiv = bool.Parse(dr.GetString("Aktiv"));
                        uj.diak_id = dr.GetInt32("diak_id");
                        uj.d_nev = dr.GetString("d_nev");
                        uj.email = dr.GetString("email");
                        uj.jelszo = dr.GetString("jelszo");
                        vissza.Add(uj);
                    }
                }
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
                Environment.Exit(0);
            }
            return vissza;
        }

        internal List<Diak> getDiakFolyamatban()
        {
            List<Diak> visszafoly = new List<Diak>();
            command.CommandText = "SELECT * FROM `diak` WHERE `aktiv` = 'false' ORDER BY `diak_id` ASC";
            try
            {
                nyit();
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Diak uj = new Diak();
                        uj.aktiv = bool.Parse(dr.GetString("Aktiv"));
                        uj.diak_id = dr.GetInt32("diak_id");
                        uj.d_nev = dr.GetString("d_nev");
                        uj.email = dr.GetString("email");
                        uj.jelszo = dr.GetString("jelszo");
                        visszafoly.Add(uj);
                    }
                }
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
                Environment.Exit(0);
            }
            return visszafoly;
        }

        private void zar()
        {
            if (connection.State != System.Data.ConnectionState.Closed)
            {
                connection.Close();
            }
        }

        private void nyit()
        {
            if(connection.State != System.Data.ConnectionState.Open)
            {
                connection.Open();
            }
        }

        public void TanarAktivalas(int tanarId)
        {
            try
            {
                nyit(); // már megvan a connection és command
                command.CommandText = "UPDATE tanar SET aktiv = 'true' WHERE tanar_id = @id";
                command.Parameters.Clear(); // előző paraméterek törlése
                command.Parameters.AddWithValue("@id", tanarId);
                command.ExecuteNonQuery();
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba az aktiválás során: " + ex.Message);
            }
        }

        public void TanarTorlese(int tanarId)
        {
            try
            {
                nyit(); // már megvan a connection és command
                command.CommandText = "DELETE FROM `tanar` WHERE `tanar_id` = @id";
                command.Parameters.Clear(); // előző paraméterek törlése
                command.Parameters.AddWithValue("@id", tanarId);
                command.ExecuteNonQuery();
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba az aktiválás során: " + ex.Message);
            }
        }

        public void DiakAktivalas(int diak_id)
        {
            try
            {
                nyit(); // már megvan a connection és command
                command.CommandText = "UPDATE diak SET aktiv = 'true' WHERE diak_id = @id";
                command.Parameters.Clear(); // előző paraméterek törlése
                command.Parameters.AddWithValue("@id", diak_id);
                command.ExecuteNonQuery();
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba az aktiválás során: " + ex.Message);
            }
        }

        public void DiakTorlese(int diak_id)
        {
            try
            {
                nyit(); // már megvan a connection és command
                command.CommandText = "DELETE FROM diak WHERE diak_id = @id";
                command.Parameters.Clear(); // előző paraméterek törlése
                command.Parameters.AddWithValue("@id", diak_id);
                command.ExecuteNonQuery();
                zar();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba az aktiválás során: " + ex.Message);
            }
        }

        public void TantargyHozzaadas(Tantargy tantargy)
        {
            try
            {
                nyit(); // megnyitjuk a kapcsolatot
                command.CommandText = "INSERT INTO `tantargyak`(`tantargy_nev`, `oradij`) VALUES (@tantargy_nev, @oradij)";
                command.Parameters.Clear(); // töröljük az előző paramétereket
                command.Parameters.AddWithValue("@tantargy_nev", tantargy.tantargy_nev);
                command.Parameters.AddWithValue("@oradij", tantargy.oradij);
                command.ExecuteNonQuery(); // végrehajtjuk a beszúrást
                zar(); // bezárjuk a kapcsolatot
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba az adat beszúrása során: " + ex.Message);
            }
        }

        public void TantargyTorlese(int tantargyId)
        {
            try
            {
                nyit();
                command.CommandText = "DELETE FROM tantargyak WHERE tantargy_id = @id";
                command.Parameters.Clear();
                command.Parameters.AddWithValue("@id", tantargyId);
                int result = command.ExecuteNonQuery();
                zar();

                if (result > 0)
                {
                    MessageBox.Show("Tantárgy sikeresen törölve.");
                }
                else
                {
                    MessageBox.Show("Nem sikerült törölni a tantárgyat.");
                }
            }
            catch (MySqlException ex)
            {
                MessageBox.Show("Hiba a törlés során: " + ex.Message);
            }
        }
    }
}
