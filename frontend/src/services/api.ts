import axios from 'axios';
import { Transaction } from '../types/Transaction';

const API = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getTransactions = (params?: {
  category?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) =>
  API.get<{ data: Transaction[]; total: number }>('/transactions', { params });

export const createTransaction = (data: Omit<Transaction, 'id'>) =>
  API.post<Transaction>('/transactions', data);

export const updateTransaction = (id: string, data: Partial<Transaction>) =>
  API.put<Transaction>(`/transactions/${id}`, data);

export const deleteTransaction = (id: string) =>
  API.delete(`/transactions/${id}`);
