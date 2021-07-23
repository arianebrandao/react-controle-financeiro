import {createContext, ReactNode, useEffect, useState} from 'react';
import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

// interface TransactionsInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }
//type TransactionsInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>
type TransactionsInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionsInput) => Promise<void>; //toda função assíncrona retorna uma Promise
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //força objeto do tipo TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() =>{
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionsInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const {newTransactionData} = response.data;
    setTransactions([
      ...transactions,
      newTransactionData,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}