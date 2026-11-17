
import { BankIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

function Home() {
  return (
    <>
      {/* PRIMEIRA SEÇÃO */}
      <div className="w-full bg-[#0B1F3A] flex justify-center">
        <div className="w-full min-h-screen px-8 bg-[#0B1F3A]">

          <div className="flex w-full min-h-screen items-center justify-between">

            {/* TEXTO */}
            <div className="w-1/2 ml-48">
              <h2 className="text-white">BANCO DALIER</h2>

              <h1 className="text-3xl font-bold text-white">
                Faça um Cartão de Crédito <br />
                de Graça
              </h1>

              <div className="mt-4">
                <Link
                  to="/Login"
                  className="bg-[#D4AF37] text-xl rounded-2xl px-4 py-1 text-[#0B1F3A] transition-transform duration-300 hover:scale-110 inline-block"
                >
                  Login
                </Link>

                <Link
                  to="/Cadastro"
                  className="bg-[#0B1F3A] text-xl rounded-2xl px-4 py-1 text-[#D4AF37] ml-4 transition-transform duration-300 hover:scale-110 inline-block"
                >
                  Cadastro
                </Link>
              </div>
            </div>

            {/* IMAGEM */}
            <div className="w-1/2 flex justify-end items-center relative mr-32">

              {/* CÍRCULO PONTILHADO */}
              <div
                className="absolute w-[600px] h-[600px] rounded-full z-0 right-4"
                style={{
                  backgroundImage: `
  radial-gradient(circle, transparent 20%, transparent 100%),
  radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 2px)
                  `,
                  backgroundSize: "100% 100%, 10px 10px",
                  maskImage: "radial-gradient(circle, black 0%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 100%)"
                }}
              />

              {/* FOTO DO CARTÃO */}
              <img
                src="/cartaodecredito.png"
                className="w-[650px] max-w-full object-contain relative z-10"
                alt="Cartão de crédito"
              />

            </div>

          </div>
        </div>
      </div>

      {/* SEGUNDA SEÇÃO */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-7xl mt-8 rounded-2xl min-h-56 bg-[#0B1F3A] text-white mx-auto">

          <div className="flex mt-4">
            <div className="mx-4">
              <BankIcon
                size={54}
                color="#d4af37"
                weight="duotone"
              />
            </div>

            <div>
              <h1 className="text-2xl text-white font-bold">
                BANCO DALIER
              </h1>

              <p className="text-[#D4AF37]">
                SEU FUTURO, NOSSA PRIORIDADE
              </p>
            </div>
          </div>

          <hr className="text-[#163E6C] mx-auto max-w-[95%] mt-4" />

          <div>HISTORIA DO BANCO</div>
        </div>
      </div>

      {/* TERCEIRA SEÇÃO */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-7xl grid grid-cols-3 mx-auto mt-8 gap-8">

          <div className="bg-white min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl">
              NOSSAS METAS
            </h2>
          </div>

          <div className="bg-white min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl">
              CONTRIBUIÇÕES
            </h2>
          </div>

          <div className="bg-[#D4AF37] min-h-32 rounded-2xl flex items-center justify-center">
            <h2 className="text-center text-xl text-[#0B1F3A]">
              USUÁRIOS ON-LINE
            </h2>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
