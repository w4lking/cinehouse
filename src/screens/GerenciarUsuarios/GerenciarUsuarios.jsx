import React, { useEffect, useState } from "react";
import "./GerenciarUsuarios.css";
import ApiService from "../../services/apiService";

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);  // Controle do popup
  const [selectedUsuario, setSelectedUsuario] = useState(null);  // Dados do usuário selecionado para editar

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

  const handleEditClick = (usuario) => {
    setSelectedUsuario(usuario);  // Preenche os dados no estado
    setShowPopup(true);  // Abre o popup
  };

  const handlePopupClose = () => {
    setShowPopup(false);  // Fecha o popup
  };

  const handleSaveChanges = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações via API
    console.log("Salvar alterações para:", selectedUsuario);
    setShowPopup(false);  // Fecha o popup após salvar
  };

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
            <div className="usuario-item" key={usuario.idusuario}>
              <div className="usuario-info">
                <span className="usuario-icon">👤</span>
                <span>
                  ID: {usuario.idusuario} Nome do usuário: {usuario.nome}
                </span>
              </div>
              <div className="usuario-acoes">
                <button className="btn alterar" onClick={() => handleEditClick(usuario)}>Alterar</button>
                <button className="btn deletar">Deletar</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>

      {/* Popup para edição */}
      {showPopup && selectedUsuario && (
        <div className="popup">
          <div className="popup-content">
            <h2>Editar Usuário</h2>
            <label>ID:</label>
            <input
              type="text"
              value={selectedUsuario.idusuario}
              disabled
            />
            <label>Nome:</label>
            <input
              type="text"
              value={selectedUsuario.nome}
              onChange={(e) => setSelectedUsuario({ ...selectedUsuario, nome: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="text"
              value={selectedUsuario.email}
              onChange={(e) => setSelectedUsuario({ ...selectedUsuario, email: e.target.value })}
            />
            <label>Data Nascimento:</label>
            <input
              type="date"
              value={selectedUsuario.email}
              onChange={(e) => setSelectedUsuario({ ...selectedUsuario, dataNasc: e.target.value })}
            />
            {/* Adicione mais campos conforme necessário */}
            <div className="popup-actions">
              <button className="btn salvar" onClick={handleSaveChanges}>Salvar</button>
              <button className="btn cancelar" onClick={handlePopupClose}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarUsuarios;
