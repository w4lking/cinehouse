/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // importando estilizacao css

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login"; // hook para alterar titulo da aba
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setShowAlert(true);
    } else {
      // Lógica de login aqui
      setShowAlert(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/recover");
  };

  return (
    <div className="login-container">
      <h2 className="h2-login">Login</h2>
      {showAlert && (
        <div className="alert">
          Por favor, insira suas credenciais para fazer login.
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <a
            href="#"
            onClick={handleForgotPassword}
            className="forgot-password-link"
          >
            Recuperar senha
          </a>
        </div>

        <div className="button-group-entrar">
          <button type="submit" className="btn1">
            Entrar
          </button>
        </div>

        <div className="button-group-entrar">
          <button onClick={handleCreateAccount} className="btn1">
            Criar Conta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
