
const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

// Cadastrar usuário
router.post('/usuarios', usuarioController.criarUsuario);

// Listar usuários
router.get('/usuarios', usuarioController.listarUsuarios);

// Buscar usuário por ID
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);

// Atualizar usuário
router.put('/usuarios/:id', usuarioController.atualizarUsuario);

// Excluir usuário
router.delete('/usuarios/:id', usuarioController.apagarUsuario);

module.exports = router;
