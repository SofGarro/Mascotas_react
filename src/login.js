import { useState } from 'react';
import './Login.css';
import Mascotas from './mascotas'; // 👈 importamos el feed

function Login() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false); // estado para redirigir

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    // 🔑 simulamos login exitoso
    setLogueado(true);
  };

  // Si el usuario "logueó", mostramos Mascotas
  if (logueado) {
    return <Mascotas />;
  }

  return (
    <div className="login-contenedor">
      <form className="login-card" onSubmit={manejarSubmit}>
        <h2 className="titulo">😽Login🐶</h2>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label>Contraseña:</label>
          <input
            type="password"
            value={clave}
            onChange={e => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">¡Inicia sesión!</button>
      </form>
    </div>
  );
}

export default Login;
