/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ApiService from "../../services/apiService";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setShowAlert(true);
      return;
    }

    try {
      const response = await ApiService.loginUser(email, password);
      console.log("API Response:", response);

      if (response.ok) {
        sessionStorage.setItem("id", response.idusuario);
        sessionStorage.setItem("cliente", response.idcliente);
        sessionStorage.setItem("perfil", response.perfil);
        sessionStorage.setItem("token", response.token); 
        navigate("/navigation"); 
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setShowAlert(true);
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
      <h2 className="h2-login">Bem-vindo ao CineHouse</h2>
      {showAlert && (
        <div className="alert">
          Houve um erro. Suas credenciais podem estar incorretas.
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
            placeholder="Digite seu e-mail"
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
            placeholder="Digite sua senha"
            required
          />
          <a
            href="#"
            onClick={handleForgotPassword}
            className="forgot-password-link"
          >
            Esqueceu sua senha?
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
