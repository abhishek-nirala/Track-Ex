import printMessage from "@/errorMsg";
import connectDb from "@/lib/connectDb";
import Expense from "@/models/Expense.model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getToken, } from "next-auth/jwt";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return printMessage(false, "Unauthorize! Please Login to access Protected content.", 401);
    }

    const filter: string[] = request.nextUrl.searchParams.getAll("filter")
    await connectDb();

    try {
        const email = session?.user?.email;

        if (filter.includes("summary")) {
            const response = await Expense.aggregate([
                {
                    $match: {
                        email
                        //TODO: match based on days
                    }
                },
                {
                    $group: {
                        _id: { $toLower: "$category" },
                        totalSpent: { $sum: "$amount" },
                        count: { $count: {} }
                    }
                }
            ])

            return printMessage(true, response, 200)
        }

        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)

        const response = await Expense.aggregate([
            { $match: { email } },
            {
                $match: {
                    date: {
                        $gte: firstDayOfMonth,
                        $lte: lastDayOfMonth
                    }
                }
            },
            { $sort: { date: -1 } }

        ]) //retrieves the most recent one & expenses of only the current month till date.
        if (response) {

            return printMessage(true, response, 200)
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

export async function DELETE(request: NextRequest) {
    await connectDb()
    const id = request.nextUrl.searchParams.get("id")
    try {

        const response = await Expense.findByIdAndDelete(id)
        if (!response) {
            return printMessage(false, "couldn't be deleted", 404)
        }
        return printMessage(true, "successfully deleted", 200)

    } catch (error) {
        const err = error as Error
        console.log("error while deleting the expense: ", error)
        return printMessage(false, `${err.message}`, 500)
    }
}

export async function PATCH(request: NextRequest) {
    await connectDb();
    const { id, category, amount, desc } = await request.json();
    try {
        const response = await Expense.findByIdAndUpdate(id, {
            category, amount, desc
        }, {
            new: true,
            runValidators: true
        })
        return printMessage(true, `Expense was updated successfully ${response}`, 200)

    } catch (error) {
        console.log("error while updating the expense@expense/route.ts: ", error)
        return printMessage(false, "Couldn't update the Expense details! something went wrong", 500)

    }
}