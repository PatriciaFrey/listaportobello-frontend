import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;  /* Ajuste para controlar a largura */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #ff1a1a;
  }
`;

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Adicionar Pedido</ModalTitle>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
