import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useRegister } from "../../components/hooks/Register/useRegister.js";

// Importa os componentes do Material-UI
import { TextField, Button } from "@mui/material";
import AuthLayout from "../../components/layout/AuthLayout/index.jsx";
// import Alert from "../../components/common/Alert";

function RegisterPage() {
  const {
    username, setUsername,
    email, setEmail,
    cpf, setCpf,
    birthDate, setBirthDate,
    password, setPassword,
    error,
    success,
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
        {/* {success && <Alert type="success" message={success} />} */}
        {/* {error && <Alert type="error" message={error} />} */}
        <form onSubmit={handleSubmit}>
          <TextField
            className={styles.textField}
            variant="filled"
            fullWidth
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            className={styles.textField}
            variant="filled"
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            className={styles.textField}
            variant="filled"
            fullWidth
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
          <TextField
            className={styles.textField}
            variant="filled"
            fullWidth
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            InputLabelProps={{ shrink: true }} 
            required
          />
          <TextField
            className={styles.textField}
            variant="filled"
            fullWidth
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
            Já possui uma conta? <Link to="/">Entrar</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;