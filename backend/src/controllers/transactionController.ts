import { Request, Response } from 'express';
import { db } from '../db';
import { Transaction } from '../models/Transaction';
import { v4 as uuid } from 'uuid';

export const getTransactions = async (req: Request, res: Response) => {
  const { category, status, limit, offset } = req.query;
  let result = db.get('transactions').value();

  if (category) {
    result = result.filter(t => t.category === category);
  }
  if (status) {
    result = result.filter(t => t.status === status);
  }

  const start = parseInt(offset as string) || 0;
  const end = start + (parseInt(limit as string) || result.length);
  const paginated = result.slice(start, end);

  res.json({ data: paginated, total: result.length });
};

export const createTransaction = async (req: Request, res: Response) => {
  const { amount, date, category, status } = req.body;

  const newTransaction: Transaction = {
    id: uuid(),
    amount,
    date,
    category,
    status,
  };

  db.get('transactions').push(newTransaction).write();
  res.status(201).json(newTransaction);
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  const existing = db.get('transactions').find({ id }).value();
  if (!existing) {
    return res.status(404).json({ error: 'Not found' });
  }

  const updated = db.get('transactions').find({ id }).assign(update).write();
  res.json(updated);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('transactions').remove({ id }).write();
  res.status(204).send();
};
