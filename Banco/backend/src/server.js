
const express = require('express');
const prisma = require('./prisma');

// Importando as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const contaRoutes = require('./routes/contaRoutes');

const app = express();
const PORTA = 3000;

app.use(express.json());

// Teste de conexão com o banco
app.get('/status', async (req, res) => {
  try {
    await prisma.$connect();

    return res.json({
      status: 'API Online - Projeto Semana 2',
      banco: 'PostgreSQL conectado!'
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);

    return res.status(500).json({
      status: 'Erro na conexão com o banco'
    });
  }
});

// Registrando as rotas do CRUD
app.use(usuarioRoutes);
app.use(contaRoutes);

// Iniciando o servidor
app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});
""