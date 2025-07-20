import React, { useState, useEffect } from "react";
import { Pedido } from "../types/Pedido";
import { pedidoService } from "../services/pedidoService";
import { PedidoForm } from "../components/PedidoForm";
import { PedidoList } from "../components/PedidoList";
import styled from "styled-components";
import { FiltroPedidos } from "../components/FiltroPedidos";
import Modal from "../components/Modal";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Titulo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  color: #1976d2;
  font-family: 'Arial', sans-serif;
`;

const BotaoHeader = styled.button`
  padding: 0.7rem 2rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 3rem; 
  &:hover {
    background-color: #125aa5;
  }
`;



const MainContainer = styled.div`
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PedidosContainer = styled.div`
  margin-top: 40px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PedidosTitulo = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto; /* centraliza horizontalmente */
  width: 50%;
`;


const AdicionarPedidoButton = styled.button`
  width: 100%;        /* largura total do container pai */
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin: 20px 0;    /* Espaço acima e abaixo */
`;

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState('');
  const [filtroData, setFiltroData] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const carregarPedidos = async () => {
    try {
      const dados = await pedidoService.listar();
      setPedidos(dados);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleAddPedido = async (novoPedido: Omit<Pedido, 'id'>) => {
    try {
      await pedidoService.criar(novoPedido);
      await carregarPedidos();
      toggleModal();
    } catch (err) {
      console.error('Erro ao adicionar pedido:', err);
    }
  };

  return (
    <MainContainer>
      <Header>
        <Titulo>Gestão de Pedidos</Titulo>
        <BotaoHeader onClick={toggleModal}>Adicionar Pedido</BotaoHeader>
      </Header>

      <MainContainer style={{ marginTop: '80px' }} />

      <PedidosContainer>
        <PedidosTitulo>Pedidos</PedidosTitulo>

        <ActionsContainer>
          <FiltroPedidos
            filtro={filtro}
            setFiltro={setFiltro}
            filtroData={filtroData}
            setFiltroData={setFiltroData}
          />
        </ActionsContainer>

        {showModal && (
          <Modal onClose={toggleModal}>
            <PedidoForm onAdd={handleAddPedido} />
          </Modal>
        )}

        <PedidoList
          pedidos={pedidos}
          filtro={filtro}
          filtroData={filtroData}
          recarregarPedidos={carregarPedidos} 
        />
      </PedidosContainer>
    </MainContainer>
  );
};

