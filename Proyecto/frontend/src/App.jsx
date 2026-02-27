import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/mensaje")
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje));
  }, []);

  return (
    <div>
      <h1>{mensaje}</h1>
    </div>
  );
}

export default App;