"use client"
// import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable, ExpenseType } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
// import { SiteHeader } from "@/components/site-header"
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import axios from "axios"
import { useEffect, useState } from "react"
// import RenderTable from '@/component/expense-table/render-table'

// import data from "./data.json"
// import { useExpenseStore } from "@/lib/useExpenseStore"

export default function Page() {
  const [data, setData] = useState<ExpenseType[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/expense")
        if (!response.data) {
          return <div>No Expenses to display!</div>
        }

        setData(response.data.message)
      } catch (error) {
        console.log("error at dashboard/page.tsx while fetching expense: ", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpense();
  }, [])

  const removeDeletedExpense = (id: string) => {
    setData((prev) => prev.filter((data) => data._id !== id))
  }
  const showUpdatedData = (id: string, category: string, amount: number, desc: string) => {
    console.log("data updated in the ui", id, category, amount)
    setData((prev) =>
      prev.map((expense) =>
        expense._id === id
          ? { ...expense, category: category, amount: amount, description: desc }
          : expense
      )
    )
  }

  // console.log("data: ", data)
  return (
    // <SidebarProvider>
    //   <AppSidebar variant="inset" />
    //   <SidebarInset>
    //     <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              {loading ? (
                <div>Loading...</div>
              ) : (<>
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} onDelete={removeDeletedExpense} onUpdate={showUpdatedData} />
              </>
              )}
              {/* <RenderTable/> */}
            </div>
          </div>
        </div>
    //   </SidebarInset>
    // </SidebarProvider>
  )
}
