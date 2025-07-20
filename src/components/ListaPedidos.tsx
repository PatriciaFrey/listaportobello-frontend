import React, { useEffect, useState } from "react";
import { Pedido } from "../types/Pedido";
import { deletarPedido, pedidoService } from "../services/pedidoService";
import styled from "styled-components";

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export const ListaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const handleExcluir = async (id: string) => {
    try {

      await deletarPedido(id);

      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
    } catch (error) {
      alert("Erro ao excluir pedido");
    }
  };

  useEffect(() => {
    pedidoService.listar().then(setPedidos).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <Tabela>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.itens.map((item) => item.produto).join(', ')}</td>
              <td>{pedido.itens.map((item) => item.quantidade).join(', ')}</td>
              <td>R$ {pedido.total.toFixed(2)}</td>
              <td>
                <button onClick={() => handleExcluir(pedido.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </div>
  );
};
