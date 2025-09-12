import styles from './Alert.module.css';

// O componente recebe o tipo (error ou success) e a mensagem
function Alert({ type = 'error', message }) {
  // Escolhe a classe CSS com base no tipo
  const alertClass = type === 'error' ? styles.error : styles.success;

  return (
    <div className={`${styles.alert} ${alertClass}`}>
      {message}
    </div>
  );
}

export default Alert;
