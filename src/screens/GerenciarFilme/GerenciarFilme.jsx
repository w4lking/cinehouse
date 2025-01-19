import React, { useEffect, useState } from "react";
import "./GerenciarFilme.css";
import ApiService from "../../services/apiService";

function GerenciarFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(""); // Estado para a categoria selecionada
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Controle do popup de edição
  const [showAddPopup, setShowAddPopup] = useState(false); // Controle do popup de adicionar filme
  const [selectedFilme, setSelectedFilme] = useState(null); // Dados do filme selecionado para editar
  const [newFilme, setNewFilme] = useState({
    // Estado para o novo filme
    nomeFilme: "",
    sinopse: "",
    dataLancamento: "",
    precoCompra: "",
    qtdEstoque: "",
    disponivelLocacao: false,
    classificacaoIndicativa: "",
    imagem: "",
  });

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await ApiService.getAllFilmes(); // Fazendo a chamada para buscar filmes
        if (response && response.status === "success") {
          setFilmes(response.data);
        } else {
          console.error("Erro: resposta inesperada da API", response);
        }
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    };

    fetchFilmes();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await ApiService.getCategoria(); // Fazendo a chamada para buscar categorias
        if (response && response.status === "success") {
          console.log("Categorias:", response.data);
          setCategorias(response.data);
        } else {
          console.error(
            "Erro: resposta inesperada da API de categorias",
            response.data
          );
        }
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  document.title = "Gerenciar Filmes";
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }

  const filteredFilmes = filmes.filter((filme) =>
    filme.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (filme) => {
    const categoriaAtual = categorias.find(
      (categoria) => categoria.idcategoria === filme.categoria_idcategoria
    ); // Localiza a categoria atual pelo ID

    setSelectedFilme({
      ...filme,
      dataLancamento: new Date(filme.dataLancamento)
        .toISOString()
        .split("T")[0], // Converte para yyyy-mm-dd
    });

    setSelectedCategoria(categoriaAtual?.nome || "");
    console.log("Categoria atual desse filme:", categoriaAtual?.nome);
    setShowPopup(true);
  };

  const handleAddFilmeClick = () => {
    setShowAddPopup(true); // Abre o popup de adicionar filme
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Fecha o popup de edição
  };

  const handleAddPopupClose = () => {
    setShowAddPopup(false);
    // Reseta o estado do formulário ao fechar
    setNewFilme({
      nomeFilme: "",
      sinopse: "",
      dataLancamento: "",
      precoCompra: "",
      qtdEstoque: "",
      disponivelLocacao: false,
      classificacaoIndicativa: "",
      imagem: "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      const filmeParaSalvar = {
        ...selectedFilme,
        disponivelLocacao: selectedFilme.disponivelLocacao ? 1 : 0, // Define 1 ou 0 baseado no estado atual
      };

      // Verifique se `idcategoria` está definido antes de salvar
      if (!filmeParaSalvar.idcategoria) {
        alert("Por favor, selecione uma categoria válida antes de salvar.");
        return;
      }

      // Chama a API para atualizar o filme, passando o ID da categoria
      const response = await ApiService.alterarFilme(
        filmeParaSalvar.idfilme,
        filmeParaSalvar.nomeFilme,
        filmeParaSalvar.sinopse,
        filmeParaSalvar.dataLancamento,
        filmeParaSalvar.precoCompra,
        filmeParaSalvar.qtdEstoque,
        filmeParaSalvar.disponivelLocacao,
        filmeParaSalvar.classificacaoIndicativa,
        filmeParaSalvar.imagem,
        filmeParaSalvar.idcategoria // Envia o ID da categoria
      );

      if (
        response &&
        (response.status === "ok" || response.status === "success")
      ) {
        alert("Filme atualizado com sucesso!");
        window.location.reload();
        setShowPopup(false); // Fecha o popup após salvar
      } else {
        alert(
          `Erro ao atualizar o Filme: ${
            response.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro inesperado ao atualizar o filme.");
    }
  };

  const handleAddFilme = async () => {
    if (!selectedCategoria) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    try {
      const response = await ApiService.adicionarFilme(
        newFilme.nomeFilme,
        newFilme.sinopse,
        newFilme.dataLancamento,
        parseFloat(newFilme.precoCompra),
        parseInt(newFilme.qtdEstoque, 10),
        newFilme.disponivelLocacao,
        newFilme.classificacaoIndicativa,
        newFilme.imagem,
        selectedCategoria
      );

      if (
        response &&
        (response.status === "ok" || response.status === "success")
      ) {
        alert("Filme adicionado com sucesso!");
        window.location.reload();
        // Fechar popup e resetar estado
        handleAddPopupClose();
      } else {
        alert(
          `Erro ao adicionar o Filme: ${
            response.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Erro ao adicionar filme. Tente novamente.");
    }
  };

  const handleDeleteFilme = async (idFilme) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar este Filme com o ID ${idFilme}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await ApiService.deletarFilme(idFilme); // Aguarda a resposta da API
      if (
        response &&
        (response.status === "ok" ||
          response.status === "success" ||
          response.status === 200)
      ) {
        alert("Filme deletado com sucesso!");
        window.location.reload();
      } else {
        alert(
          `Erro ao deletar o Filme: ${response.message || "Erro desconhecido"}`
        );
      }
    } catch (error) {
      console.error(
        "O filme pode estar sendo referenciado em um pedido:",
        error
      );
      alert("Erro inesperado ao deletar o filme.");
    }
  };

  return (
    <div className="gerenciar-filmes-container">
      <h1>Gerenciar Filmes</h1>

      {/* Barra de pesquisa */}
      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por filmes."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleAddFilmeClick}>Adicionar Filme</button>
      </div>

      {/* Lista de filmes */}
      <div className="filmes-lista">
        {filteredFilmes.length > 0 ? (
          filteredFilmes.map((filme) => (
            <div className="filme-item" key={filme.idfilme}>
              <div className="filme-info">
                <span className="filme-icon">🎬</span>
                <span>
                  ID: {filme.idfilme} Nome do Filme: {filme.nomeFilme}
                </span>
              </div>
              <div className="filme-acoes">
                <button
                  className="btn alterar"
                  onClick={() => handleEditClick(filme)}
                >
                  Alterar
                </button>
                <button
                  className="btn deletar"
                  onClick={() => handleDeleteFilme(filme.idfilme)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>

      {/* Popup para edição */}
      {showPopup && selectedFilme && (
        <div className="popup">
          <div className="popup-content">
            <h2>Editar Filme</h2>
            <label>ID Filme:</label>
            <input 
              type="text"
              disabled={true}
              value={selectedFilme.idfilme}
              onChange={(e) =>
                setSelectedFilme({ ...selectedFilme, idfilme: e.target.value })
              }
            />
            <label>Nome do Filme:</label>
            <input
              type="text"
              value={selectedFilme.nomeFilme}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  nomeFilme: e.target.value,
                })
              }
            />
            <label>Sinopse:</label>
            <textarea
              type="text"
              value={selectedFilme.sinopse}
              onChange={(e) =>
                setSelectedFilme({ ...selectedFilme, sinopse: e.target.value })
              }
            />
            <label>Categoria:</label>
            <select
              value={selectedCategoria} // Vincula ao ID da categoria
              onChange={(e) => {
                const novaCategoria = categorias.find(
                  (categoria) =>
                    categoria.idcategoria.toString() === e.target.value
                );
                setSelectedCategoria(novaCategoria?.nome || ""); // Atualiza o nome da categoria
                setSelectedFilme({
                  ...selectedFilme,
                  idcategoria: novaCategoria?.idcategoria || "", // Atualiza o ID da categoria no filme
                });
              }}
            >
              {/* Exibe a categoria atual como primeira opção */}
              <option value={selectedFilme.idcategoria || ""}>
                {selectedCategoria || "Selecione uma Categoria"}
              </option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idcategoria}
                  value={categoria.idcategoria}
                >
                  {categoria.nome}
                </option>
              ))}
            </select>

            <label>Data de Lançamento:</label>
            <input
              type="date"
              value={selectedFilme.dataLancamento}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  dataLancamento: e.target.value,
                })
              }
            />
            <label>Preço de Compra:</label>
            <input
              type="number"
              value={selectedFilme.precoCompra}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  precoCompra: e.target.value,
                })
              }
            />
            <label>Quantidade em Estoque:</label>
            <input
              type="number"
              value={selectedFilme.qtdEstoque}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  qtdEstoque: e.target.value,
                })
              }
            />
            <label>Disponível para Locação:</label>
            <input
              type="checkbox"
              checked={selectedFilme.disponivelLocacao}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  disponivelLocacao: e.target.checked,
                })
              }
            />
            <label>Classificação Indicativa:</label>
            <input
              type="text"
              value={selectedFilme.classificacaoIndicativa}
              onChange={(e) =>
                setSelectedFilme({
                  ...selectedFilme,
                  classificacaoIndicativa: e.target.value,
                })
              }
            />
            <label>Imagem:</label>
            <input
              type="text"
              value={selectedFilme.imagem}
              onChange={(e) =>
                setSelectedFilme({ ...selectedFilme, imagem: e.target.value })
              }
            />
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

      {/* Popup para adicionar filme */}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Adicionar Filme</h2>
            <label>Nome do Filme:</label>
            <input
              type="text"
              value={newFilme.nomeFilme}
              onChange={(e) =>
                setNewFilme({ ...newFilme, nomeFilme: e.target.value })
              }
            />
            <label>Sinopse:</label>
            <textarea
              value={newFilme.sinopse}
              onChange={(e) =>
                setNewFilme({ ...newFilme, sinopse: e.target.value })
              }
            />
            <label>Categoria:</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
            >
              <option value="">Selecione uma Categoria</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idcategoria}
                  value={categoria.idcategoria}
                >
                  {categoria.nome}
                </option>
              ))}
            </select>
            <label>Data de Lançamento:</label>
            <input
              type="date"
              value={newFilme.dataLancamento}
              onChange={(e) =>
                setNewFilme({ ...newFilme, dataLancamento: e.target.value })
              }
            />
            <label>Preço de Compra:</label>
            <input
              type="number"
              value={newFilme.precoCompra}
              onChange={(e) =>
                setNewFilme({ ...newFilme, precoCompra: e.target.value })
              }
            />
            <label>Quantidade em Estoque:</label>
            <input
              type="number"
              value={newFilme.qtdEstoque}
              onChange={(e) =>
                setNewFilme({ ...newFilme, qtdEstoque: e.target.value })
              }
            />
            <label>Disponível para Locação:</label>
            <input
              type="checkbox"
              checked={newFilme.disponivelLocacao}
              onChange={(e) =>
                setNewFilme({
                  ...newFilme,
                  disponivelLocacao: e.target.checked,
                })
              }
            />
            <label>Classificação Indicativa:</label>
            <input
              type="text"
              value={newFilme.classificacaoIndicativa}
              onChange={(e) =>
                setNewFilme({
                  ...newFilme,
                  classificacaoIndicativa: e.target.value,
                })
              }
            />
            <label>Imagem:</label>
            <input
              type="text"
              value={newFilme.imagem}
              onChange={(e) =>
                setNewFilme({ ...newFilme, imagem: e.target.value })
              }
            />
            <div className="popup-actions">
              <button className="btn salvar" onClick={handleAddFilme}>
                Adicionar
              </button>
              <button className="btn cancelar" onClick={handleAddPopupClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarFilmes;
