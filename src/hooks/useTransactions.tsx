import {createContext, ReactNode, useEffect, useState, useContext} from 'react';
import { api } from '../services/api';

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

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //força objeto do tipo TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() =>{
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionsInput){
    // const response = await api.post('/transactions', {
    //   ...transactionInput,
    //   createdAt: new Date(),
    // });

    const response = await api.post('/transactions', transactionInput);

    //Renomeando a propriedade desestruturada
    //const {transaction: newTransactionData} = response.data

    //Sem desestruturar, dando apenas um nome pra variável
    //const newTransactionData = response.data

    //Só que agora para acessar a transaction seria assim:
    //newTransactionData.transaction

    const {transaction} = response.data;
    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context;
}