import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionTable } from '../TransactionTable';
import { vi, describe, it, expect } from 'vitest';

const mockData = [
    {
        id: '1',
        date: '2025-01-01',
        category: 'Rent',
        amount: 1000,
        status: 'completed' as "completed"
    },
    {
        id: '2',
        date: '2025-02-15',
        category: 'Groceries',
        amount: 150,
        status: 'pending' as 'pending'
    }
];

describe('TransactionTable', () => {
    it('renders rows of transaction data', () => {
        render(<TransactionTable transactions={mockData} onEdit={vi.fn()} onDelete={vi.fn()} />);

        expect(screen.getByText('Rent')).toBeInTheDocument();
        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('150')).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(2);
        expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
    });

    it('calls onEdit when Edit button is clicked', () => {
        const mockEdit = vi.fn();
        render(<TransactionTable transactions={mockData} onEdit={mockEdit} onDelete={vi.fn()} />);

        fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);

        expect(mockEdit).toHaveBeenCalledWith(mockData[0]);
    });

    it('calls onDelete when Delete button is clicked', () => {
        const mockDelete = vi.fn();
        render(<TransactionTable transactions={mockData} onEdit={vi.fn()} onDelete={mockDelete} />);

        fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[1]);

        expect(mockDelete).toHaveBeenCalledWith('2');
    });

    it('renders message when there are no transactions', () => {
        render(<TransactionTable transactions={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

        expect(screen.getByText(/no transactions/i)).toBeInTheDocument();
    });
});
