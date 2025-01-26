import React, { useState} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./RecuperarSenha.css";
import ApiService from "../../services/apiService";

const RecuperarSenha = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem. Tente novamente.");
      setErro(true);
      return;
    }

    setCarregando(true);
    setErro(false);
    setMensagem("");

    try {
      const response = await ApiService.resetPassword(email, token, senha);
      if (response.ok) {
        setMensagem("Sua senha foi atualizada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 3000); // Aguarda 2 segundos antes de redirecionar
      } else {
        setMensagem("Erro ao atualizar senha. Tente novamente.");
        setErro(true);
      }
    } catch (error) {
      setMensagem("Erro ao atualizar senha. Tente novamente.");
      setErro(true);
    } finally {
      setCarregando(false);
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
                Nova Senha:{" "}
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="recuperar-senha-input"
                  required
                />
              </label>
              <label className="recuperar-senha-rotulo">
                Confirme a Senha:{" "}
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="recuperar-senha-input"
                  required
                />
              </label>
              <button
                type="submit"
                className="recuperar-senha-botao"
                disabled={carregando}
              >
                {carregando ? "Processando..." : "Confirmar"}
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
