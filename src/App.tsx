import React, { useEffect, useState } from 'react';
import { Pedido } from './types/Pedido';
import { pedidoService } from './services/pedidoService';
import { PedidoForm } from './components/PedidoForm';
import { FiltroPedidos } from './components/FiltroPedidos';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

function App() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // ✅ APENAS essa parte deve estar aqui
    pedidoService
      .listar()
      .then(setPedidos)
      .catch((err) => console.error('Erro ao buscar pedidos:', err));
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAdicionarPedido = (novo: Pedido) => {
    setPedidos([...pedidos, novo]);
  };

  return (
    <Container>
      <h1>Lista de Pedidos</h1>
      <PedidoForm onAdd={handleAdicionarPedido} />
      <FiltroPedidos filtro={filtro} setFiltro={setFiltro} />
      <ul>
        {pedidosFiltrados.map((pedido) => (
          <li key={pedido.id}>
            {pedido.cliente} - {pedido.produto} ({pedido.quantidade})
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
