import { useState, useEffect } from "react";
import axios from "axios";
import FormViagem from "./components/FormViagem";
import ListaViagens from "./components/ListaViagens";

function App() {
  const [viagens, setViagens] = useState([]);

  // carregar viagens do backend
  const carregarViagens = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viagens");
      setViagens(res.data);
    } catch (err) {
      console.error("Erro ao buscar viagens:", err);
    }
  };

  useEffect(() => {
    carregarViagens();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>✈️ AGENDAMENTOS DECOLE JÁ!!</h1>

      <FormViagem aoSalvar={carregarViagens} />

      <hr style={{ margin: "20px 0" }} />

      <ListaViagens viagens={viagens} />
    </div>
  );
}

export default App;
