const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar o Express para servir arquivos estáticos
// A pasta 'public' agora é acessível pelo navegador
app.use(express.static(path.join(__dirname, 'public')));

// --- Rotas da API para servir seus arquivos JSON ---

// Classes e Habilidades de Classe
app.get('/api/classes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'classes.json'));
});
app.get('/api/habilidades_de_classe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'habilidadeclasse.json'));
});
app.get('/api/classes_habilidades', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'classehabilidade.json'));
});

// Raças e Habilidades Raciais
app.get('/api/racas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'raças.json'));
});
app.get('/api/habilidades_raciais', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'habilidaderacial.json'));
});

// --- Rota para a página inicial (o seu HTML) ---

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Iniciar o servidor ---

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});