import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Armazena as informações de conexão com o banco de dados
// Importa e usa estas configurações de dentro do arquivo .env
// Uso recomendado para informações sensíveis e garantir universaliade dos dados
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Função para deletar um usuário pelo id
export async function deleteUser(id) {
  await pool.query(
    `DELETE FROM usuario
     WHERE idusuario = ?;`,
    [id]
  );
  return "Usuário de id deletado com sucesso!";
}

// Função para obter o histórico de transações de um usuário pelo id
export async function getHistoricoDeTransacoes(usuario_idusuario) {
  const [pedidos] = await pool.query(
    `SELECT valorTotal, dataPagamento FROM pedido
     WHERE usuario_idusuario = ?;`,
    [usuario_idusuario]
  );
  return pedidos;
}

export async function getRelatorioLocacao() {
  const [relatorio] = await pool.query(
    `SELECT pedido_has_filme.quantidade, filme.nomeFilme, pedido.valorTotal
    FROM pedido INNER JOIN pedido_has_filme 
    ON pedido.idpedido = pedido_has_filme.pedido_idpedido INNER JOIN filme 
    ON filme.idfilme = pedido_has_filme.filme_idfilme
    WHERE tipoPedido="Locação"
    ORDER BY quantidade DESC;`
  );
  return relatorio;
}
