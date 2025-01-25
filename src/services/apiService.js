import axios from "axios";

class ApiService {
  constructor() {
    // this.server = "https://cinehouse-server.vercel.app/";

    this.server = "http://localhost:5000/";
  }

  async loginUser(email, password) {
    const url = `${this.server}api/user/login`;
    try {
      const response = await axios.post(
        url,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Erro na chamada de login:", error);
      throw error;
    }
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

  async getAllFilmes() {
    const url = `${this.server}api/all/filmes`;
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

  // api para deletar filme
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
      if (error.response) {
        console.error(
          "Erro de resposta ao deletar Filme:",
          error.response.data
        );
        return error.response.data;
      } else {
        console.error("Erro ao deletar Filme:", error.message);
        throw error;
      }
    }
  }

  async adicionarFilme(
    nomeFilme,
    sinopse,
    dataLancamento,
    precoCompra,
    qtdEstoque,
    disponivelLocacao,
    classificacaoIndicativa,
    imagem,
    idcategoria
  ) {
    const url = `${this.server}api/add/filme`;
    try {
      const response = await axios.post(
        url,
        {
          nomeFilme,
          sinopse,
          dataLancamento,
          precoCompra,
          qtdEstoque,
          disponivelLocacao,
          classificacaoIndicativa,
          imagem,
          idcategoria,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
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

  async getRelatorioLocacao() {
    const url = `${this.server}api/relatorio/locacao`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao gerar relatorio de locação:", error);
      throw error;
    }
  }

  async getRelatorioVendas() {
    const url = `${this.server}api/relatorio/vendas`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao gerar relatorio de locação:", error);
      throw error;
    }
  }

  async getRelatorioDevolucao() {
    const url = `${this.server}api/relatorio/devolucao`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao gerar relatorio de devolução:", error);
      throw error;
    }
  }

  // api para editar filme
  async alterarFilme(
    idFilme,
    nomeFilme,
    sinopse,
    dataLancamento,
    precoCompra,
    qtdEstoque,
    disponivelLocacao,
    classificacaoIndicativa,
    imagem,
    idcategoria
  ) {
    const url = `${this.server}api/update/filme/${idFilme}`;
    try {
      const response = await axios.put(
        url,
        {
          nomeFilme,
          sinopse,
          dataLancamento,
          precoCompra,
          qtdEstoque,
          disponivelLocacao,
          classificacaoIndicativa,
          imagem,
          idcategoria,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar o filme:", error);
      throw error;
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

  async devolverPedido(idPedido, statusPedido, qtdEstoque) {
    const url = `${this.server}api/pedido/devolver/qtdEstoque${idPedido}/${statusPedido}/${qtdEstoque}`;
    try {
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao devolver o pedido:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async getPedidoById(idpedido) {
    const url = `${this.server}api/getPedidoByid/${idpedido}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar informações do pedido", error);
      throw error;
    }
  }

  async EstenderPedido(idPedido, statusPedido, dataDevolucao) {
    const url = `${this.server}api/pedido/devolver/${idPedido}/${statusPedido}/${dataDevolucao}`;
    try {
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao estender o pedido:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async devolverPedido(idPedido, statusPedido) {
    const url = `${this.server}api/pedido/devolver/${idPedido}/${statusPedido}`;
    try {
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao devolver o pedido:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  async adicionarFuncionario({ usuario_idusuario, salario, cargo }) {
    const url = `${this.server}api/add/funcionario`;

    try {
      const response = await axios.post(
        url,
        {
          usuario_idusuario,
          salario,
          cargo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      throw error;
    }
  }

  async recuperarSenha(email) {
    const url = `${this.server}api/user/recover`;
    try {
      const response = await axios.post(
        url,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      throw error;
    }
  }

  async resetPassword(email, token, senha) {
    const url = `${this.server}api/user/reset/password`;
    try {
      const response = await axios.post(
        url,
        { email, token, senha },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      throw error;
    }
  }
}

export default new ApiService();
