
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecover } from "../../components/hooks/Recover/useRecover.js";

import { Button } from "@mui/material";

import Alert from "../../components/common/Alert/index.jsx";
import InputField from "../../components/common/Inputs/InputField/Index.jsx";
import AuthLayout from "../../components/layout/AuthLayout/index.jsx";

import styles from "./RecoverPass.module.css";


function RecoverPassPage() {
  const {
    email,
    setEmail,
    message,
    isError,
    isLoading,
    handleRecover,
  } = useRecover();

  useEffect(() => {
    document.title = "Recuperar Senha | CineHouse";
  }, []);

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <img className={styles.logo} src="./src/assets/logos/CinehouseNewLogo_2.png" alt="CineHouse Logo" />
        <h1 className={styles.title}>Recuperar Conta</h1>
        <p className={styles.subtitle}>
          Digite seu e-mail abaixo e enviaremos um email com as instruções para redefinição de sua senha.
        </p>

        {message && <Alert type={isError ? 'error' : 'success'} message={message} />}
        
        <form onSubmit={handleRecover}>
          <InputField
            variant="filled"
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" disabled={isLoading} className={styles.submitButton} variant="contained" fullWidth>
            {isLoading ? "Enviando..." : "Enviar E-mail"}
          </Button>
          
          <div className={styles.footerNote}>
            <p>Lembrou da senha?</p> <Link to="/">Fazer Login</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default RecoverPassPage;