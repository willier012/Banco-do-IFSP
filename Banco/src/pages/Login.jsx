
import { Link, useNavigate } from "react-router";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");

    const form = event.currentTarget;
    const dados = new FormData(form);

    const email = dados.get("email").trim();
    const senha = dados.get("senha");

    try {
      setCarregando(true);

      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || "E-mail ou senha incorretos.");
      }

      sessionStorage.setItem("token", resultado.token);

      sessionStorage.setItem(
        "usuario",
        JSON.stringify(resultado.usuario)
      );

      form.reset();

      navigate("/PageHome");

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
        <div className="min-w-2xl h-[500px] bg-[#D4AF37] rounded-2xl">

          <h2 className="text-3xl text-center pt-4">
            Login
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 mt-20"
          >

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

            {erro && (
              <p className="text-red-900 text-center font-semibold">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="bg-[#0B1F3A] text-white p-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>

          </form>
        </div>

        <div className="flex justify-center mt-2">
          <p className="text-xl">Não tem uma conta?</p>

          <Link
            to="/Cadastro"
            className="inline-block duration-300 transition-transform hover:scale-105 text-[#D4AF37] ml-2 text-xl"
          >
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
