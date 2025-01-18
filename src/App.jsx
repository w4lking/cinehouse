/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login/Login";
import Recover from "./screens/Recover/Recover";
import Register from "./screens/Register/Register";
import Navigation from "./screens/Navigation/navigation";
import UserSettings from "./screens/UserSettings/UserSettings";
import Admin from "./screens/ADM/Admin";
import Relatorio from "./screens/Relatorios/AluguelEVenda/Relatorio";
import HistPedidos from "./screens/HistPedidos/histPedidos";
import GerenciarUsuarios from "./screens/GerenciarUsuarios/GerenciarUsuarios";
import RelatorioDevolucao from "./screens/Relatorios/Devolucoes/Relatorio";
import CriarUsuario from "./screens/CriarUsuario/CriarUsuario";
import GerenciarFilme from "./screens/GerenciarFilme/GerenciarFilme";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
