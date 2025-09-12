import { useState, useEffect, useMemo } from 'react';
import ApiService from '../../services/apiService';

const genreMap = {
  1: "Drama", 2: "Ação", 3: "Comédia", 4: "Suspense",
  5: "Aventura", 6: "Terror", 7: "Mistério", 8: "Crime",
};

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await ApiService.getFilmes();
        if (response?.status === "success") {
          setMovies(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    };
    fetchMovies();
  }, []);

  const filteredFilmes = useMemo(() => {
    return movies.filter((movie) => {
      const genreMatch = selectedGenre ? genreMap[movie.categoria_idcategoria] === selectedGenre : true;
      const yearMatch = selectedYear ? String(movie.ano) === selectedYear : true;
      const priceMatch = selectedPrice ? movie.precoCompra <= parseFloat(selectedPrice) : true;
      const searchMatch = movie.nomeFilme.toLowerCase().includes(searchTerm.toLowerCase());
      return genreMatch && yearMatch && priceMatch && searchMatch;
    });
  }, [movies, searchTerm, selectedGenre, selectedYear, selectedPrice]);

  const years = useMemo(() => [...new Set(movies.map((movie) => movie.ano))].sort((a, b) => b - a), [movies]);
  const genres = useMemo(() => [...new Set(Object.values(genreMap))], []);

  return {
    filteredFilmes,
    searchTerm, setSearchTerm,
    selectedGenre, setSelectedGenre,
    selectedYear, setSelectedYear,
    selectedPrice, setSelectedPrice,
    genres,
    years
  };
}
