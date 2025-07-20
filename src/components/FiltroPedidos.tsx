import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  width: 100%;
  
`;

type Props = {
  filtro: string;
  setFiltro: (valor: string) => void;
  filtroData: string | null;
  setFiltroData: (valor: string | null) => void;
};

export const FiltroPedidos = ({
  filtro,
  setFiltro,
  filtroData,
  setFiltroData,
}: Props) => {
  return (
    <div style={{ width: "auto" }}>
      <Input
        type="text"
        placeholder="Filtrar por cliente..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <Input
        type="date"
        value={filtroData || ""}
        onChange={(e) => setFiltroData(e.target.value || null)}
      />
    </div>
  );
};
