
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";

import { useLogin } from "../../components/hooks/Login/useLogin.js";
import AuthLayout from "../../components/layout/AuthLayout/index.jsx";

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
                <form onSubmit={handleLogin}>
                    <TextField 
                        className={styles.textField} 
                        variant="outlined"
                        fullWidth 
                        label="Email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField 
                        className={styles.textField}
                        variant="outlined"
                        fullWidth 
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
                        Ainda não possui uma conta? <Link to="/register">Criar Conta</Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;