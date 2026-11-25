const cors = require('cors');
const express = require('express');
const prisma = require('./prisma');
require('dotenv').config();


if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não configurado no .env');
}

// Importando as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const contaRoutes = require('./routes/contaRoutes');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(cors());

// Teste de conexão com o banco
app.get('/status', async (req, res) => {
  try {
    await prisma.$connect();

    return res.json({
      status: 'API Online',
      banco: 'PostgreSQL conectado!'
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);

    return res.status(500).json({
      status: 'Erro na conexão com o banco'
    });
  }
});

// Registrando as rotas
app.use(usuarioRoutes);
app.use(contaRoutes);

// Iniciando o servidor
app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});
