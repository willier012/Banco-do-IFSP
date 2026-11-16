
const express = require('express');
const router = express.Router();

const contaController = require('../controller/contaController');

// Criar conta
router.post('/contas', contaController.criarConta);

// Listar contas
router.get('/contas', contaController.listarContas);

// Buscar conta por ID
router.get('/contas/:id', contaController.buscarContaPorId);

// Atualizar conta
router.put('/contas/:id', contaController.atualizarConta);

// Excluir conta
router.delete('/contas/:id', contaController.apagarConta);

module.exports = router;
