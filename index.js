import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// rota inicial
app.get("/", (req, res) => {
  res.send("API de Agendamento de Viagens funcionando 🚀");
});

// criar viagem
app.post("/viagens", async (req, res) => {
  const { destino, data, cliente } = req.body;

  if (!destino || !data || !cliente) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const [result] = await pool.query(
    "INSERT INTO viagens (destino, data, cliente) VALUES (?, ?, ?)",
    [destino, data, cliente]
  );

  res.status(201).json({ id: result.insertId, destino, data, cliente });
});

// listar viagens
app.get("/viagens", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM viagens");
  res.json(rows);
});
// deletar viagem
app.delete("/viagens/:id", async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query("DELETE FROM viagens WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Viagem não encontrada" });
  }

  res.json({ message: "Viagem excluída com sucesso" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
f