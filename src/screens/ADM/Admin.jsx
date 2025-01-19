/* eslint-disable no-unused-vars */
import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  document.title = "Administrativo CineHouse"; // hook para alterar título da aba
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/adm/criarUsuario");
  };

  const handleManageUser = () => {
    navigate("/gerenciarUsuarios");
  };

  const handleRelatorioVenda = () => {
    navigate("/relatorio/alugueisEVendas");
  };

  const handleRelatorioDevolucao = () => {
    navigate("/relatorio/devolucao");
  };

  const handleAcessarGerenciamento = () => {
    navigate("/GerenciarFilme");
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo CineHouse</h1>
      {/* Container dos cards */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-users card-icon"></i> Gerenciar Usuários
          </div>
          <div className="card-body">
            <button onClick={handleAddUser}>
              <i className="fas fa-user-plus"></i> Adicionar Usuário
            </button>
            <button onClick={handleManageUser}>
              <i className="fas fa-user-edit"></i> Visualizar Usuários
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i className="fas fa-chart-line card-icon"></i> Gerar Relatórios
          </div>
          <div className="card-body">
            <button onClick={handleRelatorioVenda}>
              <i className="fas fa-file-alt"></i> Relatório de Vendas/Aluguéis
            </button>
            <button onClick={handleRelatorioDevolucao}>
              <i className="fas fa-clipboard-list"></i> Relatório de Devoluções
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i className="fas fa-film card-icon"></i> Gerenciamento de Filmes
          </div>
          <div className="card-body">
            <button onClick={handleAcessarGerenciamento}>
              <i className="fas fa-cogs"></i> Acessar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
