import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

type Props = {
  filtro: string;
  setFiltro: (valor: string) => void;
};

export const FiltroPedidos = ({ filtro, setFiltro }: Props) => {
  return (
    <Input
      type="text"
      placeholder="Filtrar por cliente..."
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
};
