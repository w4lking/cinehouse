import React from "react";
import "./Relatorio.css";

function Relatorio() {
  
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

  const filmesMaisAlugados = [
    { nome: "Toy Story", quantidade: 300 },
    { nome: "Harry Potter e a Pedra Filosofal", quantidade: 250 },
    { nome: "Shrek", quantidade: 220 },
    { nome: "A Era do Gelo", quantidade: 200 },
    { nome: "Matrix", quantidade: 180 },
    { nome: "Homem-Aranha", quantidade: 170 },
    { nome: "Jurassic Park", quantidade: 160 },
    { nome: "Madagascar", quantidade: 150 },
    { nome: "De Volta para o Futuro", quantidade: 140 },
    { nome: "O Exterminador do Futuro", quantidade: 130 },
  ];

  return (
    <div className="relatorio-container">
      <h1>Relatório de aluguéis e vendas</h1>
      <div className="relatorio-tabelas">
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
              {filmesMaisVendidos.map((filme, index) => (
                <tr key={index}>
                  <td>{filme.nome}</td>
                  <td>{filme.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                  <td>{filme.nome}</td>
                  <td>{filme.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
