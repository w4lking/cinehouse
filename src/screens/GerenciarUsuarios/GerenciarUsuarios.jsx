import React, { useEffect, useState } from "react";
import "./GerenciarUsuarios.css";
import ApiService from "../../services/apiService";

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await ApiService.getUsuarios();
        if (response && response.status === "success") {
          setUsuarios(response.data);
        } else {
          console.error("Erro: resposta inesperada da API", response);
        }
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gerenciar-usuarios-container">
      <h1>GERENCIAR USUÁRIOS</h1>

      {/* Barra de pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por usuários."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button>Buscar</button>
      </div>

      {/* Lista de usuários */}
      <div className="usuarios-lista">
        {filteredUsuarios.length > 0 ? (
          filteredUsuarios.map((usuario) => (
            <div className="usuario-item" key={usuario.idusuarios}>
              <div className="usuario-info">
                <span className="usuario-icon">👤</span>
                <span>
                  ID: {usuario.idusuario} Nome do usuário: {usuario.nome}
                </span>
              </div>
              <div className="usuario-acoes">
                <button className="btn alterar">Alterar</button>
                <button className="btn deletar">Deletar</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default GerenciarUsuarios;
