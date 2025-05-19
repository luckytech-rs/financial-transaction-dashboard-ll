import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const Th = styled.th`
    text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
`;

export const Td = styled.td`
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
`;

export const Tr = styled.tr`
    &:nth-of-type(even) {
        background-color: #eaeaea;
    }
`;

export const PendingStatus = styled.span`
    display: flex;
    border: 1px solid #dea20d;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: #dea20d;
    border-radius: 15px;
    padding: 0.5rem;
    font-weight: bold;
    background-color: #fff;
    width: 80px;
`;

export const CompletedStatus = styled.span`
    display: flex;
    border: 1px solid #1ebe05;
    align-content: center;
    align-items: center;
    justify-content: center;
    color: #1ebe05;
    border-radius: 15px;
    padding: 0.5rem;
    font-weight: bold;
    background-color: #fff;
    width: 80px;
`;
