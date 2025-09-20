import React, { useState, useEffect } from "react";
import "./CriarUsuario.css";
import ApiService from "../../../services/apiService";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.title = "Criar Usuário";
    document.body.classList.add("create-user-page");

    return () => {
      document.body.classList.remove("create-user-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.registerUser(
        username,
        "",
        email,
        birthDate,
        password
      );
      setSuccessMessage(response.message || "Usuário criado com sucesso!");
      setErrorMessage("");
      // Limpa os campos após o sucesso
      setUsername("");
      setEmail("");
      setBirthDate("");
      setPassword("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Erro ao criar usuário. Tente novamente."
      );
      setSuccessMessage("");
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Adicionar Usuário</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite o nome do usuário"
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
              placeholder="Digite o email do usuário"
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
              placeholder="Digite a senha do usuário"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Criar usuário
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGoBack}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
