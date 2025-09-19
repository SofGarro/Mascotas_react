import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0);  // estado inicial = 0

  const incrementar = () => {
    setCuenta(cuenta + 1);
  };

  return (
    <div>
      <p>Has hecho clic {cuenta} veces.</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}
export default Contador