import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TransactionForm } from '../TransactionForm';

describe('TransactionForm', () => {
    let mockSubmit: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockSubmit = vi.fn();
    });

    it('renders all input fields', () => {
        render(<TransactionForm onSubmit={mockSubmit} />);
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('shows validation errors on empty submit', () => {
        render(<TransactionForm onSubmit={mockSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: /save/i }));
        expect(screen.getByText(/date is required/i)).toBeInTheDocument();
        expect(screen.getByText(/amount must be greater than zero/i)).toBeInTheDocument();
    });

    it('calls onSubmit with valid input', () => {
        render(<TransactionForm onSubmit={mockSubmit} />);
        fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Food' } });
        fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '42' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-01-01' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'pending' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));
        expect(mockSubmit).toHaveBeenCalledWith({
            amount: 42,
            category: 'Food',
            date: '2025-01-01',
            status: 'pending'
        });
    });

    it('prefills form when initialData is provided (editing)', () => {
        const initialData = {
            category: 'Rent',
            amount: 1000,
            date: '2025-04-01',
            status: 'completed' as "completed"
        };
        render(<TransactionForm initialData={initialData} onSubmit={mockSubmit} />);
        expect(screen.getByLabelText(/category/i)).toHaveValue('Rent');
        expect(screen.getByLabelText(/amount/i)).toHaveValue(1000);
        expect(screen.getByLabelText(/date/i)).toHaveValue('2025-04-01');
        expect(screen.getByLabelText(/status/i)).toHaveValue('completed');
    });

    it('resets form after submit', () => {
        render(<TransactionForm onSubmit={mockSubmit} />);
        fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Utilities' } });
        fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-05-01' } });
        fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'pending' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));
        expect(screen.getByLabelText(/category/i)).toHaveValue('');
        expect(screen.getByLabelText(/amount/i)).toHaveValue(0); // number input resets to 0
        expect(screen.getByLabelText(/date/i)).toHaveValue('');
    });
});
