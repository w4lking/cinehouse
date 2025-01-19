const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const saltRounds = 10;

function createRegisterRouter(db) {
  const router = express.Router();

  // Rota de registro
  router.post("/api/register", (req, res) => {
    const { username, cpf, email, birthDate, password } = req.body;

    console.log("Dados recebidos:", username, cpf, email, birthDate, password);

    if (!username || !email || !birthDate || !password) {
      return res.status(400).json({
        status: "error",
        message:
          "Os campos nome, email, data de nascimento e senha são obrigatórios.",
      });
    }

    // Criptografa a senha
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log("Senha criptografada:", hashedPassword);

    db.query(
      "INSERT INTO usuario (nome, email, senha, dataNasc) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, birthDate],
      (error, result) => {
        if (error) {
          console.error("Erro ao inserir usuário:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao cadastrar o usuário.",
          });
        }

        console.log("Usuário inserido com sucesso. ID:", result.insertId);

        // Recupera o ID do usuário recém-criado
        const userId = result.insertId;

        // Verifica se o CPF foi fornecido
        if (cpf) {
          // Insere os dados na tabela 'cliente'
          db.query(
            "INSERT INTO cliente (usuario_idusuario, cpf) VALUES (?, ?)",
            [userId, cpf],
            (error) => {
              if (error) {
                console.error("Erro ao inserir cliente:", error);
                return res.status(500).json({
                  status: "error",
                  message: "Erro ao cadastrar o cliente.",
                });
              }

              console.log("Cliente inserido com sucesso.");
              res.status(201).json({
                status: "ok",
                message: "Usuário e cliente cadastrados com sucesso.",
              });
            }
          );
        } else {
          // Caso não tenha CPF, apenas retorna o sucesso do cadastro do usuário
          res.status(201).json({
            status: "ok",
            message: "Usuário cadastrado com sucesso.",
          });
        }
      }
    );
  });

  router.get("/api/users", (req, res) => {
    db.query("SELECT * FROM usuario", (error, results) => {
      if (error) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao buscar usuários.",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Nenhum usuário encontrado.",
        });
      }
      console.log(results);
      res.status(200).json({
        status: "success",
        data: results,
      });
    });
  });

  router.delete("/ap/delete/filme/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM filme WHERE idfilme = ?", [id], (error, result) => {
      if (error) {
        console.error("Erro ao deletar filme:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao deletar o filme.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Filme não encontrado.",
        });
      }

      console.log("Filme deletado com sucesso.");
      res.json({
        status: "ok",
        message: "Filme deletado com sucesso.",
      });
    });
  });

  router.delete("/api/delete/filme", (req, res) => {
    db.query("DELETE FROM filme", (error, result) => {
      if (error) {
        console.error("Erro ao deletar filme:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao deletar o filme.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Filme não encontrado.",
        });
      }

      console.log("Filme deletado com sucesso.");
      res.json({
        status: "ok",
        message: "Filme deletado com sucesso.",
      });
    });
  });

  router.get("/api/relatorio/locacao", (req, res) => {
    db.query(
      `
        SELECT 
        filme.nomeFilme, 
        SUM(pedido_has_filme.quantidade) AS quantidade
        FROM pedido INNER JOIN pedido_has_filme ON pedido.idpedido = pedido_has_filme.pedido_idpedido  
        INNER JOIN filme ON filme.idfilme = pedido_has_filme.filme_idfilme
        WHERE 
        pedido.tipoPedido = 'Alocacao'
        GROUP BY 
        filme.idfilme, filme.nomeFilme;
      `,
      (error, result) => {
        if (error) {
          console.error("Erro ao gerar relatorio de devolução.", error);
          return res.status(500).json({
            status: "error",
            message: "Erro a gerar relatorio de devolução.",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Nenhuma locação encontrada para a criação do relatório.",
          });
        }

        console.log(result);
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    );
  });

  router.get("/api/relatorio/vendas", (req, res) => {
    db.query(
      ` 
        SELECT 
        filme.nomeFilme, 
        SUM(pedido_has_filme.quantidade) AS quantidade
        FROM pedido INNER JOIN pedido_has_filme ON pedido.idpedido = pedido_has_filme.pedido_idpedido  
        INNER JOIN filme ON filme.idfilme = pedido_has_filme.filme_idfilme
        WHERE 
        pedido.tipoPedido = 'Compra'
        GROUP BY 
        filme.idfilme, filme.nomeFilme;

      `,
      (error, result) => {
        if (error) {
          console.error("Erro ao gerar relatorio de vendas.", error);
          return res.status(500).json({
            status: "error",
            message: "Erro a gerar relatorio de devolução.",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Nenhuma venda encontrada para a criação do relatório.",
          });
        }

        console.log(result);
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    );
  });

  router.get("/api/relatorio/devolucao", (req, res) => {
    db.query(
      ` 
        SELECT pedido.statusPedido, usuario.nome, pedido.dataPedido, filme.nomeFilme
        FROM pedido INNER JOIN usuario ON usuario.idusuario = pedido.usuario_idusuario INNER JOIN
        pedido_has_filme ON pedido_has_filme.pedido_idpedido = pedido.idpedido INNER JOIN filme ON
        pedido_has_filme.filme_idfilme = filme.idfilme
        WHERE pedido.tipoPedido="Alocacao"; 
      `,
      (error, result) => {
        if (error) {
          console.error("Erro ao gerar relatorio de vendas.", error);
          return res.status(500).json({
            status: "error",
            message: "Erro a gerar relatorio de devolução.",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Nenhuma venda encontrada para a criação do relatório.",
          });
        }

        console.log(result);
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    );
  });

  router.put("/api/update/user/:id", (req, res) => {
    const { id } = req.params;
    const { username, email, birthDate } = req.body;

    console.log("Dados recebidos:", username, email, birthDate);

    if (!username || !email || !birthDate) {
      return res.status(400).json({
        status: "error",
        message: "Os campos nome, email, data de nascimento são obrigatórios.",
      });
    }

    db.query(
      "UPDATE usuario SET nome = ?, email = ?, dataNasc = ? WHERE idusuario = ?",
      [username, email, birthDate, id],
      (error, result) => {
        if (error) {
          console.error("Erro ao atualizar usuário:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao atualizar o usuário.",
          });
        }

        console.log("Usuário atualizado com sucesso.");
        res.status(200).json({
          status: "success",
          message: "Usuário atualizado com sucesso.",
        });
      }
    );
  });

  // Rota para editar filme
  router.put("/api/update/filme/:id", (req, res) => {
    const { id } = req.params; // ID do filme passado pela URL
    const {
      nomeFilme,
      sinopse,
      dataLancamento,
      precoCompra,
      qtdEstoque,
      disponivelLocacao,
      classificacaoIndicativa,
      imagem,
    } = req.body;

    console.log(
      "Dados recebidos:",
      nomeFilme,
      sinopse,
      dataLancamento,
      precoCompra,
      qtdEstoque,
      disponivelLocacao,
      classificacaoIndicativa,
      imagem
    );

    // Validação: Verificar se todos os campos necessários foram fornecidos
    if (
      !nomeFilme ||
      !sinopse ||
      !dataLancamento ||
      !precoCompra ||
      !qtdEstoque ||
      !classificacaoIndicativa ||
      !imagem
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Os campos nome do filme, sinopse, data de lançamento, preço de compra, quantidade em estoque, classificação indicativa e imagem são obrigatórios.",
      });
    }

    // Consulta SQL para atualizar os dados do filme no banco de dados
    db.query(
      "UPDATE filme SET nomeFilme = ?, sinopse = ?, dataLancamento = ?, precoCompra = ?, qtdEstoque = ?, disponivelLocacao = ?, classificacaoIndicativa = ?, imagem = ? WHERE idfilme = ?",
      [
        nomeFilme,
        sinopse,
        dataLancamento,
        precoCompra,
        qtdEstoque,
        disponivelLocacao,
        classificacaoIndicativa,
        imagem,
        id,
      ],
      (error, result) => {
        if (error) {
          console.error("Erro ao atualizar filme:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao atualizar o filme.",
          });
        }

        console.log("Filme atualizado com sucesso.");
        res.status(200).json({
          status: "success",
          message: "Filme atualizado com sucesso.",
        });
      }
    );
  });

  // rota para deletar usuário
  router.delete("/api/delete/user/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);

    db.query(
      "DELETE FROM usuario WHERE idusuario = ?",
      [id],
      (error, result) => {
        if (error) {
          console.error("Erro ao deletar usuário:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao deletar o usuário.",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Usuário não encontrado.",
          });
        }

        console.log("Usuário deletado com sucesso.");
        res.status(200).json({
          status: "success",
          message: "Usuário deletado com sucesso.",
        });
      }
    );
  });

  router.put("/api/pedido/devolver/:id/:statusPedido", (req, res) => {
    const { id, statusPedido } = req.params;
    console.log("ID do pedido:", id);
    console.log("Dados recebidos:", statusPedido);

    if (!statusPedido) {
      return res.status(400).json({
        status: "error",
        message: "Status do pedido não fornecido.",
      });
    }

    const query = "UPDATE pedido SET statusPedido = ? WHERE idpedido = ?";
    db.query(query, [statusPedido, id], (error, results) => {
      if (error) {
        console.error("Erro ao atualizar status do pedido:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao atualizar status do pedido.",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Pedido não encontrado.",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Status do pedido atualizado com sucesso.",
      });
    });
  });

  router.get("/api/filmes", (req, res) => {
    db.query(
      "SELECT  idfilme, nomeFilme, YEAR(dataLancamento) AS ano, precoCompra, imagem, classificacaoIndicativa, categoria_idcategoria FROM filme",
      (error, results) => {
        if (error) {
          console.error("Erro ao buscar filmes:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao buscar filmes.",
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Nenhum Filme encontrado.",
          });
        }
        console.log(results);
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    );
  });

  router.get("/api/categoria", (req, res) => {
    db.query("SELECT * FROM categoria", (error, results) => {
      if (error) {
        console.error("Erro ao buscar categorias:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao buscar categorias.",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Nenhuma categoria encontrada.",
        });
      }
      console.log(results);
      res.status(200).json({
        status: "success",
        data: results,
      });
    });
  });

  // Rota para pegar pedido
  router.get("/api/pedido", (req, res) => {
    db.query("SELECT * FROM pedido", (error, results) => {
      if (error) {
        console.error("Erro ao buscar pedidos:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao buscar pedidos.",
        });
      }

      // Verifica se não há pedidos na base de dados
      if (results.length === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Nenhum pedido encontrado.",
        });
      }

      // Caso haja resultados, retorna os pedidos
      res.status(200).json({
        status: "success",
        data: results,
      });
    });
  });

  // Atualiza o status do pedido
  router.patch("/api/pedido/:id", (req, res) => {
    const { id } = req.params; // Pega o ID do pedido da URL
    const { statusPedido } = req.body; // Pega o novo status do corpo da requisição

    // Verifica se o statusPedido foi enviado
    if (!statusPedido) {
      return res.status(400).json({
        status: "error",
        message: "Status do pedido não fornecido.",
      });
    }

    // Atualiza o status do pedido no banco de dados
    const query = "UPDATE pedido SET statusPedido = ? WHERE idpedido = ?";
    db.query(query, [statusPedido, id], (error, results) => {
      if (error) {
        console.error("Erro ao atualizar status do pedido:", error);
        return res.status(500).json({
          status: "error",
          message: "Erro ao atualizar status do pedido.",
        });
      }

      // Verifica se o pedido foi encontrado e atualizado
      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: "not_found",
          message: "Pedido não encontrado.",
        });
      }

      // Retorna a resposta de sucesso
      res.status(200).json({
        status: "success",
        message: "Status do pedido atualizado com sucesso.",
      });
    });
  });

  router.get("/api/getPedidoById/:id", (req, res) => {
    const { id } = req.params;

    db.query(
      `
        SELECT filme.nomeFilme, pedido.valorTotal, pedido_has_filme.precoUnitario, pedido_has_filme.quantidade
        FROM pedido_has_filme INNER JOIN filme ON filme.idfilme = pedido_has_filme.filme_idfilme
        INNER JOIN pedido ON pedido_has_filme.pedido_idpedido = pedido.idpedido
        WHERE pedido.idpedido = ?;
      `,
      [id],
      (error, result) => {
        if (error) {
          console.error("Erro ao buscar pedido:", error);
          return res.status(500).json({
            status: "error",
            message: "Erro ao deletar o filme.",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            status: "not_found",
            message: "Filme não encontrado.",
          });
        }

        console.log(result);
        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    );
  });

  // rota para estender limite
  router.put(
    "/api/pedido/devolver/:id/:statusPedido/:dataLimiteLocacao",
    (req, res) => {
      const { id, statusPedido, dataLimiteLocacao } = req.params;

      console.log("ID do pedido:", id);
      console.log("Status do pedido:", statusPedido);
      console.log("Nova data de devolução:", dataLimiteLocacao);

      if (!statusPedido || !dataLimiteLocacao) {
        return res.status(400).json({
          status: "error",
          message: "Status ou data de devolução não fornecidos.",
        });
      }

      const query =
        "UPDATE pedido SET statusPedido = ?, dataLimiteLocacao = ? WHERE idpedido = ?";
      db.query(
        query,
        [statusPedido, dataLimiteLocacao, id],
        (error, results) => {
          if (error) {
            console.error("Erro ao atualizar pedido:", error);
            return res.status(500).json({
              status: "error",
              message: "Erro ao atualizar o pedido.",
            });
          }

          if (results.affectedRows === 0) {
            return res.status(404).json({
              status: "not_found",
              message: "Pedido não encontrado.",
            });
          }

          res.status(200).json({
            status: "success",
            message: "Pedido atualizado com sucesso.",
          });
        }
      );
    }
  );

  return router;
}

module.exports = createRegisterRouter;
