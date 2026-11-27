
import { Link, useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    sessionStorage.getItem("usuario") || "null"
  );

  function sair() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");

    navigate("/Login");
  }

  if (!usuario || !sessionStorage.getItem("token")) {
    navigate("/Login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white p-10">

      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#D4AF37]">
          Banco
        </h1>

        <button
          onClick={sair}
          className="bg-[#D4AF37] text-[#0B1F3A] px-6 py-3 rounded-lg hover:scale-105 transition-transform"
        >
          Sair
        </button>
      </header>

      <div className="min-w-7xl text-center">
        <h2 className="text-4xl font-bold">
          Bem-vindo, {usuario.nome}!
        </h2>

        <p className="text-xl mt-4 text-gray-300">
          Você entrou na sua conta com sucesso.
        </p>

        <div className="mt-4 bg-[#D4AF37] text-[#0B1F3A] rounded-2xl p-10 max-w-4xl h-76 mx-auto">
          <h3 className="text-2xl font-bold">Seus dados</h3>

          <p className="mt-4">Nome: {usuario.nome}</p>

          <p>E-mail: {usuario.email}</p>

          <p>ID: {usuario.id}</p>
        </div>
        <div className="max-w-4xl grid grid-cols-3 gap-12 mx-auto mt-4">
          <div className="bg-white rounded-2xl h-24">
            <Link to="/Pix" className="text-black">PIX</Link>
          </div>
          <div className="bg-white rounded-2xl">a</div>
          <div className="bg-white rounded-2xl">a</div>
        </div>
      </div>

    </div>
  );
}

export default Home;
