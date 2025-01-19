import React, { useState, useEffect } from "react";
import "./Register.css";
import ApiService from "../../services/apiService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.title = "Registro";
    document.body.classList.add("register-page");

    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.registerUser(
        username,
        cpf,
        email,
        birthDate,
        password
      );
      setSuccessMessage(response.message || "Usuário registrado com sucesso!");
      setErrorMessage("");
      // Limpa os campos após o sucesso
      setUsername("");
      setCpf("");
      setEmail("");
      setBirthDate("");
      setPassword("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Erro ao registrar usuário. Tente novamente."
      );
      setSuccessMessage("");
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const validateCpf = (cpf) => {
    // Validação básica de CPF (apenas para o formato)
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  return (
    <div className="register-container">
      <h2>Crie sua conta</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onBlur={() => {
              if (!validateCpf(cpf)) {
                setErrorMessage("CPF inválido. Use o formato 000.000.000-00.");
              } else {
                setErrorMessage("");
              }
            }}
            placeholder="000.000.000-00"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
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
          <label htmlFor="birthDate">Data de Nascimento</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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
        </div>
        <button type="submit" className="register-button">
          Registrar
        </button>
        <button onClick={handleGoBack} className="register-button">
          Voltar
        </button>
      </form>
    </div>
  );
};

export default Register;
