"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

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

//Exemplo de dados
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

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={filmesMaisAlugados}>
        <Area dataKey="quantidade" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
