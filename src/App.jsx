/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./screens/Login/index.jsx";
import Recover from "./screens/Recover/index.jsx";
import Register from "./screens/Register/index.jsx";
import Home from "./screens/Home/index.jsx";
import UserSettings from "./screens/UserSettings/UserSettings";
import Admin from "./screens/AdminDashboardPage/index.jsx";
import Relatorio from "./screens/Relatorios/AluguelEVenda/Relatorio";
import HistPedidos from "./screens/HistPedidos/histPedidos";
import GerenciarUsuarios from "./screens/adm/GerenciarUsuarios/index.jsx";
import RelatorioDevolucao from "./screens/Relatorios/Devolucoes/Relatorio";
import CriarUsuario from "./screens/adm/CriarUsuario/index.jsx";
import GerenciarFilme from "./screens/adm/GerenciarFilme/index.jsx";
import RecuperarSenha from "./screens/RecuperarSenha/RecuperarSenha.jsx"
import './App.css'; // Importando o CSS global

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userSettings" element={<UserSettings />} />
        <Route path="/adm" element={<Admin />} />
        <Route path="/relatorio/alugueisEVendas" element={<Relatorio />} />
        <Route path="/relatorio/devolucao" element={<RelatorioDevolucao />} />
        <Route path="/histPedidos" element={<HistPedidos />} />
        <Route path="/gerenciarUsuarios" element={<GerenciarUsuarios />} />
        <Route path="/gerenciarFilme" element={<GerenciarFilme />} />
        <Route path="/adm/criarUsuario" element={<CriarUsuario />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
