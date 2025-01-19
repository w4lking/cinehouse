import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import ApiService from "../../services/apiService"; // Importe seu serviço aqui
import "./histPedidos.css";

const HistCompras = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null); // Estado para armazenar os dados do pedido no modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [pedidoDetalhes, setPedidoDetalhes] = useState(null); // Detalhes do pedido
  const [modalLoading, setModalLoading] = useState(false); // Loading para o modal
  const [modalError, setModalError] = useState(null); // Erro no modal

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Data Inválida"
      : date.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    document.title = "Histórico de Pedidos";

    const fetchData = async () => {
      try {
        const response = await ApiService.getHistorico();
        console.log(response);
        if (response && response.status === "success" && response.data) {
          setEntries(response.data);
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

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPedidoDetalhes(null); // Limpa os detalhes ao fechar
  };

  const handleEstenderPedido = async (
    idPedido,
    statusPedido,
    dataLimiteLocacaoAtual
  ) => {
    try {
      // Adiciona 3 dias à data de devolução atual
      const novaDataLimite = new Date(dataLimiteLocacaoAtual);
      novaDataLimite.setDate(novaDataLimite.getDate() + 3);

      // Converte para o formato ISO (ou outro formato esperado pelo backend)
      const novaDataLimiteFormatada = novaDataLimite
        .toISOString()
        .split("T")[0];

      const response = await ApiService.EstenderPedido(
        idPedido,
        "Estendido", // Atualiza diretamente para o status "Estendido"
        novaDataLimiteFormatada
      );

      setStatusMessage(`Pedido #${idPedido} estendido com sucesso!`);
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.idpedido === idPedido
            ? {
                ...entry,
                statusPedido: "Estendido",
                dataLimiteLocacao: novaDataLimiteFormatada,
              }
            : entry
        )
      );
    } catch (error) {
      setStatusMessage(
        `Erro ao estender o pedido #${idPedido}: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDevolverPedido = async (idPedido, statusPedido) => {
    try {
      const response = await ApiService.devolverPedido(idPedido, statusPedido);
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

  const handleOpenModal = async (idpedido) => {
    setModalLoading(true); // Indica que está carregando
    setModalError(null); // Reseta erros anteriores
    setIsModalOpen(true); // Abre o modal

    try {
      // Chama a API para obter os detalhes do pedido
      const detalhes = await ApiService.getPedidoById(idpedido);

      // Verifica se os dados existem e pega o primeiro elemento do array
      if (
        detalhes &&
        detalhes.status === "success" &&
        Array.isArray(detalhes.data)
      ) {
        const data = detalhes.data[0]; // Acessa o primeiro item do array
        setPedidoDetalhes(data); // Atualiza os detalhes do pedido
      } else {
        throw new Error("Dados do pedido estão em um formato inesperado.");
      }
    } catch (error) {
      console.error("Erro ao carregar informações do pedido:", error);
      setModalError("Erro ao carregar os detalhes do pedido.");
    } finally {
      setModalLoading(false); // Finaliza o carregamento
    }
  };
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
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
            <th>Data devolução</th>
            <th>Data pagamento</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.idpedido}>
              <td>{entry.idpedido}</td>
              <td>{formatDate(entry.dataPedido)}</td>
              <td>{entry.tipoPedido}</td>
              <td>{entry.statusPedido}</td>

              <td>
                {entry.dataPagamento ? formatDate(entry.dataPagamento) : "-"}
              </td>
              <td className="valor-total">R$ {entry.valorTotal}</td>
              <td>
                {/* Condicional para exibir os botões de ação somente se o statusPedido não for "Devolvido" */}
                {entry.tipoPedido === "Alocacao" &&
                  entry.statusPedido !== "Finalizado" &&
                  entry.statusPedido !== "Devolvido" &&
                  entry.statusPedido != "Estendido" && (
                    <>
                      <button
                        className="extend-button"
                        onClick={() =>
                          handleEstenderPedido(
                            entry.idpedido,
                            "Estendido",
                            entry.dataLimiteLocacao
                          )
                        }
                      >
                        Estender Locação
                      </button>
                      <button
                        className="return-button"
                        onClick={() =>
                          handleDevolverPedido(entry.idpedido, "Devolvido")
                        }
                      >
                        Devolver Pedido
                      </button>
                    </>
                  )}
                {entry.statusPedido === "Finalizado" && (
                  <span>Pedido Finalizado</span>
                )}
                {entry.statusPedido === "Estendido" && (
                  <span>Locação Estendida. Verifique prazo de devolução</span>
                )}
                {entry.statusPedido === "Devolvido" && (
                  <span>Pedido Devolvido</span>
                )}
                <button
                  className="info-button"
                  onClick={() => handleOpenModal(entry.idpedido)}
                >
                  info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              Fechar
            </button>
            {modalError && <ErrorMessage message={modalError} />}
            {modalError && <p className="error-message">{modalError}</p>}
            {pedidoDetalhes && (
              <div>
                <h2>Detalhes do Pedido</h2>
                <p>
                  <strong>Nome filme:</strong> {pedidoDetalhes.nomeFilme}
                </p>
                <p>
                  <strong>Valor Total:</strong> {pedidoDetalhes.valorTotal}
                </p>
                <p>
                  <strong>Preço unitário:</strong>
                  {pedidoDetalhes.precoUnitario}
                </p>
                <p>
                  <strong>Quantidade:</strong> {pedidoDetalhes.quantidade}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistCompras;
