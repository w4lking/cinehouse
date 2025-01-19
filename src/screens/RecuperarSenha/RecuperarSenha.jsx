import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./RecuperarSenha.css";

const RecuperarSenha = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === confirmarSenha) {
      setMensagem("Senha atualizada com sucesso!");
      setErro(false);

      // Aqui você pode enviar a nova senha para o backend com o token
      console.log("Email:", email);
      console.log("Token:", token);
      console.log("Nova Senha:", senha);
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
        {email && token ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="recuperar-senha-formulario"
            >
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
                {mensagem}
              </p>
            )}
          </>
        ) : (
          <p className="recuperar-senha-erro">
            Parâmetros inválidos. Verifique o link recebido.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecuperarSenha;
