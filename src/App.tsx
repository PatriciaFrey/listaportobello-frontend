import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  text-align: center;
`;

const Title = styled.h1`
  color: #007bff;
  font-size: 2rem;
`;

function App() {
  return (
    <Container>
      <Title>Lista de Pedidos Portobello</Title>
      <p>Frontend com React + TypeScript + styled-components</p>
    </Container>
  );
}

export default App;


