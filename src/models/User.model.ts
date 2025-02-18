import mongoose, { Document } from 'mongoose'


enum UserRole{
    admin = "admin",
    user = "user"
}
export interface UserInterface extends Document {
    name: string,
    email: string,
    password: string,
    phone?: string,
    currency?: string,
    preferences?: {
        auto_reminders: boolean,
        auto_payment_updates: boolean
    },
    role: UserRole,
    createdAt: Date,
    expenseId?: mongoose.Types.ObjectId
    billId?: mongoose.Types.ObjectId
    jwtToken: string,
    otpCode: number,
    otpCodeExpiry:Date
}

const UserSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "The name should be more than 2 characters."],
        maxlength: [20, "The name should be less than 20 characters."],
        match: [/^[A-Za-z]{2,20}(?: [A-Za-z]{2,20})*$/, "Please a valid name and also ensure do not give extra space "]

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, "Please Enter Valid Email"]

    },
    password:
    {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: "USD"
    }, // User's preferred currency
    preferences: {
        auto_reminders: {
            type: Boolean,
            default: true
        }, // Enable automatic rent reminders
        auto_payment_updates: {
            type: Boolean,
            default: true
        }, // Reflect payments automatically
    },
    role: {
        type: String,
        enum:Object.values(UserRole),
        default: UserRole.user
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    jwtToken: {
        type: String,
        required: true
    },
    otpCode: {
        type: Number,
        required: true
    },
    otpCodeExpiry:{
        type:Date,
        required:true
    },
    expenseId: mongoose.Schema.Types.ObjectId,
    billId: mongoose.Schema.Types.ObjectId

});
const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>('User', UserSchema)

export default User;