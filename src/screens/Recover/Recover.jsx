import React, { useState, useEffect } from "react";
import "./Recover.css"; // Importando estilização CSS
import ApiService from "../../services/apiService";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  useEffect(() => {
    document.title = "Recuperar Acesso"; // Alterar título da aba
    document.body.classList.add("recover-page");

    return () => {
      document.body.classList.remove("recover-page");
    };
  }, []);

  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      // Chamando o método de recuperação no ApiService
      const response = await ApiService.recuperarSenha(email);
      setMensagem(response.message || "Instruções enviadas para o e-mail!");
      setErro(false);
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      setMensagem(
        error.response?.data?.message ||
          "Não foi possível processar a solicitação. Tente novamente."
      );
      setErro(true);
    }
  };

  const handleGoBack = () => {
    // Redirecionar para a página anterior
    window.history.back();
  };

  return (
    <div className="recovery-container">
      <h2 className="titulo-recuperar">Recuperar Conta</h2>
      <form onSubmit={handleRecover}>
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

        <div className="button-group-registrar">
          <button type="submit" className="btn-recuperar">
            Recuperar conta
          </button>
        </div>

        <div className="button-group-registrar">
          <button
            type="button"
            onClick={handleGoBack}
            className="btn-recuperar-voltar"
          >
            Voltar
          </button>
        </div>
      </form>

      {mensagem && (
        <div
          className={`mensagem-recuperar ${
            erro ? "mensagem-recuperar-erro" : "mensagem-recuperar-sucesso"
          }`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default Recover;
