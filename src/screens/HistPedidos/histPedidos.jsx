import React, { useState, useEffect } from 'react';
import './histPedidos.css';

const HistCompras = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Simula a busca de dados de uma API
    const fetchData = async () => {
      const data = [
        { id: 1, name: 'Produto A', value: 'R$ 100,00', type: 'Compra' },
        { id: 2, name: 'Produto B', value: 'R$ 150,00', type: 'Alocacao', startDate: '2025-01-01', endDate: '2025-01-10' },
        { id: 3, name: 'Produto C', value: 'R$ 200,00', type: 'Compra' },
      ];
      setEntries(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Histórico de Compras e Alocações</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Produto</th>
            <th>Valor Produto</th>
            <th>Tipo Pedido</th>
            <th>Data Início</th>
            <th>Data Fim</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.value}</td>
              <td className={entry.type === 'Compra' ? 'Compra' : 'Alocacao'}>
                {entry.type}
              </td>
              <td>{entry.type === 'Alocacao' ? entry.startDate : '-'}</td>
              <td>{entry.type === 'Alocacao' ? entry.endDate : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistCompras;