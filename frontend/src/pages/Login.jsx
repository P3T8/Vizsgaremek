import { useState } from 'react';
import axios from 'axios';

function Login({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Hozzáadva a betöltési állapot kezeléséhez
  const [successMessage, setSuccessMessage] = useState('');  // Hozzáadva sikeres üzenethez

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // Bekapcsoljuk a betöltési állapotot
    setError('');  // Az esetleges előző hiba törlése
    setSuccessMessage('');  // Az esetleges előző siker üzenet törlése

    try {
      const res = await axios.post('http://localhost:5000/api/diak/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Bejelentkezés sikeres:', res.data);
      setSuccessMessage('Bejelentkezés sikeres!'); // Sikeres bejelentkezési üzenet
      setError('');  // Töröljük a hibát, ha sikeres a bejelentkezés
      localStorage.setItem('token', res.data.token);  // Mentjük a token-t a localStorage-ba
      if (closeModal && typeof closeModal === 'function') {
        closeModal(); // Bezárja a modalt, ha a closeModal függvény létezik
      }
    } catch (err) {
      console.error('Bejelentkezési hiba:', err);
      // Hibakezelés javítása: ellenőrizzük, hogy a válasz rendelkezik-e response objektummal
      if (err.response) {
        // Ha van válasz, de hiba történt
        const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Hiba a bejelentkezés során';
        setError(errorMessage);  // Az új hibaüzenet beállítása
      } else {
        // Ha nincs válasz, akkor hálózati hiba
        setError('Hálózati hiba történt. Kérjük, próbáld meg újra!');
      }
    } finally {
      setLoading(false);  // Végül kikapcsoljuk a betöltési állapotot
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email cím</label>
        <input 
          type="email" 
          className="form-control" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="mb-3">
        <label>Jelszó</label>
        <input 
          type="password" 
          className="form-control" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      {/* Sikeres üzenet */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {/* Hibás bejelentkezési adatokat jelző hibaüzenet */}
      {error && <div className="alert alert-danger">{error}</div>}

      <button 
        type="submit" 
        className="btn btn-primary w-100"
        disabled={loading}  // Gomb letiltása, ha épp bejelentkezés folyamatban van
      >
        {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
      </button>
    </form>
  );
}

export default Login;
