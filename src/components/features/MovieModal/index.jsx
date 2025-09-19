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

  // Impede que o clique dentro da modal a feche
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Símbolo 'x' para fechar */}
        </button>
        
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img src={movie.imagem} alt={movie.nomeFilme} />
          </div>

          <div className={styles.infoContainer}>
            <h2 className={styles.title}>{movie.nomeFilme}</h2>
            <p className={styles.synopsis}>
              <strong>Sinopse:</strong> {movie.sinopse}
            </p>
            <p className={styles.price}>
              <strong>Preço Unitário:</strong> R$ {movie.precoCompra.toFixed(2)}
            </p>
            <p className={styles.stock}>
              Quantidade disponível: {movie.qtdEstoque}
            </p>
            
            <div className={styles.actions}>
              <div className={styles.quantityControls}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(movie.qtdEstoque, q + 1))}>+</button>
              </div>
              <button 
                className={styles.addToCartButton} 
                onClick={handleAddToCart} 
                disabled={movie.qtdEstoque === 0}
              >
                {movie.qtdEstoque > 0 ? "Adicionar ao Carrinho" : "Indisponível"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;