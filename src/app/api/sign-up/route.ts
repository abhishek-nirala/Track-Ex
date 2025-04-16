import errorMessage from "@/errorMsg"
import connectDb from "@/lib/connectDb"
import User from "@/models/User.model";
import bcrypt from 'bcrypt';

export async function GET() {
    return errorMessage(true, "hello check", 500)
}

export async function POST(req: Request) {
    await connectDb();
    try {
        const { name, email, password } = await req.json();
        //accepting unique email
        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            return errorMessage(false, "User already Exists with this email, try using another email", 400);
        }
        const otpCode = Math.ceil(100000 + Math.random() * 5000).toString();
        const exp = new Date();
        const otpCodeExpiry = exp.setMinutes(exp.getMinutes() + 5)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otpCode,
            otpCodeExpiry
        })

        await newUser.save();

    } catch (err) {
        console.log(err)
        return errorMessage(false, "error while sign-up", 400);
    }
}