
const prisma = require('../prisma');

// CREATE - Criar conta
async function criarConta(req, res) {
    try {
        const { numero, saldo, tipo, usuarioId } = req.body;

        const conta = await prisma.conta.create({
            data: {
                numero,
                saldo: saldo !== undefined ? Number(saldo) : 0,
                tipo,
                usuario: {
                    connect: {
                        id: Number(usuarioId)
                    }
                }
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        return res.status(201).json(conta);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao criar conta."
        });
    }
}

// READ - Listar todas as contas
async function listarContas(req, res) {
    try {
        const contas = await prisma.conta.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        return res.status(200).json(contas);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao listar contas."
        });
    }
}

// READ - Buscar conta por ID
async function buscarContaPorId(req, res) {
    try {
        const { id } = req.params;

        const conta = await prisma.conta.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        if (!conta) {
            return res.status(404).json({
                erro: "Conta não encontrada."
            });
        }

        return res.status(200).json(conta);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao buscar conta."
        });
    }
}

// UPDATE - Atualizar conta
async function atualizarConta(req, res) {
    try {
        const { id } = req.params;
        const { numero, saldo, tipo } = req.body;

        const conta = await prisma.conta.update({
            where: {
                id: Number(id)
            },
            data: {
                numero,
                saldo: saldo !== undefined ? Number(saldo) : undefined,
                tipo
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        return res.status(200).json(conta);

    } catch (erro) {
        console.error(erro);
        return res.status(404).json({
            erro: "Conta não encontrada ou dados inválidos."
        });
    }
}

// DELETE - Excluir conta
async function apagarConta(req, res) {
    try {
        const { id } = req.params;

        await prisma.conta.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(204).send();

    } catch (erro) {
        console.error(erro);
        return res.status(404).json({
            erro: "Conta não encontrada."
        });
    }
}

module.exports = {
    criarConta,
    listarContas,
    buscarContaPorId,
    atualizarConta,
    apagarConta
};
