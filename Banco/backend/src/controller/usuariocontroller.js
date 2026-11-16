
const prisma = require('../prisma');

// CREATE - Cadastrar usuário
async function criarUsuario(req, res) {
    try {
        const { nome, cpf, email, senha } = req.body;

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                cpf,
                email,
                senha
            },
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                createdAt: true
            }
        });

        return res.status(201).json(usuario);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao cadastrar usuário."
        });
    }
}

// READ - Listar usuários
async function listarUsuarios(req, res) {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                contas: true,
                createdAt: true
            }
        });

        return res.status(200).json(usuarios);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao listar usuários."
        });
    }
}

// READ - Buscar usuário por ID
async function buscarUsuarioPorId(req, res) {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                contas: true,
                createdAt: true
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        return res.status(200).json(usuario);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao buscar usuário."
        });
    }
}

// UPDATE - Atualizar usuário
async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nome, cpf, email, senha } = req.body;

        const usuario = await prisma.usuario.update({
            where: { id: Number(id) },
            data: { nome, cpf, email, senha },
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                createdAt: true
            }
        });

        return res.status(200).json(usuario);

    } catch (erro) {
        console.error(erro);
        return res.status(404).json({
            erro: "Erro ao atualizar usuário."
        });
    }
}

// DELETE - Excluir usuário
async function apagarUsuario(req, res) {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(id) },
            include: { contas: true }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        if (usuario.contas.length > 0) {
            return res.status(409).json({
                erro: "Não é possível excluir um usuário que possui contas."
            });
        }

        await prisma.usuario.delete({
            where: { id: Number(id) }
        });

        return res.status(204).send();

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao excluir usuário."
        });
    }
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    apagarUsuario
};
