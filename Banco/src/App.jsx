
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import PageHome from "./pages/PageHome";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Pix from "./pages/Pix";

function App() {
  return (
    <Routes>
      {/* Página inicial pública */}
      <Route path="/" element={<Home />} />

      {/* Cadastro */}
      <Route path="/Cadastro" element={<Cadastro />} />

      {/* Login */}
      <Route path="/Login" element={<Login />} />

      {/* Página após o login */}
      <Route path="/PageHome" element={<PageHome />} />

      <Route path="/Pix" element={<Pix />} />
    </Routes>
  );
}

export default App;
