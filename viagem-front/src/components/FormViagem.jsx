import { useState } from "react";
import axios from "axios";

function FormViagem({ aoSalvar }) {
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [cliente, setCliente] = useState("");

  const salvarViagem = async (e) => {
    e.preventDefault();

    if (!destino || !data || !cliente) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/viagens", {
        destino,
        data,
        cliente,
      });

      setDestino("");
      setData("");
      setCliente("");

      aoSalvar(); // recarrega lista
    } catch (err) {
      console.error("Erro ao salvar viagem:", err);
    }
  };

  return (
    <form onSubmit={salvarViagem} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome do cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <button type="submit">Agendar</button>
    </form>
  );
}

export default FormViagem;
