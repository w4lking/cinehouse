
import { useState, useEffect, useMemo } from "react";
import ApiService from "../../services/apiService"; 

export function useManageMovies() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controlo dos modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null); // null para 'adicionar', objeto para 'editar'

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moviesRes, categoriesRes] = await Promise.all([
        ApiService.getAllFilmes(),
        ApiService.getCategoria(),
      ]);

      if (moviesRes?.status === "success") setMovies(moviesRes.data);
      if (categoriesRes?.status === "success") setCategories(categoriesRes.data);

    } catch (err) {
      setError("Falha ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleUpsertMovie = async (movieData) => {
    try {
      if (movieData.idfilme) { // Se tem ID, é uma atualização
        await ApiService.alterarFilme(
           movieData.idfilme, movieData.nomeFilme, movieData.sinopse, 
           movieData.dataLancamento, movieData.precoCompra, movieData.qtdEstoque, 
           movieData.disponivelLocacao, movieData.classificacaoIndicativa, 
           movieData.imagem, movieData.idcategoria
        );
      } else { // Senão, é uma adição
        await ApiService.adicionarFilme(
          movieData.nomeFilme, movieData.sinopse, movieData.dataLancamento, 
          movieData.precoCompra, movieData.qtdEstoque, movieData.disponivelLocacao, 
          movieData.classificacaoIndicativa, movieData.imagem, movieData.idcategoria
        );
      }
      closeModal();
      fetchData(); // Recarrega os dados para mostrar as alterações
    } catch(err) {
      setError("Falha ao guardar o filme.");
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm(`Tem a certeza que deseja apagar o filme com ID ${movieId}?`)) {
      try {
        await ApiService.deletarFilme(movieId);
        fetchData(); // Recarrega os dados
      } catch (err) {
        setError("Falha ao apagar o filme.");
      }
    }
  };
  
  const filteredMovies = useMemo(() =>
    movies.filter(movie =>
      movie.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase())
    ), [movies, searchTerm]);

  // Funções de controlo do modal
  const openModal = (movie = null) => {
    setEditingMovie(movie); // Se 'movie' for null, é um formulário de adição
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingMovie(null);
    setIsModalOpen(false);
  };

  return {
    movies: filteredMovies,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleDeleteMovie,
    handleUpsertMovie,
    isModalOpen,
    editingMovie,
    openModal,
    closeModal,
  };
}