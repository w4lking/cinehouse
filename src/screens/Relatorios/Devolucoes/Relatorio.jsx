/* eslint-disable no-unused-vars */
import React from "react";
import "./Relatorio.css";
import AreaChart from "./charts/AreaChart";

function RelatorioDevolucao() {
  // Exemplo de dados
  const filmesMaisVendidos = [
    { nome: "Avatar", quantidade: 150 },
    { nome: "Vingadores: Ultimato", quantidade: 200 },
    { nome: "Titanic", quantidade: 180 },
    { nome: "Star Wars: O Despertar da Força", quantidade: 120 },
    { nome: "Velozes e Furiosos 7", quantidade: 110 },
    { nome: "Os Vingadores", quantidade: 170 },
    { nome: "O Rei Leão", quantidade: 130 },
    { nome: "Frozen 2", quantidade: 140 },
    { nome: "Velozes e Furiosos 8", quantidade: 100 },
    { nome: "Homem de Ferro 3", quantidade: 90 },
  ];

  return (
    <div className="relatorio-container">
      <h1>Relatório de devoluções</h1>
      <div className="relatorio-tabelas">
        <div className="tabela">
          <h2>Datas de devolução de filmes</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Filme</th>
                <th>Quantidade em estoque</th>
              </tr>
            </thead>
            <tbody>
              {filmesMaisVendidos.map((filme, index) => (
                <tr key={index}>
                  <td>{filme.nome}</td>
                  <td>{filme.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Segunda seção com os cards */}
      <div className="dashboard-cards">
        <h2 className="section-title">Gráficos e Painéis</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Area Chart</h3>
            <AreaChart />
          </div>
          <div className="card">
            <h3>Bar Chart</h3>
          </div>
          <div className="card">
            <h3>Line Chart</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatorioDevolucao;
