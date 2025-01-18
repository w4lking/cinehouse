import React, { useEffect, useState } from "react";
import "./GerenciarFilme.css";
import ApiService from "../../services/apiService";

function GerenciarFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);  // Controle do popup de edição
  const [showAddPopup, setShowAddPopup] = useState(false);  // Controle do popup de adicionar filme
  const [selectedFilme, setSelectedFilme] = useState(null);  // Dados do filme selecionado para editar
  const [newFilme, setNewFilme] = useState({  // Estado para o novo filme
    nomeFilme: '',
    sinopse: '',
    dataLancamento: '',
    precoCompra: '',
    qtdEstoque: '',
    disponivelLocacao: false,
    classificacaoIndicativa: '',
    imagem: '',
  });

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await ApiService.getFilmes();  // Fazendo a chamada para buscar filmes
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

  document.title = "Gerenciar Filmes";
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFilmes = filmes.filter((filme) =>
    filme.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (filme) => {
    setSelectedFilme(filme);  // Preenche os dados no estado
    setShowPopup(true);  // Abre o popup de edição
  };

  const handleAddFilmeClick = () => {
    setShowAddPopup(true);  // Abre o popup de adicionar filme
  };

  const handlePopupClose = () => {
    setShowPopup(false);  // Fecha o popup de edição
  };

  const handleAddPopupClose = () => {
    setShowAddPopup(false);  // Fecha o popup de adicionar filme
  };

  const handleSaveChanges = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações via API
    console.log("Salvar alterações para:", selectedFilme);
    setShowPopup(false);  // Fecha o popup após salvar
  };

  const handleAddFilme = () => {
    // Adicionar lógica para salvar um novo filme via API
    console.log("Adicionar novo filme:", newFilme);
    setShowAddPopup(false);  // Fecha o popup após adicionar
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
                <button className="btn alterar" onClick={() => handleEditClick(filme)}>Alterar</button>
                <button className="btn deletar">Deletar</button>
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
              value={selectedFilme.idfilme}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, idfilme: e.target.value })}
            />
            <label>Nome do Filme:</label>
            <input
              type="text"
              value={selectedFilme.nomeFilme}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, nomeFilme: e.target.value })}
            />
            <label>Sinopse:</label>
            <textarea
              value={selectedFilme.sinopse}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, sinopse: e.target.value })}
            />
            <label>Data de Lançamento:</label>
            <input
              type="date"
              value={selectedFilme.dataLancamento}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, dataLancamento: e.target.value })}
            />
            <label>Preço de Compra:</label>
            <input
              type="number"
              value={selectedFilme.precoCompra}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, precoCompra: e.target.value })}
            />
            <label>Quantidade em Estoque:</label>
            <input
              type="number"
              value={selectedFilme.qtdEstoque}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, qtdEstoque: e.target.value })}
            />
            <label>Disponível para Locação:</label>
            <input
              type="checkbox"
              checked={selectedFilme.disponivelLocacao}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, disponivelLocacao: e.target.checked })}
            />
            <label>Classificação Indicativa:</label>
            <input
              type="text"
              value={selectedFilme.classificacaoIndicativa}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, classificacaoIndicativa: e.target.value })}
            />
            <label>Imagem:</label>
            <input
              type="text"
              value={selectedFilme.imagem}
              onChange={(e) => setSelectedFilme({ ...selectedFilme, imagem: e.target.value })}
            />
            <div className="popup-actions">
              <button className="btn salvar" onClick={handleSaveChanges}>Salvar</button>
              <button className="btn cancelar" onClick={handlePopupClose}>Cancelar</button>
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
              onChange={(e) => setNewFilme({ ...newFilme, nomeFilme: e.target.value })}
            />
            <label>Sinopse:</label>
            <textarea
              value={newFilme.sinopse}
              onChange={(e) => setNewFilme({ ...newFilme, sinopse: e.target.value })}
            />
            <label>Data de Lançamento:</label>
            <input
              type="date"
              value={newFilme.dataLancamento}
              onChange={(e) => setNewFilme({ ...newFilme, dataLancamento: e.target.value })}
            />
            <label>Preço de Compra:</label>
            <input
              type="number"
              value={newFilme.precoCompra}
              onChange={(e) => setNewFilme({ ...newFilme, precoCompra: e.target.value })}
            />
            <label>Quantidade em Estoque:</label>
            <input
              type="number"
              value={newFilme.qtdEstoque}
              onChange={(e) => setNewFilme({ ...newFilme, qtdEstoque: e.target.value })}
            />
            <label>Disponível para Locação:</label>
            <input
              type="checkbox"
              checked={newFilme.disponivelLocacao}
              onChange={(e) => setNewFilme({ ...newFilme, disponivelLocacao: e.target.checked })}
            />
            <label>Classificação Indicativa:</label>
            <input
              type="text"
              value={newFilme.classificacaoIndicativa}
              onChange={(e) => setNewFilme({ ...newFilme, classificacaoIndicativa: e.target.value })}
            />
            <label>Imagem:</label>
            <input
              type="text"
              value={newFilme.imagem}
              onChange={(e) => setNewFilme({ ...newFilme, imagem: e.target.value })}
            />
            <div className="popup-actions">
              <button className="btn salvar" onClick={handleAddFilme}>Adicionar</button>
              <button className="btn cancelar" onClick={handleAddPopupClose}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarFilmes;
