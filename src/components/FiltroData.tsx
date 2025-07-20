import React from 'react';
import styled from 'styled-components';

const FiltroContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;

  label {
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

interface Props {
  dataInicio: string;
  dataFim: string;
  setDataInicio: (data: string) => void;
  setDataFim: (data: string) => void;
}

export const FiltroData = ({
  dataInicio,
  dataFim,
  setDataInicio,
  setDataFim,
}: Props) => {
  return (
    <FiltroContainer>
      <label>
        Início:
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </label>
      <label>
        Fim:
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </label>
    </FiltroContainer>
  );
};
