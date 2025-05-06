'use client'
import { useCallback, useEffect, useState } from "react";
import { columns } from "./column"
import { DataTable } from "./data-table"
import axios from "axios";
import { ExpenseInterface } from "@/models/Expense.model";


export default function DemoPage() {

    const [tableData, setTableData] = useState<ExpenseInterface[]>([])

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("/api/expense");
            setTableData(response.data.message);
        } catch (e) {
            console.log("error @render-table.tsx", e);
        }
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData])



    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tableData} />
        </div>
    )
}
