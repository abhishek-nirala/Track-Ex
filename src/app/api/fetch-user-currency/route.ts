import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import printMessage from "@/errorMsg";
import connectDb from "@/lib/connectDb";
import User from "@/models/User.model";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return printMessage(false, "Unauthorize | didn't find user", 401)
    }
    await connectDb();
    try {
        const email = session.user.email;
        const response = await User.findOne({ email })
        if (!response) {
            return printMessage(false, "User not found", 404)
        }
        console.log("user-currency: ", response)
        return printMessage(true, response, 200)

    } catch (error) {
        console.log("error @fetch-user-currency: ", error)
        const err = error as Error
        return printMessage(false, err.message, 500)

    }

}