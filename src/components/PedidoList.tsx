import React from 'react';
import styled from 'styled-components';
import { Pedido } from '../types/Pedido';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const Item = styled.li`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
`;

interface PedidoListProps {
  pedidos: Pedido[];
}

export const PedidoList = ({ pedidos }: PedidoListProps) => {
  return (
    <List>
      {pedidos.map((pedido) => (
        <Item key={pedido.id}>
          <strong>Cliente:</strong> {pedido.cliente}<br />
          <strong>Produto:</strong> {pedido.produto}<br />
          <strong>Quantidade:</strong> {pedido.quantidade}<br />
          <strong>Valor Total:</strong> R$ {pedido.valorTotal.toFixed(2)}<br />
          <strong>Data:</strong> {new Date(pedido.data).toLocaleString()}
        </Item>
      ))}
    </List>
  );
};
