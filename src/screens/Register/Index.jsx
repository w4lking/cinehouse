import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useRegister } from "../../components/hooks/Register/useRegister.js";

import { Button } from "@mui/material";
import AuthLayout from "../../components/layout/AuthLayout/index.jsx";
import InputField from "../../components/common/Inputs/InputField/Index.jsx"; 
import Alert from "../../components/common/Alert/index.jsx"; 
function RegisterPage() {
  const {
    username, setUsername,
    email, setEmail,
    cpf, setCpf,
    birthDate, setBirthDate,
    password, setPassword,
    error, setError,
    successMessage, setSuccessMessage, 
    isLoading,
    handleSubmit,
  } = useRegister();

  useEffect(() => {
    document.title = "Registro | CineHouse";
  }, []);

  return (
    <AuthLayout>
      <div className={styles.formWrapper}>
        <img className={styles.logo} src="./src/assets/images/CineHouseLogo.png" alt="CineHouse Logo" />
        
        {/* 2. Mostra o alerta de erro ou de sucesso */}
        {error && <Alert type="error" message={error} onClose={() => setError("")} />}
        {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage("")} />}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputField
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
          <InputField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Data de Nascimento"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading} className={styles.submitButton} variant="contained" fullWidth>
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
          
          <div className={styles.footerNote}>
            <p>Já possui uma conta? <Link to="/">Entrar</Link></p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;

