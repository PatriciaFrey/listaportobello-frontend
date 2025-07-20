import React, { useState } from 'react';
import styled from 'styled-components';
import { Pedido } from '../types/Pedido';
import { pedidoService } from '../services/pedidoService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

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
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const PedidoForm = ({ onAdd }: { onAdd: (pedido: Pedido) => void }) => {
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !produto || !quantidade || precoUnitario <= 0) {
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
    };

    try {
      const pedidoCriado = await pedidoService.criar(novoPedido);
      onAdd(pedidoCriado);
      setCliente('');
      setProduto('');
      setQuantidade(1);
      setPrecoUnitario(100); 
      setError(null); 
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

      <InputGroup>
        <div>
          <label>Quantidade</label>
          <Input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            required
            min={1}
          />
        </div>

        <div>
          <label>Preço Unitário</label>
          <Input
            type="number"
            placeholder="Preço Unitário"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(Number(e.target.value))}
            required
            min={0.01}
            step="0.01"
          />
        </div>
      </InputGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit">Adicionar Pedido</Button>
    </Form>
  );
};
