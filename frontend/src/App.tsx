import React, { useEffect, useState } from 'react';
import { Transaction } from './types/Transaction';
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from './services/api';
import { TransactionTable } from './components/TransactionTable';
import { TransactionForm } from './components/TransactionForm';
import { Modal } from './components/Modal';
import {
    AppWrapper,
    ControlsWrapper,
    FilterInput,
    FilterSelect,
    PaginationControls
} from './styles/App.styles';
import { NewButton } from "./styles/Common.styles";

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editing, setEditing] = useState<Transaction | undefined>();
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState<{ category?: string; status?: string }>({});
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 5;

    const loadData = async () => {
        const res = await getTransactions({
            ...filters,
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
        setTransactions(res.data.data);
        setTotal(res.data.total);
    };

    useEffect(() => {
        loadData();
    }, [filters, page]);

    const handleSubmit = async (data: Omit<Transaction, 'id'>) => {
        if (editing) {
            await updateTransaction(editing.id, data);
            setEditing(undefined);
        } else {
            await createTransaction(data);
        }
        setShowModal(false);
        await loadData();
    };

    const handleDelete = async (id: string) => {
        await deleteTransaction(id);
        await loadData();
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value === '' ? undefined : value
        }));
        setPage(1);
    };

    return (
        <AppWrapper>
            <h1>Transactions Dashboard</h1>
            <ControlsWrapper>
                <FilterInput
                    name="category"
                    placeholder="Filter by category"
                    onChange={handleFilterChange}
                />
                <FilterSelect name="status" onChange={handleFilterChange}>
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </FilterSelect>
                <NewButton
                    onClick={() => {
                        setEditing(undefined);
                        setShowModal(true);
                    }}
                >
                    + New Transaction
                </NewButton>
            </ControlsWrapper>

            <TransactionTable
                transactions={transactions}
                onEdit={(tx) => {
                    setEditing(tx);
                    setShowModal(true);
                }}
                onDelete={handleDelete}
            />

            <PaginationControls>
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
                <span>
          Page {page} of {Math.ceil(total / pageSize)}
        </span>
                <button disabled={page * pageSize >= total} onClick={() => setPage(p => p + 1)}>Next</button>
            </PaginationControls>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <TransactionForm initialData={editing} onSubmit={handleSubmit} />
            </Modal>
        </AppWrapper>
    );
};

export default App;
