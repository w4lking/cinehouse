import { useEffect, useState } from "react";
import "./Relatorio.css";
import ApiService from "../../../services/apiService";
import BarChartComponent from "./charts/BarChart";

function Relatorio() {
  // Estado para armazenar os filmes mais vendidos
  const [filmesMaisVendidos, setFilmesMaisVendidos] = useState([]);

  // Função para buscar os dados da API
  async function getFilmesMaisVendidos() {
    try {
      const response = await ApiService.getRelatorioVendas();
      const data = response.data; // Garante que é um array
      setFilmesMaisVendidos(data);
    } catch (error) {
      console.error("Erro ao buscar filmes vendidos:", error);
    }
  }

  useEffect(() => {
    getFilmesMaisVendidos();
  }, []);

  const [filmesMaisAlugados, setFilmesMaisAlugados] = useState([]);

  // Função para buscar os dados da API
  async function getFilmesMaisAlugados() {
    try {
      const response = await ApiService.getRelatorioLocacao();
      const data = response.data; // Garante que é um array
      console.log("Dados recebidos:", data); // Adicione para verificar os dados recebidos
      setFilmesMaisAlugados(data);
    } catch (error) {
      console.error("Erro ao buscar filmes alugados:", error);
    }
  }

  useEffect(() => {
    getFilmesMaisAlugados();
  }, []);

  return (
    <div className="relatorio-container">
      <h1>Relatório de aluguéis e vendas</h1>
      <button
        className="back-button-relatorio"
        onClick={() => window.history.back()}
      >
        <i className="fas fa-arrow-left"></i> Voltar
      </button>
      <div className="relatorio-tabelas">
        {/* Tabela de filmes mais vendidos */}
        <div className="tabela">
          <h2>Filmes mais vendidos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Filme</th>
                <th>Quantidade de Cópias Vendidas</th>
              </tr>
            </thead>
            <tbody>
              {filmesMaisVendidos.length > 0 ? (
                filmesMaisVendidos.map((filme, index) => (
                  <tr key={index}>
                    <td>{filme.nomeFilme || "Nome não disponível"}</td>
                    <td>{filme.quantidade || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Nenhum dado disponível</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Tabela de filmes mais alugados */}
        <div className="tabela">
          <h2>Filmes mais alugados</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Filme</th>
                <th>Quantidade de Cópias Alugadas</th>
              </tr>
            </thead>
            <tbody>
              {filmesMaisAlugados.map((filme, index) => (
                <tr key={index}>
                  <td>{filme.nomeFilme}</td>
                  <td>{filme.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Gráfico de barras */}
        <div className="grafico">
          <h2>Gráfico de Filmes Mais Vendidos</h2>
          <BarChartComponent data={filmesMaisVendidos} />
        </div>

        {/* Gráfico de barras */}
        <div className="grafico">
          <h2>Gráfico de Filmes Mais Alugados</h2>
          <BarChartComponent data={filmesMaisAlugados} />
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
