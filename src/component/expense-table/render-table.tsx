'use client'
import { useExpenseStore } from "@/lib/useExpenseStore"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { ExpenseInterface } from "@/models/Expense.model"
import { useEffect, useState } from "react"
import axios from "axios"


export default function DemoPage() {

    const [data, setData] = useState<ExpenseInterface[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/expense")
                if (response.data && response.data.success) {
                    setData(response.data.message)
                }
            } catch (error) {
                console.log("error@render-table: ", error)
            }
        }
        fetchData();
    }, [])
    const setExpense = useExpenseStore((state) => state.setExpense);

    useEffect(() => {
        setExpense(data);
    }, [data, setExpense]); // Dependency array ensures this runs only when `data` changes

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
