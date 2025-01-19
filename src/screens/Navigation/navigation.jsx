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
    navigate("/");
  };

  // Filtro de filmes
  const filteredFilmes = filmes.filter((filme) => {
    const genreMatch = selectedGenre
      ? mapeaGenero[filme.categoria_idcategoria] === selectedGenre
      : true;

    const yearMatch = selectedYear ? String(filme.ano) === selectedYear : true; // Garantir que a comparação de ano funcione
    
    const priceMatch = selectedPrice
      ? filme.preco <= parseFloat(selectedPrice) // Garantir que selectedPrice seja convertido para número
      : true;

    return (
      genreMatch &&
      yearMatch &&
      priceMatch &&
      filme.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Obter os anos disponíveis para o filtro
  const years = [...new Set(filmes.map(filme => filme.ano))]; // Cria uma lista única de anos

  return (
    <div className="app">
      <header className="main-header">
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <h1 className="logo">CineHouse</h1>
        <nav className="nav-links">
          <a href="#movies">Filmes</a>
          <a href="#series">Séries</a>

          {/* Barra de Busca */}
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
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
        </nav>
      </header>
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          X
        </button>
        <ul>
          <li>Home</li>
          <li onClick={handlePerfil}>Perfil</li>
          <li>Filmes</li>
          <li onClick={handleAdm}>Gerenciar Relatórios</li>
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
                  classification={filme.classificacaoIndicativa === 0 ? "Livre" : filme.classificacaoIndicativa}
                  genre={mapeaGenero[filme.categoria_idcategoria] || "Desconhecido"}
                  image={filme.imagem}
                />
              ))
            ) : (
              <p>Nenhum filme encontrado.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );

  function MovieContainer({ title, year, genre, classification, image }) {
    return (
      <div className="movie-container">
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
