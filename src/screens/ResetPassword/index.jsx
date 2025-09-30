import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResetPassword } from '../../components/hooks/useResetPassword.js';

import AuthLayout from '../../components/layout/AuthLayout/index.jsx';
import InputField from '../../components/common/Inputs/InputField/Index.jsx';
import Alert from '../../components/common/Alert/index.jsx';
import { Button } from '@mui/material';

import styles from './ResetPasswordPage.module.css';

function ResetPassword() {
  const {
    email,
    token,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    isError,
    isLoading,
    handleSubmit,
  } = useResetPassword();

  useEffect(() => {
    document.title = "Redefinir Senha | CineHouse";
  }, []);

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <img className={styles.logo} src="./src/assets/logos/CinehouseNewLogo_2.png" alt="CineHouse Logo" />
        <h2 className={styles.title}>Redefinir Senha</h2>

        <p className={styles.instructions}>
          Crie uma nova senha para a sua conta.
        </p>
        {message && <Alert type={isError ? 'error' : 'success'} message={message} />}

        {email && token ? (
          <form onSubmit={handleSubmit}>
            <InputField
              label="Nova Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputField
              label="Confirmar Nova Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              className={styles.submitButton}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "A guardar..." : "Redefinir Senha"}
            </Button>
          </form>
        ) : (
          <div className={styles.invalidLink}>
            <Alert type="error" message="O link de recuperação é inválido ou expirou." />
            <Link to="/" className={styles.backLink}>Voltar ao Login</Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;
