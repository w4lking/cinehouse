import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { useLogin } from "../../components/hooks/Login/useLogin.js";
import AuthLayout from "../../components/layout/AuthLayout/index.jsx";
import InputField from "../../components/common/Inputs/InputField/Index.jsx"; 
import Alert from "../../components/common/Alert/index.jsx"; // 1. Importe o componente de Alerta

import styles from './Login.module.css'; 

function LoginPage() {
    const { email, setEmail, password, setPassword, error, isLoading, handleLogin } = useLogin();

    useEffect(() => {
        document.title = "Login | CineHouse";
    }, []);

    return (
        <AuthLayout>
            <div className={styles.formWrapper}>
                <img className={styles.logo} src="./src/assets/images/CineHouseLogo.png" alt="CineHouse Logo" />
                
                {/* 2. Adicione esta linha para renderizar o alerta */}
                {error && <Alert type="error" message={error} />}

                <form onSubmit={handleLogin}>
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className={styles.actions}>
                        <Link to="/recover" className={styles.forgotPasswordLink}>Esqueceu a senha?</Link>
                    </div>
                    <Button type="submit" className={styles.submitButton} disabled={isLoading} variant="contained" fullWidth>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                    <div className={styles.footerNote}>
                        <p>Ainda não possui uma conta? <Link to="/register">Criar Conta</Link></p>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;
