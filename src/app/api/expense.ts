import printMessage from "@/errorMsg";
import connectDb from "@/lib/connectDb";
import Expense from "@/models/Expense.model";
import { NextResponse } from "next/server";


export async function GET(){
    return printMessage(false,'just checking the route', 400);
}

export async function POST(req:NextResponse) {
    await connectDb();

    try {
        const {category, amount, description} = await req.json();

        const newExpense = new Expense({
            userId : '67fbd4001639fde2595a9fc5',
            category, 
            amount,
            description,
            date:Date.now()
        })
        const response = await newExpense.save();
        if(response){
            console.log("newExpense : ", newExpense)
            console.log("response : ", response)
        }
    } catch (error) {
        console.log("error @ expense.ts : ", error)
        
    }
}