import React, { useState } from "react";
import "./RecuperarSenha.css";

const RecuperarSenha = () => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === confirmarSenha) {
      setMensagem("Senha atualizada com sucesso!");
      setErro(false);
    } else {
      setMensagem("As senhas não coincidem. Tente novamente.");
      setErro(true);
    }
  };

  return (
    <div className="recuperar-senha-body">
      <div className="recuperar-senha-container">
        <h1 className="recuperar-senha-titulo">Cine House</h1>
        <p className="recuperar-senha-subtitulo">Recupere sua senha abaixo</p>
        <form onSubmit={handleSubmit} className="recuperar-senha-formulario">
          <label className="recuperar-senha-rotulo">
            Nova Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="recuperar-senha-input"
              required
            />
          </label>
          <label className="recuperar-senha-rotulo">
            Confirme a Senha:
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="recuperar-senha-input"
              required
            />
          </label>
          <button type="submit" className="recuperar-senha-botao">
            Confirmar
          </button>
        </form>
        {mensagem && (
          <p
            className={`recuperar-senha-mensagem ${
              erro ? "recuperar-senha-mensagem-error" : ""
            }`}
          >
            <span className="icon">
              {erro ? <FaTimesCircle /> : <FaCheckCircle />}
            </span>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecuperarSenha;
