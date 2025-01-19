import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import ApiService from "../../services/apiService";

function App() {
  const navigate = useNavigate();
  document.title = "Bem-Vindo"; // hook para alterar título da aba
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmes, setFilmes] = useState([]); // Estado para armazenar filmes
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a busca
  const [selectedGenre, setSelectedGenre] = useState(""); // Estado para o filtro de gênero
  const [selectedYear, setSelectedYear] = useState(""); // Estado para o filtro de ano
  const [selectedPrice, setSelectedPrice] = useState(""); // Estado para o filtro de preço
  const perfil = sessionStorage.getItem("perfil");

  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal
  const [selectedMovie, setSelectedMovie] = useState(null); // Armazena os detalhes do filme selecionado

  const mapeaGenero = {
    1: "Drama",
    2: "Ação",
    3: "Comédia",
    4: "Suspense",
    5: "Aventura",
    6: "Terror",
    7: "Mistério",
    8: "Crime",
  };

  // Busca os filmes da API ao carregar o componente
  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await ApiService.getFilmes();
        if (response && response.status === "success") {
          setFilmes(response.data); // Atualiza o estado com os filmes
        } else {
          console.error("Erro: resposta inesperada da API", response);
        }
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    };

    fetchFilmes();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePerfil = () => {
    navigate("/UserSettings");
  };

  const handleAdm = () => {
    navigate("/adm");
  };

  const handleSair = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("cliente");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  // Filtro de filmes
  const filteredFilmes = filmes.filter((filme) => {
    const genreMatch = selectedGenre
      ? mapeaGenero[filme.categoria_idcategoria] === selectedGenre
      : true;

    const yearMatch = selectedYear ? String(filme.ano) === selectedYear : true; // Garantir que a comparação de ano funcione

    const priceMatch = selectedPrice
      ? filme.precoCompra <= parseFloat(selectedPrice) // Garantir que selectedPrice seja convertido para número
      : true;

    return (
      genreMatch &&
      yearMatch &&
      priceMatch &&
      filme.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Obter os anos disponíveis para o filtro
  const years = [...new Set(filmes.map((filme) => filme.ano))]; // Cria uma lista única de anos

  // Função para abrir o modal com os detalhes do filme
  const handleOpenModal = (filme) => {
    setSelectedMovie(filme); // Define o filme selecionado
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setSelectedMovie(null); // Limpa os detalhes do filme
  };

  return (
    <div className="app">
      <header className="main-header">
        <h1 className="logo">CineHouse</h1>
        <nav className="nav-links">
          {/* Barra de Busca */}
          <input 
            type="text"
            placeholder="Buscar..."
            className="search-bar-filme"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filtro de Gênero */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-filter"
          >
            <option value="">Filtrar por Gênero</option>
            {Object.values(mapeaGenero).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Carrinho */}
          <button
            className="cart-button"
            onClick={() => alert("Carrinho clicado!")}
          >
            🛒 {/* Ícone do carrinho */}
            {/* Exibe a quantidade de itens no carrinho (nesse caso, começando com 0) */}
            (0)
          </button>
        </nav>
      </header>
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-button-navigation" onClick={toggleMenu}>
          <span className="material-icons">☰</span>
        </button>
        <ul>
          <li onClick={handlePerfil}>Perfil</li>
          <li>Filmes</li>
          {/* Condicional para exibir "Gerenciar Relatórios" apenas para perfis autorizados */}
          {perfil === "funcionario" && (
            <li onClick={handleAdm}>Gerenciar Relatórios</li>
          )}
          <li onClick={handleSair}>Sair</li>
        </ul>

        {/* Filtros */}
        <div className="filters">
          {/* Filtro de Ano */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="year-filter"
          >
            <option value="">Filtrar por Ano</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Filtro de Preço */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="price-filter"
          >
            <option value="">Filtrar por Preço</option>
            <option value="10">Até R$10</option>
            <option value="20">Até R$20</option>
            <option value="50">Até R$50</option>
            <option value="100">Até R$100</option>
          </select>
        </div>
      </aside>
      <main className="content">
        <section className="main-content">
          <div className="movies-grid">
            {filteredFilmes.length > 0 ? (
              filteredFilmes.map((filme) => (
                <MovieContainer
                  key={filme.idfilme}
                  title={filme.nomeFilme}
                  year={filme.ano}
                  classification={
                    filme.classificacaoIndicativa === 0
                      ? "Livre"
                      : filme.classificacaoIndicativa
                  }
                  genre={
                    mapeaGenero[filme.categoria_idcategoria] || "Desconhecido"
                  }
                  image={filme.imagem}
                  filme={filme} // Passa o filme completo para o MovieContainer
                  handleOpenModal={handleOpenModal} // Passa a função para abrir o modal
                />
              ))
            ) : (
              <p>Nenhum filme encontrado.</p>
            )}
          </div>
        </section>
      </main>

      {/* Modal de detalhes do filme */}
      {isModalOpen && selectedMovie && (
        <div className="movie-modal-overlay">
          <div className="movie-modal-content-navigation">
            <button className="close-button" onClick={handleCloseModal}>
              Fechar
            </button>
            <h2 className="titulo-filme">{selectedMovie.nomeFilme}</h2>
            <p>
              <strong>Gênero:</strong>{" "}
              {mapeaGenero[selectedMovie.categoria_idcategoria]}
            </p>
            <p>
              <strong>Ano:</strong> {selectedMovie.ano}
            </p>
            <p>
              <strong>Classificação Indicativa:</strong>{" "}
              {selectedMovie.classificacaoIndicativa === 0
                ? "Livre"
                : selectedMovie.classificacaoIndicativa}
            </p>
            <img className="img-filme"src={selectedMovie.imagem} alt={selectedMovie.nomeFilme} />
            <p>
              <strong>Preço Unitário:</strong> R$
              {selectedMovie.precoCompra.toFixed(2)}
            </p>
            <p>
              Preço locação (3 dias): R${" "}
              {(selectedMovie.precoCompra / 2).toFixed(2)}{" "}
            </p>
            <p>Quantidade disponível: {selectedMovie.qtdEstoque}</p>
            <button className="btn-add-carrinho">Adicionar Carrinho</button>
            {/* Exemplo de mais detalhes, você pode adicionar o que achar necessário */}
          </div>
        </div>
      )}
    </div>
  );

  function MovieContainer({
    title,
    year,
    genre,
    classification,
    image,
    filme,
    handleOpenModal,
  }) {
    return (
      <div className="movie-container" onClick={() => handleOpenModal(filme)}>
        <img src={image} alt={title} className="movie-image" />
        <div className="movie-info">
          <h4>{title}</h4>
          <p>
            {year}, {genre},
          </p>
          <p>Classificação Indicativa: {classification}</p>
        </div>
      </div>
    );
  }
}

export default App;
