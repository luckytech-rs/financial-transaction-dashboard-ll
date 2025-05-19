import styled from 'styled-components';

export const AppWrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FilterInput = styled.input`
  flex: 1;
  padding: 0.5rem;
`;

export const FilterSelect = styled.select`
  padding: 0.5rem;
`;

export const PaginationControls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
