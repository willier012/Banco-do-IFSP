
import { Link, useNavigate } from "react-router";
import { useState } from "react";

function Cadastro() {
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    const form = event.currentTarget;
    const dados = new FormData(form);

    const nome = dados.get("nome").trim();
    const cpf = dados.get("cpf").trim();
    const email = dados.get("email").trim();
    const senha = dados.get("senha");
    const confirmaSenha = dados.get("confirmaSenha");

    if (senha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          cpf,
          email,
          senha
        })
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || "Erro ao cadastrar usuário.");
      }

      setSucesso("Cadastro realizado com sucesso!");

      form.reset();

      setTimeout(() => {
        navigate("/Login");
      }, 1000);

    } catch (erro) {
      setErro(erro.message || "Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0B1F3A] text-white p-10">

      <div className="fixed left-4 top-4">
        <Link
          to="/"
          className="inline-block text-xl duration-300 transition-transform hover:scale-105"
        >
          Voltar
        </Link>
      </div>

      <div>
        <div className="min-w-2xl bg-[#D4AF37] rounded-2xl">

          <h2 className="text-3xl text-center pt-4">
            Cadastro
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8">

            <input
              type="text"
              name="nome"
              placeholder="Nome Completo"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              maxLength={14}
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <input
              type="password"
              name="confirmaSenha"
              placeholder="Confirme sua senha"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            {erro && (
              <p className="text-red-900 text-center font-semibold">
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="text-green-900 text-center font-semibold">
                {sucesso}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="bg-[#0B1F3A] text-white p-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </button>

          </form>
        </div>

        <div className="flex justify-center mt-2">
          <p className="text-xl">Já tem uma conta?</p>

          <Link
            to="/Login"
            className="inline-block duration-300 transition-transform hover:scale-105 text-[#D4AF37] ml-2 text-xl"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
