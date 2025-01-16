import React, { useState, useEffect } from 'react';
import './EditarFilme.css'; // Arquivo de estilo para a tela de edição

const EditarFilme = () => {
  const [movieId, setMovieId] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  // Função para buscar os detalhes do filme baseado no ID
  const fetchMovieDetails = async () => {
    if (!movieId) return;

    try {
      const response = await fetch(`/api/movies/${movieId}`);
      if (response.ok) {
        const movieData = await response.json();
        setSalePrice(movieData.salePrice);
        setRentalPrice(movieData.rentalPrice);
        setReleaseDate(movieData.releaseDate);
        setDescription(movieData.description);
        setGenre(movieData.genre);
        setStockQuantity(movieData.stockQuantity);
      } else {
        alert('Filme não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar o filme:', error);
      alert('Erro ao buscar o filme.');
    }
  };

  // Função para salvar as alterações no filme
  const handleSave = async (e) => {
    e.preventDefault();
    // Lógica para salvar as alterações no filme
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'PUT', // Usamos PUT para editar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salePrice,
          rentalPrice,
          releaseDate,
          description,
          genre,
          stockQuantity,
        }),
      });

      if (response.ok) {
        alert('Filme editado com sucesso!');
      } else {
        alert('Falha ao editar o filme.');
      }
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
      alert('Erro ao salvar as alterações.');
    }
  };

  const handleGoBack = () => {
    // Lógica para voltar à página anterior
    window.history.back();
  };

  const handleRemove = () => {
    // Lógica para voltar à página anterior
  };

  useEffect(() => {
    document.title = 'Editar Filme'; // Alteração do título da aba
    document.body.classList.add('editar-filme-page');
    return () => {
      document.body.classList.remove('editar-filme-page');
    };
  }, []);

  return (
    <div className="editar-filme-container">
      <h2>Editar Filme</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="movieId">ID do Filme</label>
          <input
            type="text"
            id="movieId"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            onBlur={fetchMovieDetails} // Carregar os detalhes quando perder o foco
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salePrice">Valor do Filme (Venda)</label>
          <input
            type="text"
            id="salePrice"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Data de Lançamento</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Gênero</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockQuantity">Quantidade em Estoque</label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={handleGoBack}>Voltar</button>
          <button type="button" onCLick={handleRemove}>Remover Filme</button>
        </div>
      </form>
    </div>
  );
};

export default EditarFilme;
