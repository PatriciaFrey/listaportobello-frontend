import React, { useEffect, useState } from 'react';
import { Pedido } from '../types/Pedido';
import { pedidoService } from '../services/pedidoService';
import { PedidoForm } from '../components/PedidoForm';
import { PedidoList } from '../components/PedidoList';

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
      <h1>Gestão de Pedidos</h1>
      <PedidoForm onAdd={adicionarPedido} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
};
