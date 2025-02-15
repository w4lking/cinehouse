/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./Relatorio.css";
import ApiService from "../../../services/apiService";

function RelatorioDevolucao() {
  // Estado para armazenar os filmes mais vendidos
  const [statusDeDevolucao, setStatusDeDevolucao] = useState([]);

  // Função para buscar os dados da API
  async function getDevolucoes() {
    try {
      const response = await ApiService.getRelatorioDevolucao();
      const formattedData = response.data.map((pedido) => ({
        ...pedido,
        dataPedido: pedido.dataPedido
          ? pedido.dataPedido.split("T")[0] // Extrai apenas a data
          : "Data inválida", // Adicione um fallback para valores inválidos
      }));
      setStatusDeDevolucao(formattedData);
    } catch (error) {
      console.error("Erro ao buscar filmes vendidos:", error);
    }
  }

  useEffect(() => {
    getDevolucoes();
  }, []);

  return (
    <div className="relatorio-container">
      <h1>Relatório de devoluções</h1>
      <button
        className="back-button-relatorio-dev"
        onClick={() => window.history.back()}
      >
        <i className="fas fa-arrow-left"></i> Voltar
      </button>
      <div className="relatorio-tabelas">
        <div className="tabela">
          <h2>Filmes devolvidos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do usuário</th>
                <th>Status do pedido</th>
                <th>Data pedido</th>
                <th>Nome do produto</th>
              </tr>
            </thead>
            <tbody>
              {statusDeDevolucao.map((devolucao, index) => (
                <tr key={index}>
                  <td>{devolucao.nome}</td>
                  <td>{devolucao.statusPedido}</td>
                  <td>{devolucao.dataPedido}</td>
                  <td>{devolucao.nomeFilme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RelatorioDevolucao;
