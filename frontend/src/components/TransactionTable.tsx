import React from 'react';
import { Transaction } from '../types/Transaction';
import { TableWrapper, Table, Th, Td, Tr, PendingStatus, CompletedStatus } from '../styles/TransactionTable.styles';
import { EditButton, DeleteButton } from "../styles/Common.styles";
import {ControlsWrapper} from "../styles/App.styles";

type Props = {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
};

export const TransactionTable: React.FC<Props> = ({
  transactions,
  onEdit,
  onDelete
}) => (
  <TableWrapper>
    <Table>
      <thead>
        <tr>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Category</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
      {transactions.length === 0 && <tr><td><p>No transactions found.</p></td></tr>}
      {transactions.map(tx => (
          <Tr key={tx.id}>
            <Td>{tx.date}</Td>
            <Td>{tx.amount}</Td>
            <Td>{tx.category}</Td>
            <Td>{tx.status === 'pending' ? <PendingStatus>{tx.status}</PendingStatus> : <CompletedStatus>{tx.status}</CompletedStatus> }</Td>
            <Td>
              <ControlsWrapper>
                <EditButton onClick={() => onEdit(tx)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(tx.id)}>Delete</DeleteButton>
              </ControlsWrapper>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  </TableWrapper>
);