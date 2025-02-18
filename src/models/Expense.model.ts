import mongoose, { Document } from 'mongoose'


enum ExpenseCategory {
    Rent = "Rent",
    Groceries = "Groceries",
    Bills = "Bills",
    School = "School",
    Entertainment = "Entertainment",
    Misc = "Misc",
    Travel = "Travel"
}
interface ExpenseInterface extends Document {
    userId: mongoose.Types.ObjectId,
    category: ExpenseCategory,
    amount: number,
    description?: string,
    date: Date,
    recurring?: boolean,
    recurringFrequency?: number,
}

const ExpenseSchema = new mongoose.Schema<ExpenseInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(ExpenseCategory)
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    recurring: {
        type: Boolean,
        default: false
    },
    recurringFrequency: {
        type: Number,
    }
});

const Expense = (mongoose.models.User as mongoose.Model<ExpenseInterface>) || mongoose.model<ExpenseInterface>('Expense', ExpenseSchema)

export default Expense;