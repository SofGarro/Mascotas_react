import { useState } from 'react';
import Login from './login';
import './Login.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    // Simula registro exitoso
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setMostrarLogin(true); // 🔑 mostrar el Login automáticamente
  };

  return (
    <div className="login-contenedor">
      {/* Mostrar formulario solo si no está registrado ni mostrando Login */}
      {!(registrado || mostrarLogin) && (
        <form className="login-card" onSubmit={manejarSubmit}>
          <h2 className="titulo">🐾Registro🐾</h2>
          <div className="campo">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn-login">¡Regístrate!</button>
          <button
            type="button"
            className="btn-login"
            style={{ marginTop: '10px', background: '#ccc', color: '#333' }}
            onClick={() => setMostrarLogin(true)}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
      )}

      {/* Mostrar Login si se registró o el usuario quiere iniciar sesión */}
      {(registrado || mostrarLogin) && <Login onLoginSuccess={() => {}} />}
    </div>
  );
}

export default Registro;
