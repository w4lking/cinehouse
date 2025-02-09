import React, { useEffect, useState } from "react";
import "./GerenciarUsuarios.css";
import ApiService from "../../services/apiService";

// Funções para conversão de datas
function formatDateToDisplay(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function formatDateToISO(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

//Função de delete
const handleDeleteClick = async (idUsuario) => {
  const confirmDelete = window.confirm(
    `Tem certeza que deseja deletar este usuário com o ID ${idUsuario}?`
  );

  if (!confirmDelete) return;

  try {
    const response = await ApiService.deletarUsuario(idUsuario);

    if (
      response &&
      (response.status === "ok" || response.status === "success")
    ) {
      alert("Usuário deletado com sucesso!");
      window.location.reload();
    } else {
      alert(
        `Erro ao deletar o usuário: ${response.message || "Erro desconhecido"}`
      );
    }
  } catch (error) {
    console.error("Erro ao deletar o usuário:", error);
    alert("Erro inesperado ao deletar o usuário.");
  }
};

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários
  const [searchTerm, setSearchTerm] = useState(""); // Controle da busca
  const [showPopup, setShowPopup] = useState(false); // Controle do popup
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Dados do usuário selecionado para editar
  const [showFuncionarioPopup, setShowFuncionarioPopup] = useState(false); // Controla o pop-up para adicionar funcionário
  const [funcionarioData, setFuncionarioData] = useState({
    idusuario: "",
    cargo: "",
    salario: "",
  }); // Armazena os dados do funcionário

  // Estados para o pop-up de alterar funcionário
  const [isEditFuncionarioOpen, setIsEditFuncionarioOpen] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");

  document.title = "Gerencia";
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await ApiService.getUsuarios();
        if (response && response.status === "success") {
          // Formata a data dos usuários ao carregar os dados
          const formattedUsuarios = response.data.map((usuario) => ({
            ...usuario,
            dataNasc: usuario.dataNasc ? usuario.dataNasc.split("T")[0] : "", // Garante formato `yyyy-MM-dd`
          }));
          setUsuarios(formattedUsuarios);
        } else {
          console.error("Erro: resposta inesperada da API", response);
        }
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSaveFuncionario = async () => {
    if (!funcionarioData.cargo || !funcionarioData.salario) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await ApiService.adicionarFuncionario({
        usuario_idusuario: funcionarioData.idusuario,
        cargo: funcionarioData.cargo,
        salario: funcionarioData.salario,
      });

      if (response && response.status === "success") {
        alert("Funcionário adicionado com sucesso!");
        setShowFuncionarioPopup(false); // Fecha o pop-up
      } else {
        alert(`Erro: ${response?.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert("Erro inesperado ao adicionar funcionário.");
    }
  };

  // Cuida do pop-upp de adicionar funcionário
  const handleAddFuncionarioClick = (usuario) => {
    setFuncionarioData({
      idusuario: usuario.idusuario,
      cargo: "",
      salario: 2000,
    });
    setShowFuncionarioPopup(true); // Abre o pop-up
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePopupClose = () => {
    setShowPopup(false); // Fecha o popup
  };

  const handleEditClick = (usuario) => {
    setSelectedUsuario({
      ...usuario,
      dataNasc: usuario.dataNasc || "",
    });
    setShowPopup(true); // Abre o popup de edição
  };

  const handleSaveAlteracaoFuncionario = async () => {
    if (!selectedFuncionario) {
      alert("Nenhum usuário selecionado.");
      return;
    }

    try {
      // Prepara os dados para enviar à API
      const funcionarioParaSalvar = {
        ...selectedFuncionario,
        dataNasc: selectedFuncionario.dataNasc.includes("/")
          ? formatDateToISO(selectedFuncionario.dataNasc) // Converte a data para ISO, se necessário
          : selectedFuncionario.dataNasc,
      };

      console.log("Dados do funcionário para salvar:", funcionarioParaSalvar); // Log para depuração

      // Chama a API para atualizar o funcionário
      const response = await ApiService.alterarFuncionario(
        cargo,
        salario,
        funcionarioParaSalvar.idFuncionario
      );

      console.log("Resposta da API:", response); // Log da resposta da API
      if (
        response &&
        (response.status === "ok" || response.status === "success")
      ) {
        alert("Funcionário atualizado com sucesso!");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.idusuario === funcionarioParaSalvar.idusuario
              ? { ...usuario, ...funcionarioParaSalvar }
              : usuario
          )
        );
        setIsEditFuncionarioOpen(false); // Fecha o popup após salvar
      } else {
        alert(
          `Erro ao atualizar o funcionário: ${
            response.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro inesperado ao atualizar o funcionário.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Prepara os dados para enviar à API
      const usuarioParaSalvar = {
        ...selectedUsuario,
        dataNasc: selectedUsuario.dataNasc.includes("/")
          ? formatDateToISO(selectedUsuario.dataNasc) // Converte a data para ISO, se necessário
          : selectedUsuario.dataNasc,
      };
      console.log("Dados do usuário para salvar:", usuarioParaSalvar); // Log para depuração
      // Chama a API para atualizar o usuário
      const response = await ApiService.alterarUsuario(
        usuarioParaSalvar.idusuario,
        usuarioParaSalvar.nome,
        usuarioParaSalvar.email,
        usuarioParaSalvar.dataNasc
      );

      if (
        response &&
        (response.status === "ok" || response.status === "success")
      ) {
        alert("Usuário atualizado com sucesso!");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.idusuario === usuarioParaSalvar.idusuario
              ? { ...usuario, ...usuarioParaSalvar }
              : usuario
          )
        );

        setShowPopup(false); // Fecha o popup após salvar
      } else {
        alert(
          `Erro ao atualizar o usuário: ${
            response.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro inesperado ao atualizar o usuário.");
    }
  };

  // Abrir o pop-up alterar funcionario
  const handleEditFuncionarioClick = (usuario) => {
    setSelectedFuncionario(usuario); // Define o funcionário selecionado
    setCargo(usuario.cargo || ""); // Preenche com o cargo atual (se disponível)
    setSalario(usuario.salario || ""); // Preenche com o salário atual (se disponível)
    setIsEditFuncionarioOpen(true); // Abre o pop-up
  };

  // Fechar o pop-up alterar funcionário
  const handleClosePopup = () => {
    setIsEditFuncionarioOpen(false);
    setSelectedFuncionario(null);
    setCargo("");
    setSalario("");
  };

  return (
    <div className="gerenciar-usuarios-container">
      <h1>GERENCIAR USUÁRIOS</h1>

      <button
        className="back-button-gerenciar"
        onClick={() => window.history.back()}
      >
        <i className="fas fa-arrow-left"></i> Voltar
      </button>

      {/* Barra de pesquisa */}
      <div className="search-bar-usuario">
        <input
          type="text"
          placeholder="Buscar por usuários."
          value={searchTerm}
          onChange={handleSearch}
        />
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
                {/* Verifica se o usuário já é funcionário */}
                {usuario.idFuncionario ? (
                  <button
                    className="btn-funcionario-alterar-funcionario"
                    onClick={() => handleEditFuncionarioClick(usuario)}
                  >
                    Alterar Funcionario
                  </button>
                ) : (
                  <button
                    className="btn-funcionario-adicionar-funcionario"
                    onClick={() => handleAddFuncionarioClick(usuario)}
                  >
                    Adicionar Funcionario
                  </button>
                )}
                <button
                  className="btn alterar"
                  onClick={() => handleEditClick(usuario)}
                >
                  Alterar
                </button>
                <button
                  className="btn deletar"
                  onClick={() => handleDeleteClick(usuario.idusuario)}
                >
                  Deletar
                </button>
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
            <label>
              ID:{" "}
              <input type="text" value={selectedUsuario.idusuario} disabled />
            </label>
            <label>
              Nome:{" "}
              <input
                className="input-nome"
                type="text"
                value={selectedUsuario.nome}
                onChange={(e) =>
                  setSelectedUsuario({
                    ...selectedUsuario,
                    nome: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Email:{" "}
              <input
                className="input-email"
                type="text"
                value={selectedUsuario.email}
                onChange={(e) =>
                  setSelectedUsuario({
                    ...selectedUsuario,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Data Nascimento:{" "}
              <input
                className="input-dataNasc"
                type="date"
                value={selectedUsuario.dataNasc}
                onChange={(e) =>
                  setSelectedUsuario({
                    ...selectedUsuario,
                    dataNasc: e.target.value,
                  })
                }
              />
            </label>
            {/* Adicione mais campos conforme necessário */}
            <div className="popup-actions">
              <button className="btn salvar" onClick={handleSaveChanges}>
                Salvar
              </button>
              <button className="btn cancelar" onClick={handlePopupClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup para adicionar funcionário */}
      {showFuncionarioPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Adicionar Funcionário</h2>
            <label>
              ID do Usuário:{" "}
              <input type="text" value={funcionarioData.idusuario} disabled />
            </label>
            <label>
              Cargo:{" "}
              <select
                value={funcionarioData.cargo || ""}
                onChange={(e) =>
                  setFuncionarioData({
                    ...funcionarioData,
                    cargo: e.target.value,
                  })
                }
              >
                <option value="">Selecione um cargo</option>
                <option value="Caixa">Caixa</option>
                <option value="Administrador">Administrador</option>
              </select>
            </label>
            <label>
              Salário:{" "}
              <input
                type="number"
                value={funcionarioData.salario}
                onChange={(e) =>
                  setFuncionarioData({
                    ...funcionarioData,
                    salario: e.target.value,
                  })
                }
              />
            </label>

            <div className="popup-actions">
              <button className="btn salvar" onClick={handleSaveFuncionario}>
                Salvar
              </button>
              <button
                className="btn cancelar funcionario"
                onClick={() => setShowFuncionarioPopup(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditFuncionarioOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Alterar Funcionário</h2>
            <form onSubmit={handleSaveAlteracaoFuncionario}>
              <div className="form-group-funcionario">
                <label htmlFor="cargo">
                  Cargo{" "}
                  <select
                    id="cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                  >
                    <option value="">Selecione o cargo</option>
                    <option value="caixa">Caixa</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </label>
              </div>
              <div className="form-group-funcionario">
                <label htmlFor="salario">
                  Salário{" "}
                  <input
                    type="number"
                    id="salario"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Digite o salário"
                  />
                </label>
              </div>
              <div className="popup-actions">
                <button type="submit" className="btn salvar">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="btn cancelar"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarUsuarios;
