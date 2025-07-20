import React, { useEffect, useState } from 'react';
import { Pedido } from '../types/Pedido';
import { pedidoService } from '../services/pedidoService';
import { PedidoForm } from '../components/PedidoForm';
import { PedidoList } from '../components/PedidoList';
import styled from 'styled-components'; 
import { FiltroPedidos } from '../components/FiltroPedidos'; 
import Modal from '../components/Modal'; 

const Titulo = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const MainContainer = styled.div`
  padding: 0 20px;  
  margin-top: 20px; 
  margin-bottom: 20px; 
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <MainContainer>
      <Titulo>Gestão de Pedidos</Titulo>
      
      <ActionsContainer>
        <FiltroPedidos filtro={filtro} setFiltro={setFiltro} />
        <button 
          onClick={toggleModal} 
          style={{ 
            padding: '0.8rem', 
            fontSize: '1rem', 
            backgroundColor: '#1976d2', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '8px' 
          }}
        >
          Adicionar Pedido
        </button>
      </ActionsContainer>
     
      {showModal && (
        <Modal onClose={toggleModal}>
          <PedidoForm onAdd={adicionarPedido} />
        </Modal>
      )}

      <PedidoList pedidos={pedidos} filtro={filtro} />
    </MainContainer>
  );
};
