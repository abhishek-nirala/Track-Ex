import mongoose, { Document } from 'mongoose'


export interface UserInterface extends Document {

    name: string,
    email: string,
    phone?: string,
    profileImg:string,
    currency?: string,
    preferences?: {
        auto_reminders: boolean,
        auto_payment_updates: boolean
    },
    createdAt: Date,
    expenseId?: mongoose.Types.ObjectId
    billId?: mongoose.Types.ObjectId


}

const UserSchema = new mongoose.Schema<UserInterface>({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "The name should be more than 2 characters."],
        maxlength: [30, "The name should be less than 30 characters."],
        match: [/^[A-Za-z]{2,20}(?: [A-Za-z]{2,20})*$/, "Please a valid name and also ensure do not give extra space "]

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, "Please Enter Valid Email"]

    },
    profileImg: {
        type: String,
        required: true
    },
 
    phone: {
        type: String,
        // required: true
    },
    currency: {
        type: String,
        default: "INR"
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
 
    createdAt: {
        type: Date,
        default: Date.now
    },

    expenseId: mongoose.Schema.Types.ObjectId,
    billId: mongoose.Schema.Types.ObjectId

});
const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>('User', UserSchema)

export default User;