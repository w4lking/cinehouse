"use client";
import {
  BarChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

const AreaChartComponent = () => {
  return (
    <AreaChart width={300} height={300} data={filmesMaisVendidos}>
      <YAxis />
      <XAxis dataKey="quantidade" />
      <CartesianGrid />
      <Tooltip />
      <Legend />

      <Area dataKey="quantidade" />
    </A>
  );
};

export default AreaChartComponent;
