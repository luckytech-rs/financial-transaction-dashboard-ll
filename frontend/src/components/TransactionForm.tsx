import React, { useState, useEffect } from 'react';
import { Transaction } from '../types/Transaction';
import {FormWrapper, FieldGroup, Input, Error, Select, Label} from '../styles/TransactionForm.styles';
import { SaveButton } from "../styles/Common.styles";

type Props = {
  initialData?: Partial<Transaction>;
  onSubmit: (data: Omit<Transaction, 'id'>) => void;
};

export const TransactionForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    amount: 0,
    date: '',
    category: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'amount' ? +value : value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.date) newErrors.date = 'Date is required';
    if (form.amount <= 0) newErrors.amount = 'Amount must be greater than zero';
    if (!form.category.trim()) newErrors.category = 'Category is required';
    if (!['pending', 'completed'].includes(form.status)) newErrors.status = 'Invalid status';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ amount: 0, date: '', category: '', status: 'pending' });
    setErrors({});
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {initialData ? <h3>Edit transaction</h3> : <h3>New transaction</h3> }
      <FieldGroup>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        {errors.date && <Error>{errors.date}</Error>}
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" name="amount" type="number" value={form.amount} onChange={handleChange}/>
        {errors.amount && <Error>{errors.amount}</Error>}
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" value={form.category} onChange={handleChange} />
        {errors.category && <Error>{errors.category}</Error>}
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="status">Status</Label>
        <Select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
        {errors.status && <Error>{errors.status}</Error>}
      </FieldGroup>
      <SaveButton type="submit" name="save">Save</SaveButton>
    </FormWrapper>
  );
};