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
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Controle do popup
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Dados do usuário selecionado para editar
  const [showFuncionarioPopup, setShowFuncionarioPopup] = useState(false); // Controla o pop-up para adicionar funcionário
  const [funcionarioData, setFuncionarioData] = useState({
    idusuario: "",
    cargo: "",
    salario: "",
  }); // Armazena os dados do funcionário

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
      salario: "",
    });
    setShowFuncionarioPopup(true); // Abre o pop-up
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função de adicionar funcionário
  /*const handleAddFuncionarioClick = async (usuario) => {
    const cargoPadrao = "Administrador"; // Cargo padrão
    const salarioPadrao = 2000; // Salário padrão

    try {
      // Certifique-se de que o usuário.idusuario está sendo passado corretamente
      const response = await ApiService.AdicionarFuncionario({
        usuario_idusuario: usuario.idusuario,
        cargo: cargoPadrao,
        salario: salarioPadrao,
      });

      // Verifique a resposta da API
      if (response && response.status === "success") {
        alert(
          `Usuário ${usuario.nome} foi adicionado como funcionário com sucesso!`
        );
      } else {
        alert(
          `Erro ao adicionar funcionário: ${
            response?.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      if (error.response) {
        // Exibe detalhes completos da resposta de erro do backend
        console.error("Detalhes do erro:", error.response.data);
        alert(
          `Erro ao adicionar funcionário: ${
            error.response.data.message || "Erro desconhecido"
          }`
        );
      } else {
        alert("Erro inesperado ao adicionar funcionário.");
      }
    }
  };*/

  const handlePopupClose = () => {
    setShowPopup(false); // Fecha o popup
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

  return (
    <div className="gerenciar-usuarios-container">
      <h1>GERENCIAR USUÁRIOS</h1>

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
                <button
                  className="btn-funcionario"
                  onClick={() => handleAddFuncionarioClick(usuario)}
                >
                  Adicionar Funcionario
                </button>
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
            <label>ID:</label>
            <input type="text" value={selectedUsuario.idusuario} disabled />
            <label>Nome:</label>
            <input
              type="text"
              value={selectedUsuario.nome}
              onChange={(e) =>
                setSelectedUsuario({ ...selectedUsuario, nome: e.target.value })
              }
            />
            <label>Email:</label>
            <input
              type="text"
              value={selectedUsuario.email}
              onChange={(e) =>
                setSelectedUsuario({
                  ...selectedUsuario,
                  email: e.target.value,
                })
              }
            />
            <label>Data Nascimento:</label>
            <input
              type="date"
              value={selectedUsuario.dataNasc}
              onChange={(e) =>
                setSelectedUsuario({
                  ...selectedUsuario,
                  dataNasc: e.target.value,
                })
              }
            />
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

      {showFuncionarioPopup && (
        <div className="popup-funcionario">
          <div className="popup-funcionario-content">
            <h2>Adicionar Funcionário</h2>
            <label>ID do Usuário:</label>
            <input type="text" value={funcionarioData.idusuario} disabled />

            <label>Cargo:</label>
            <input
              type="text"
              value={funcionarioData.cargo}
              onChange={(e) =>
                setFuncionarioData({
                  ...funcionarioData,
                  cargo: e.target.value,
                })
              }
            />

            <label>Salário:</label>
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

            <div className="popup-actions-funcionario">
              <button
                className="btn salvar funcionario"
                onClick={handleSaveFuncionario}
              >
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
    </div>
  );
}

export default GerenciarUsuarios;
