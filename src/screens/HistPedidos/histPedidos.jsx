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

  // Função para devolver o pedido e atualizar o status
  const handleDevolverPedido = async (id) => {
    try {
      // Verificar se o pedido existe na lista de pedidos carregados
      const pedido = entries.find((entry) => entry.idpedido === id);
      
      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }

      if (pedido.statusPedido === "Finalizado") {
        throw new Error("Este pedido já foi finalizado.");
      }

      // Envia uma requisição para atualizar o status do pedido para "Finalizado"
      const response = await ApiService.atualizarStatusPedido(id, "Finalizado");

      console.log("Resposta da API ao tentar devolver o pedido:", response); // Adiciona log da resposta da API

      if (response.status === "success") {
        // Atualiza o estado local dos pedidos sem fazer uma nova requisição para a lista inteira
        const updatedEntries = entries.map((entry) =>
          entry.idpedido === id ? { ...entry, statusPedido: "Finalizado" } : entry
        );
        setEntries(updatedEntries);
        alert(`Pedido #${id} foi finalizado!`);
      } else {
        throw new Error(`Erro ao atualizar o status do pedido: ${response.message || 'Resposta inesperada'}`);
      }
    } catch (error) {
      console.error("Erro ao devolver o pedido:", error); // Adicionando log completo do erro
      if (error.response) {
        console.error("Erro da resposta:", error.response.data); // Exibe a resposta de erro da API
      }
      alert(`Erro ao tentar devolver o pedido: ${error.message || 'Erro desconhecido'}`);
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
              <td>{entry.valorTotal}</td>
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
