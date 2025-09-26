import { useState } from 'react';
import './App.css';
import Login from './login';
import Registro from './Registro';
import Mascotas from './mascotas';

function App() {
  const [token, setToken] = useState(null); // null = no logueado
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleLoginSuccess = (tokenRecibido) => {
    setToken(tokenRecibido); // 🔑 esto permite mostrar Mascotas
  };

  return (
    <div className="App">
      {!token ? (
        <>
          {mostrarRegistro ? (
            <Registro onShowLogin={() => setMostrarRegistro(false)} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} onShowRegistro={() => setMostrarRegistro(true)} />
          )}
        </>
      ) : (
        <Mascotas />
      )}
    </div>
  );
}

export default App;
