import printMessage from "@/errorMsg";
import connectDb from "@/lib/connectDb";
import Expense from "@/models/Expense.model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getToken, } from "next-auth/jwt";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return printMessage(false, "Unauthorize! Please Login to access Protected content.", 401);
    }
    console.log('logged-in!')
    await connectDb();

    try {
        const email = session?.user?.email;
        const response = await Expense.aggregate([
            {
                $match: {
                    email
                }
            },
            { $sort: { date: -1 } }
        ])
        if (response) {
            console.log("Expense's route response : ", response)
            //TODO:check the returned response.
            return printMessage(true, `${response}`, 200)
        }
    } catch (error) {
        console.log("Error while fetching Expense item : ", error)
        return printMessage(false, `${session?.user?.email}`, 400);
    }
}

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const token = await getToken({ req })

    console.log("token @expense/route: ", token);
    await connectDb();

    try {
        const { category, amount, description } = await req.json();
        const newExpense = new Expense({
            email,
            category,
            amount: Number.parseInt(amount),
            description,
        })
        const response = await newExpense.save();
        if (response) {
            return printMessage(true, "The entry has been added.", 200)
        }
    } catch (error) {
        console.log("error @ expense.ts : ", error)
        return printMessage(false, "Couldn't saved the entry.Something went wrong!", 500)
    }
}