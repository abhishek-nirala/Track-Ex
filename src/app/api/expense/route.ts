import printMessage from "@/errorMsg";
import connectDb from "@/lib/connectDb";
import Expense from "@/models/Expense.model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getToken, } from "next-auth/jwt";
// import jwt from 'jsonwebtoken'
// import User from "@/models/User.model";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return printMessage(false, "Unauthorize! Please Login to access Protected content.", 401);
    }
    console.log('logged-in!')
    await connectDb();

    try {
        const email = session?.user?.email;
        const response = await Expense.find({ email })
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
    // if (!session) {
    //     return printMessage(false, "Unauthorize! Please Login to access Protected content.", 401);
    // }
    const email = session?.user?.email;
    // // console.log("email @Expense POST", email)
    const token = await getToken({req})


    // console.log("header: ", req.headers.get("authorization")?.split(' ')[1]);
    // const header = req.headers.get("authorization")?.split(' ')[1];
    // const abc = jwt.verify(header,process.env.NEXTAUTH_SECRET)
// console.log("abc : ",abc)

    console.log("token : ",token);

    // if(!abc){
    //     return printMessage(false,"unauthorize",401);
    // }

    await connectDb();

    try {
        const { category, amount, description } = await req.json();
        // const findUser = await User.findOne({email:session?.user?.email})
        // console.log("findUser : ",findUser)
        const newExpense = new Expense({
            // userId : findUser?._id,
            email,
            category,
            amount,
            description,
            // date:Date.now()
        })
        const response = await newExpense.save();
        if (response) {
            console.log("newExpense : ", newExpense)
            console.log("response : ", response)
            return printMessage(true, "The entry has been added.", 200)
        }
    } catch (error) {
        console.log("error @ expense.ts : ", error)
        return printMessage(false, "Couldn't saved the entry.Something went wrong!", 500)
    }
}