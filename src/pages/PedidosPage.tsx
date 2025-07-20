import React, { useEffect, useState } from 'react';
import { Pedido } from '../types/Pedido';
import { pedidoService } from '../services/pedidoService';
import { PedidoForm } from '../components/PedidoForm';
import { PedidoList } from '../components/PedidoList';
import styled from 'styled-components'; 

const Titulo = styled.h1`
  text-align: center; /* Centraliza o texto */
  font-size: 2.5rem; /* Tamanho do texto */
  font-weight: bold; /* Negrito */
  color: #333; /* Cor do texto */
  margin-top: 20px; /* Espaço no topo */
  margin-bottom: 20px; /* Espaço na parte inferior */
  font-family: 'Arial', sans-serif; /* Fonte personalizada */
`;

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const carregarPedidos = async () => {
    try {
      const dados = await pedidoService.listar();
      setPedidos(dados);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    }
  };

  const adicionarPedido = (novo: Pedido) => {
    setPedidos((prev) => [...prev, novo]);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      {/* Usando o componente estilizado */}
      <Titulo>Gestão de Pedidos</Titulo>
      <PedidoForm onAdd={adicionarPedido} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
};
