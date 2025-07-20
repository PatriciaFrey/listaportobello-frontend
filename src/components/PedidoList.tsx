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
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #ff1a1a;
    }
  }
`;

interface PedidoListProps {
  pedidos: Pedido[];
}

export const PedidoList = ({ pedidos }: PedidoListProps) => {
  const [lista, setLista] = useState<Pedido[]>([]);

  useEffect(() => {
    setLista(pedidos);
    console.log("Pedidos carregados:", pedidos); // Coloquei o log aqui para acompanhar o carregamento dos pedidos
  }, [pedidos]); // Dependendo da prop pedidos, se ela mudar, isso atualizará a lista

  const handleExcluir = async (id: string) => {
    try {
      await deletarPedido(id);
      setLista((prevLista) => prevLista.filter((p) => p.id !== id));
    } catch (error) {
      alert("Erro ao excluir pedido");
    }
  };

  return (
    <List>
      {lista.length === 0 ? (
        <p>Não há pedidos para exibir.</p>
      ) : (
        lista.map((pedido) => (
          <Item key={pedido.id}>
            <h3>Pedido ID: {pedido.id}</h3>
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <div>
              <strong>Produtos:</strong>{" "}
              {pedido.itens.length > 0 ? (
                pedido.itens.map((item, index) => (
                  <p key={index}>
                     <strong>Produto:</strong> {item.produto} <strong>({item.quantidade})</strong> - R${" "}
                    {(item.precoUnitario * item.quantidade).toFixed(2)}
                  </p>
                ))
              ) : (
                <p>Sem produtos para este pedido.</p>
              )}
            </div>
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
            <div className="button-container">
              <button onClick={() => handleExcluir(pedido.id)}>Excluir</button>
            </div>
          </Item>
        ))
      )}
    </List>
  );
};
