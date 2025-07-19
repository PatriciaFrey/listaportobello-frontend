import React, { useState } from 'react';
import styled from 'styled-components';
import { Pedido } from '../types/Pedido';
import { pedidoService } from '../services/pedidoService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.7rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

export const PedidoForm = ({ onAdd }: { onAdd: (pedido: Pedido) => void }) => {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  // Defina o valor unitário aqui (ou traga de algum lugar real no sistema)
  const precoUnitario = 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoPedido: Omit<Pedido, 'id'> = {
      cliente,
      produto,
      quantidade,
      data: new Date().toISOString(), // ou outro formato esperado pelo backend
      valorTotal: precoUnitario * quantidade,
    };

    try {
      const pedidoCriado = await pedidoService.criar(novoPedido);
      onAdd(pedidoCriado);
      setCliente('');
      setProduto('');
      setQuantidade(1);
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Produto"
        value={produto}
        onChange={(e) => setProduto(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        required
      />
      <Button type="submit">Adicionar Pedido</Button>
    </Form>
  );
};
