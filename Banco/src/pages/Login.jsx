import { Link } from "react-router";

function Login() {

  function handleSubmit(event) {
    event.preventDefault();
    alert("Formulário enviado!");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0B1F3A] text-white p-10">
      <div className="fixed left-4 top-4">
        <Link to="/" className="inline-block text-xl duration-300 transition-transform hover:scale-105">Voltar</Link>
      </div>
      <div>
        <div className="min-w-2xl h-[500px] bg-[#D4AF37] rounded-2xl">
          <div>
            <h2 className="text-3xl text-center pt-4">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 mt-20">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <input
              type="password"
              placeholder="Senha"
              className="p-3 rounded-lg text-black focus:outline-none border-2 border-[#0B1F3A]"
              required
            />

            <button
              type="submit"
              className="bg-[#0B1F3A] text-white p-3 rounded-lg hover:scale-105 transition-transform"
            >
              Entrar
            </button>
          </form>

        </div>
        <div className="flex justify-center"><p className="text-xl">Não tem uma conta?</p><Link to="/Cadastro" className="inline-block duration-300 transition-transform hover:scale-105 text-[#D4AF37] ml-2 text-xl">Cadastro</Link></div>
      </div>

    </div>
  );
}

export default Login;