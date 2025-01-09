import React, { useState, useEffect } from 'react';
import './MovieManagement.css';

const MovieManagement = () => {
  const [movieId, setMovieId] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  useEffect(() => {
    document.title = 'Gerencia de Filmes'; // hook para alterar titulo da aba
    document.body.classList.add('movie-management-page');
    return () => {
      document.body.classList.remove('movie-management-page');
    };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Lógica para salvar os dados do filme
  };

  const handleGoBack = () => {
    // Lógica para voltar
  };

  return (
    <div className="movie-management-container">
      <h2>Gerenciamento de Filme</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="movieId">ID ou Nome do Filme</label>
          <input
            type="text"
            id="movieId"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
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
          <label htmlFor="rentalPrice">Valor do Filme (Locação)</label>
          <input
            type="text"
            id="rentalPrice"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
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
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleGoBack}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default MovieManagement;