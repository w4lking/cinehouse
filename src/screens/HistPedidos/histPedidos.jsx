import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService"; // Importe seu serviço aqui
import "./histPedidos.css";

const HistCompras = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Para mostrar erros em caso de falha na requisição

  const navigate = useNavigate();

  // Função para formatar as datas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato brasileiro (dd/mm/aaaa)
  };

  // Função para formatar as datas com hora
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR'); // Formato de data e hora local
  };

  useEffect(() => {
    document.title = "Histórico de Pedidos";

    const fetchData = async () => {
      try {
        const response = await ApiService.getHistorico(); // Requisição ao backend

        console.log(response); // Adiciona para depurar a resposta

        // Verifique se a resposta possui a chave "data"
        if (response && response.status === "success" && response.data) {
          setEntries(response.data); // Acesse diretamente a chave "data" dos pedidos
        } else {
          throw new Error("Resposta inesperada da API");
        }

        setLoading(false); // Atualiza o estado de carregamento
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err); // Imprime o erro completo no console para mais detalhes
        setError("Erro ao carregar os pedidos");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para estender a locação
  const handleExtendLocacao = (id) => {
    alert(`Estendendo locação do pedido #${id}`);
  };

  // Função para devolver o pedido
  const handleDevolverPedido = async (idPedido, statusPedido) => {
    try {
      const response = await ApiService.devolverPedido(idPedido, statusPedido); // Chama a API para devolver o pedido

      // Exibe mensagem de sucesso
      setStatusMessage(`Pedido #${idPedido} devolvido com sucesso!`);
      // Atualiza o histórico de pedidos após a devolução
      setEntries(entries.map(entry => 
        entry.idpedido === idPedido ? { ...entry, statusPedido: "Devolvido" } : entry
      ));
    } catch (error) {
      setStatusMessage(`Erro ao devolver o pedido #${idPedido}: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Exibe mensagem de erro, se houver
  }

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
            <th>ID Pedido</th>
            <th>Data Pedido</th>
            <th>Tipo Pedido</th>
            <th>Status Pedido</th>
            <th>Data Pagamento</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.idpedido}>
              <td>{entry.idpedido}</td>
              <td>{formatDate(entry.dataPedido)}</td> {/* Formata dataPedido */}
              <td>{entry.tipoPedido}</td>
              <td>{entry.statusPedido}</td>
              <td>{entry.dataPagamento ? formatDate(entry.dataPagamento) : "-"}</td> {/* Formata dataPagamento */}
              <td class="valor-total">R$ {entry.valorTotal.toFixed(2)}</td>
              <td>
                {entry.tipoPedido === "Alocacao" && entry.statusPedido !== "Finalizado" && (
                  <>
                    <button
                      className="extend-button"
                      onClick={() => handleExtendLocacao(entry.idPedido)}
                    >
                      Estender Locação
                    </button>
                    <button
                      className="return-button"
                      onClick={() => handleDevolverPedido(entry.idPedido)}
                    >
                      Devolver Pedido
                    </button>
                  </>
                )}
                {entry.statusPedido === "Finalizado" && (
                  <span>Pedido Finalizado</span>
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
