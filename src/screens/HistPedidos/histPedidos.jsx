import React, { useState, useEffect } from 'react';
import './histPedidos.css';

const HistCompras = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    document.title = 'Historico de Pedidos'; // hook para alterar titulo da aba
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

  // Função para estender a locação
  const handleExtendLocacao = (id) => {
    alert(`Estendendo locação do pedido #${id}`);
  };

  // Função para devolver o pedido
  const handleDevolverPedido = (id) => {
    alert(`Devolvendo pedido #${id}`);
  };

  return (
    <div className="container">
      {/* Botão Voltar */}
      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>

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
            <th>Ações</th>
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
              <td>
                {entry.type === 'Alocacao' && (
                  <>
                    <button
                      className="extend-button"
                      onClick={() => handleExtendLocacao(entry.id)}
                    >
                      Estender Locação
                    </button>
                    <button
                      className="return-button"
                      onClick={() => handleDevolverPedido(entry.id)}
                    >
                      Devolver Pedido
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistCompras;
