import axios from "axios";

class ApiService {
  constructor() {
    // this.server = 'https://jsonserver-jet.vercel.app/api/';

    this.server = "http://localhost:5000/";
  }

  async registerUser(username, cpf, email, birthDate, password) {
    console.log(username, cpf, email, birthDate, password);
    const url = `${this.server}api/register`;
    try {
      const response = await axios.post(
        url,
        {
          username,
          cpf,
          email,
          birthDate,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  }

  async getUsuarios() {
    const url = `${this.server}api/users`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
      throw error;
    }
  }

  async getCategoria() {
    const url = `${this.server}api/categoria`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
      throw error;
    }
  }

  async getPedidos() {
    const url = `${this.server}api/pedido`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os pedidos:", error);
      throw error;
    }
  }

  async getHistorico() {
    // Atualiza a URL para o endpoint de pedidos
    const url = `${this.server}api/pedido`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Exibe no console a resposta com os pedidos
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Corrige a mensagem de erro para "pedidos"
      console.error("Erro ao buscar os pedidos:", error);
      throw error;
    }
  }

  async getFilmes() {
    const url = `${this.server}api/filmes`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
      throw error;
    }
  }

  async deletarFilme(idFilme) {
    const url = `${this.server}api/delete/filme/${idFilme}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar o filme:", error);
      throw error;
    }
  }

  async deletarUsuario(idUsuario) {
    const url = `${this.server}api/delete/user/${idUsuario}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Erro de resposta ao deletar usuário:",
          error.response.data
        );
        return error.response.data;
      } else {
        console.error("Erro ao deletar usuário:", error.message);
        throw error;
      }
    }
  }

  async alterarUsuario(idUsuario, username, email, birthDate) {
    const url = `${this.server}api/update/user/${idUsuario}`;
    try {
      const response = await axios.put(
        url,
        {
          username,
          email,
          birthDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar o usuário:", error);
      throw error;
    }
  }

}

export default new ApiService();
