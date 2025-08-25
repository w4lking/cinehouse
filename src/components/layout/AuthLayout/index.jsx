// 1. O Componente JSX: src/components/layout/AuthLayout/index.jsx

import styles from './AuthLayout.module.css';
import pageBackground from '../../../assets/images/netflix-3.jpg'; // Imagem para o fundo da página
import formImage from '../../../assets/images/melhores-series-originais-netflix.jpg'; // Imagem para o painel esquerdo do formulário

function AuthLayout({ children }) {
  const layoutStyle = {
    '--background-image-url': `url(${pageBackground})`
  };

  return (
    <div className={styles.authContainer} style={layoutStyle}>
      {/* O "cartão" que contém as duas colunas */}
      <div className={styles.authCard}>
        {/* Coluna da Esquerda: Imagem do Painel */}
        <div className={styles.imagePanel}>
          <img src={formImage} alt="Painel de Filmes" />
        </div>
        
        {/* Coluna da Direita: Conteúdo do Formulário */}
        <div className={styles.formPanel}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;