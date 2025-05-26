const express = require("express");
const cors = require("cors");
const { usuarios, contatos } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

let usuarioIdCounter = usuarios.length + 1;
let contatoIdCounter = contatos.length + 1;

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  if (user) {
    res.json({ success: true, nome: user.nome });
  } else {
    res.status(401).json({ error: "Usuário ou senha inválidos" });
  }
});

app.post("/usuarios", (req, res) => {
  const { nome, cpf, email, senha } = req.body;
  if (!nome || !cpf || !email || !senha) {
    return res.status(400).json({ error: "Campos obrigatórios" });
  }

  if (usuarios.find(u => u.usuario === email)) {
    return res.status(400).json({ error: "Usuário já existe" });
  }
  const newUser = { id: usuarioIdCounter++, usuario: email, senha, nome, cpf, email };
  usuarios.push(newUser);
  res.status(201).json(newUser);
});

app.get("/contatos", (req, res) => {
  res.json(contatos);
});

app.post("/contatos", (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios" });
  }
  const newContato = { id: contatoIdCounter++, nome, email, telefone };
  contatos.push(newContato);
  res.status(201).json(newContato);
});

app.put("/contatos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contato = contatos.find(c => c.id === id);
  if (!contato) {
    return res.status(404).json({ error: "Contato não encontrado" });
  }
  const { nome, telefone } = req.body;
  if (nome) contato.nome = nome;
  if (telefone) contato.telefone = telefone;
  res.json(contato);
});

app.delete("/contatos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contatos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Contato não encontrado" });
  }
  contatos.splice(index, 1);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

