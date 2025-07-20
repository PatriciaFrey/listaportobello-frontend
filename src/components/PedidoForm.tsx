import React, { useState } from 'react';
import styled from 'styled-components';
import { Pedido } from '../types/Pedido';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 0rem;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1976d2;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const PedidoForm = ({ onAdd }: { onAdd: (pedido: Omit<Pedido, 'id'>) => Promise<void> }) => {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState(100);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!cliente || !produto || quantidade < 1 || precoUnitario <= 0) {
      setError('Todos os campos são obrigatórios, e o preço unitário deve ser positivo.');
      return;
    }

    const novoPedido: Omit<Pedido, 'id'> = {
      cliente,
      itens: [
        {
          produto,
          quantidade,
          precoUnitario,
        },
      ],
      total: quantidade * precoUnitario,
      dataCriacao: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await onAdd(novoPedido);
      setCliente('');
      setProduto('');
      setQuantidade(1);
      setPrecoUnitario(100);
      setError(null);
    } catch {
      setError('Erro ao adicionar pedido.');
    } finally {
      setLoading(false);
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
        min={1}
      />
      <Input
        type="number"
        placeholder="Preço Unitário"
        value={precoUnitario}
        onChange={(e) => setPrecoUnitario(Number(e.target.value))}
        required
        min={0.01}
        step="0.01"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Pedido'}
      </Button>
    </Form>
  );
};
