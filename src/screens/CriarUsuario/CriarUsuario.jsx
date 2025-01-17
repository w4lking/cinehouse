import "react";
import "./CriarUsuario.css";

function CreateUser() {
  return (
    <div className="container">
      <div className="form-box">
        <h2>Criar Usuário</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite o nome do usuário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite o email de usuário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite a senha de usuário"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Criar usuário
            </button>
            <button type="button" className="btn btn-secondary">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
