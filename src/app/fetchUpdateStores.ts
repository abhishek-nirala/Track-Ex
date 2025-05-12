import { useExpenseStore, useExpenseSummary } from "@/lib/useExpenseStore";
import axios from "axios";

export async function fetchAndUpdateStores() {
    try {
        // Fetch expense summary data
        const summaryResponse = await axios.get("/api/expense?filter=summary");
        // console.log("summaryResponse : ", summaryResponse.data.message)
        if (summaryResponse.data.success) {
            useExpenseSummary.getState().setSummary(summaryResponse.data.message);
        }

        // Fetch expense data
        const expenseResponse = await axios.get("/api/expense");
        // console.log("expenseResponse: ", expenseResponse)
        if (expenseResponse.data.success) {
            useExpenseStore.getState().setExpense(expenseResponse.data.message);
        }
    } catch (error) {
        console.error("Error fetching and updating stores:", error);
    }
}
