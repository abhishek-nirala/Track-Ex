import { create } from 'zustand'
// import { ExpenseInterface } from '@/models/Expense.model'
import { ExpenseType } from '@/components/data-table';
// import axios, { AxiosError } from 'axios'
// import { useEffect, useState } from 'react'

// export type State = {
//     expenses: ExpenseInterface[]
// }
interface IExpenseState {
  expenses: ExpenseType[];
  setExpense: (newExpense: ExpenseType[]) => void;
  addExpense: (expense: ExpenseType) => void;
  removeAllExpenses: () => void;
}


export const useExpenseStore = create<IExpenseState>((set) => ({
    expenses : [],
    setExpense: (newExpense) => set({ expenses: newExpense }),
    addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
    removeAllExpenses: () => set({ expenses: [] }),
}))

// type tSummary = {
//   _id : string,
//   totalSpent : number,
//   count : number

// }
// interface IExpenseSummary {
//   summary : tSummary[] 
// }
// export const useExpenseSummaryStore = create((set)=>{
//   summary : []
// })



// export const useFetch = <T= unknown> (url: string) => {
//     const [data, setData] = useState<T>();
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<null | string>(null)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(url);
//                 if (response.data && response.data.success) {
//                     setData(response.data.message)
//                 }

//             } catch (error) {
//                 const axiosError = error as AxiosError;
//                 setError(axiosError.message)
//             } finally {
//                 setLoading(false)
//             }

//         }

//         fetchData();
//     }, [url])
//     return { data, loading, error }
// }
