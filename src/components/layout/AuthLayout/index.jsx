import styles from './AuthLayout.module.css';
import pageBackground from '../../../assets/images/netflix-3.jpg';

function AuthLayout({ children }) {
  const layoutStyle = {
    '--background-image-url': `url(${pageBackground})`
  };

  return (
    <div className={styles.authContainer} style={layoutStyle}>
      {/* O .authCard agora é o próprio container do formulário */}
      <div className={styles.authCard}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
