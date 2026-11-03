import { BankIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="h-screen min-w-7xl">
          <div className="flex">
            <div className="mt-60">
              <h2>BANCO DALIER</h2>
              <h1 className="text-3xl font-bold">Faça um Cartão de Crédito <br></br>de Graça</h1>
              <div className="mt-4">
              <Link to="/Login" className="bg-[#D4AF37] text-xl rounded-2xl px-4 py-1 text-[#0B1F3A] transition-transform duration-300 hover:scale-110 inline-block">Login</Link>
              <Link to="/Cadastro" className="bg-[#0B1F3A] text-xl rounded-2xl px-4 py-1 text-[#D4AF37] ml-4 transition-transform duration-300 hover:scale-110 inline-block">Cadastro</Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="min-w-7xl mt-8 rounded-2xl min-h-56 bg-[#0B1F3A] text-white mx-auto">
          <div className="flex mt-4">
            <div className="mx-4">
              <BankIcon
                size={54}
                color="#d4af37"
                weight="duotone"
              />
            </div>
            <div>
              <h1 className="text-2xl text-white font-bold">BANCO DALIER</h1>
              <p className="text-[#D4AF37]">SEU FUTURO, NOSSA PRIORIDADE</p>
            </div>
          </div>
          <hr className="text-[#163E6C] mx-auto max-w-19/20 mt-4" />
          <div>HISTORIA DO BANCO</div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="min-w-7xl grid grid-cols-3 mx-auto mt-8 gap-26">
          <div className="bg-white min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl ">NOSSAS METAS</h2>
          </div>
          <div className="bg-white min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl ">CONTRIBUIÇÕES</h2>
          </div>
          <div className="bg-[#D4AF37] min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl text-[#0B1F3A]">USUÁRIOS ON-LINE</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;