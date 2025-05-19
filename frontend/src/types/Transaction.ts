export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  status: 'pending' | 'completed';
}