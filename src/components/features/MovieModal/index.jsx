
import { useState } from 'react';

import styles from './MovieModal.module.css';

function MovieModal({ movie, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const movieToAdd = {
      id: movie.idfilme,
      nome: movie.nomeFilme,
      preco: movie.precoCompra,
      quantidade: quantity,
      imagem: movie.imagem,
    };
    cart.push(movieToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${movie.nomeFilme} foi adicionado ao carrinho!`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
        <h2>{movie.nomeFilme}</h2>
        <img src={movie.imagem} alt={movie.nomeFilme} />
        <p><strong>Sinopse:</strong> {movie.sinopse}</p>
        <p><strong>Preço Unitário:</strong> R$ {movie.precoCompra.toFixed(2)}</p>
        <p>Quantidade disponível: {movie.qtdEstoque}</p>
        <div className={styles.quantityControls}>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => Math.min(movie.qtdEstoque, q + 1))}>+</button>
        </div>
        <button onClick={handleAddToCart} disabled={movie.qtdEstoque === 0}>
          {movie.qtdEstoque > 0 ? "Adicionar ao Carrinho" : "Indisponível"}
        </button>
      </div>
    </div>
  );
}

export default MovieModal;
