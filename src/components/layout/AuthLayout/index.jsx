
import styles from './AuthLayout.module.css';
import pageBackground from '../../../assets/images/netflix-3.jpg'; // Imagem defundo
import formImage from '../../../assets/images/melhores-series-originais-netflix.jpg'; 

function AuthLayout({ children }) {
  const layoutStyle = {
    '--background-image-url': `url(${pageBackground})`
  };

  return (
    <div className={styles.authContainer} style={layoutStyle}>
      <div className={styles.authCard}>
        {/* Imagem do Painel */}
        <div className={styles.imagePanel}>
          <img src={formImage} alt="Painel de Filmes" />
        </div>
        
        {/* Formulário */}
        <div className={styles.formPanel}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;