const express = require('express');
const prisma = require('./prisma');

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/status', async (req, res) => {
  try {
    await prisma.$connect();

    return res.json({
      status: 'API Online - Projeto Semana 1',
      banco: 'PostgreSQL conectado!'
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);

    return res.status(500).json({
      status: 'Erro na conexão com o banco'
    });
  }
});

app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});