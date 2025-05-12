'use client'
import { useExpenseStore } from "@/lib/useExpenseStore"
import { columns } from "./column"
import { DataTable } from "./data-table"


export default function DemoPage() {

    // const [data, setData] = useState<ExpenseInterface[]>([])
    //     const setExpense = useExpenseStore((state) => state.setExpense);

    // useEffect(() => {
    //     setExpense(data);
    // }, [data, setExpense]); // Dependency array ensures this runs only when `data` changes

    const data = useExpenseStore((state)=>state.expenses)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
    
}
