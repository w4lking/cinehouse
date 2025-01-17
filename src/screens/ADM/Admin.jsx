/* eslint-disable no-unused-vars */
import React from "react";
import "./Admin.css";
import pranchetaPng from "./imagens/prancheta.png";
import userIconPng from "./imagens/userIcon.png";
import movieIconPng from "./imagens/movieIcon.png";

const Admin = () => {
  document.title = "Administrativo CineHouse"; // hook para alterar título da aba

  return (
    <div>
      {/* Container dos cards */}
      <div className="container">
        <div className="card">
          <div className="card-header">Gerenciar usuários</div>
          <div className="card-body">
            <img
              src={userIconPng}
              alt="Ícone de Gerenciar Usuários"
              className="card-image"
            />
            <button>Adicionar usuário</button>
            <button>Editar usuário</button>
            <button>Buscar usuário</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Gerar relatório</div>
          <div className="card-body">
            <img
              src={pranchetaPng}
              alt="Ícone de Gerar Relatório"
              className="card-image"
            />
            <button>Relatório de finanças</button>
            <button>Relatório de vendas/alugéis</button>
            <button>Relatório de devoluções</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Editar Filmes</div>
          <div className="card-body">
            <img
              src={movieIconPng}
              alt="Ícone de Editar Filmes"
              className="card-image"
            />
            <button>Adicionar filmes</button>
            <button>Editar filme</button>
            <button>Remover filme</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
