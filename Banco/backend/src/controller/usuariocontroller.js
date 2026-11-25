
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// CREATE - Cadastrar usuário
async function criarUsuario(req, res) {
    try {
        const { nome, cpf, email, senha } = req.body;

        // Validar campos
        if (!nome || !cpf || !email || !senha) {
            return res.status(400).json({
                erro: "Preencha todos os campos."
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                erro: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        // Verificar se email ou CPF já existem
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { email },
                    { cpf }
                ]
            }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                erro: "E-mail ou CPF já cadastrado."
            });
        }

        // Gerar hash da senha
        const senhaHash = await bcrypt.hash(senha, 12);

        // Criar usuário no banco
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                cpf,
                email,
                senha: senhaHash
            },
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                createdAt: true
            }
        });

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro ao cadastrar usuário."
        });
    }
}


// LOGIN - Autenticar usuário
async function loginUsuario(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: "Informe seu e-mail e sua senha."
            });
        }

        // Procurar usuário pelo e-mail
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(401).json({
                erro: "E-mail ou senha incorretos."
            });
        }

        // Comparar senha digitada com o hash do banco
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "E-mail ou senha incorretos."
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro ao realizar login."
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
    loginUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    apagarUsuario
};
