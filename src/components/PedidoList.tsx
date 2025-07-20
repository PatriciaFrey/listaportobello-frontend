import React, { useState, useEffect } from "react";
import { Pedido } from "../types/Pedido";
import { deletarPedido } from "../services/pedidoService";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const Item = styled.li`
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid #ccc;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .button-container {
    margin-top: 1rem;
    text-align: center;
  }

  button {
    padding: 0.7rem 1.2rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #ff1a1a;
    }
  }

  h3 {
    font-size: 1.3rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 5px 0;
  }

  .produtos {
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  .produto-item {
    margin-bottom: 0.5rem;
  }

  .total {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .expand-button {
    cursor: pointer;
    color: #1976d2;
    font-size: 1.1rem;
    text-decoration: underline;
  }
`;

interface PedidoListProps {
  pedidos: Pedido[];
  filtro: string;
}

export const PedidoList = ({ pedidos, filtro }: PedidoListProps) => {
  const [lista, setLista] = useState<Pedido[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null); // Estado para controlar qual pedido está expandido

  useEffect(() => {
    setLista(pedidos);
  }, [pedidos]);

  const pedidosFiltrados = lista.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleExcluir = async (id: string) => {
    try {
      await deletarPedido(id);
      setLista((prevLista) => prevLista.filter((p) => p.id !== id));
    } catch (error) {
      alert("Erro ao excluir pedido");
    }
  };

  const handleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id); // Alterna entre expandir e recolher o pedido
  };

  return (
    <List>
      {pedidosFiltrados.length === 0 ? (
        <p>Não há pedidos para exibir.</p>
      ) : (
        pedidosFiltrados.map((pedido) => (
          <Item key={pedido.id}>
            <h3>
              <strong>Cliente:</strong> {pedido.cliente}
            </h3>
            <p>
              <strong>Pedido:</strong> {pedido.id}
            </p>

            <div className="produtos">
              {/* Exibir a seta ou botão de expandir */}
              <span
                className="expand-button"
                onClick={() => handleExpand(pedido.id)}
              >
                {expanded === pedido.id ? "^" : "+"}
              </span>

             
              {expanded === pedido.id && (
                <>
                  {pedido.itens.length > 0 ? (
                    pedido.itens.map((item, index) => (
                      <p key={index} className="produto-item">
                        <strong>Produto:</strong> {item.produto} (
                        <strong>{item.quantidade}</strong>) - R${" "}
                        {(item.precoUnitario * item.quantidade).toFixed(2)}
                      </p>
                    ))
                  ) : (
                    <p>Sem produtos para este pedido.</p>
                  )}

                  <p className="total">
                    <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                  </p>

                  <div className="button-container">
                    <button onClick={() => handleExcluir(pedido.id)}>
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          </Item>
        ))
      )}
    </List>
  );
};
