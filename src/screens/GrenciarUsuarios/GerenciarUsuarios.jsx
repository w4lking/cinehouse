/* eslint-disable no-unused-vars */
import React from "react";
import "./GerenciarUsuarios.css";

const usuarios = [
  { id: 12, nome: "João Marcos Leal de Oliveira" },
  { id: 13, nome: "Maria Fernanda Souza" },
  { id: 14, nome: "Carlos Eduardo Santos" },
  { id: 15, nome: "Ana Carolina Ribeiro" },
  { id: 16, nome: "Bruno Henrique Oliveira" },
  { id: 17, nome: "Camila Araújo Silva" },
  { id: 18, nome: "Fernando Lima Alves" },
  { id: 19, nome: "Juliana Pereira Nascimento" },
  { id: 20, nome: "Lucas Silva Santos" },
  { id: 21, nome: "Mariana Oliveira Lima" },
  { id: 22, nome: "Pedro Henrique Souza" },
];

function GerenciarUsuarios() {
  return (
    <div className="gerenciar-usuarios-container">
      <h1>GERENCIAR USUÁRIOS</h1>
      <div className="usuarios-lista">
        {usuarios.map((usuario) => (
          <div className="usuario-item" key={usuario.id}>
            <div className="usuario-info">
              <span className="usuario-icon">👤</span>
              <span>
                ID:{usuario.id} Nome do usuário: {usuario.nome}
              </span>
            </div>
            <div className="usuario-acoes">
              <button className="btn alterar">Alterar</button>
              <button className="btn deletar">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GerenciarUsuarios;
