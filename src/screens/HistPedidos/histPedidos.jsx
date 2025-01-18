import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService";
import "./histPedidos.css";

const HistCompras = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR");
  };

  useEffect(() => {
    document.title = "Histórico de Pedidos";

    const fetchData = async () => {
      try {
        const response = await ApiService.getHistorico();
        console.log(response);

        if (response && response.status === "success" && response.data) {
          setEntries(response.data);
        } else {
          throw new Error("Resposta inesperada da API");
        }

        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Erro ao carregar os pedidos");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExtendLocacao = (id) => {
    alert(`Estendendo locação do pedido #${id}`);
  };

  const handleDevolverPedido = async (idPedido, statusPedido) => {
    try {
      const response = await ApiService.devolverPedido(idPedido, statusPedido);
      setStatusMessage(`Pedido #${idPedido} devolvido com sucesso!`);
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.idpedido === idPedido
            ? { ...entry, statusPedido: response.statusPedido || "Devolvido" }
            : entry
        )
      );
    } catch (error) {
      setStatusMessage(
        `Erro ao devolver o pedido #${idPedido}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
              <td>
                {entry.dataPagamento ? formatDate(entry.dataPagamento) : "-"}
              </td>{" "}
              {/* Formata dataPagamento */}
              <td class="valor-total">R$ {entry.valorTotal.toFixed(2)}</td>
              <td>
                {entry.tipoPedido === "Alocacao" &&
                  entry.statusPedido !== "Finalizado" && (
                    <>
                      <button
                        className="extend-button"
                        onClick={() => handleExtendLocacao(entry.idpedido)}
                      >
                        Estender Locação
                      </button>
                      <button
                        className="return-button"
                        onClick={() => handleDevolverPedido(entry.idpedido, "Devolvido")}
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
