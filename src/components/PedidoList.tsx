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
<td>{pedido.itens.map(item => item.produto).join(', ')}</td>
<td>{pedido.itens.map(item => item.quantidade).join(', ')}</td>
<td>R$ {pedido.total.toFixed(2)}</td>
        </Item>
      ))}
    </List>
  );
};
