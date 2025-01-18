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
    navigate("/");
  };

  // Filtra os filmes com base no termo de busca
  const filteredFilmes = filmes.filter((filme) =>
    filme.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  classification={filme.classificacaoIndicativa}
                  genre={filme.categoria_idcategoria}
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

  function MovieContainer({ title, year, genre, classification ,image }) {
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
