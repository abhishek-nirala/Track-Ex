"use client"

// import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import axios from 'axios'
// import { ExpenseInterface } from "@/models/Expense.model"




export default function Expense() {

    const {data:session} = useSession()

    const handleFetchExpense = async()=>{
        try {
            const response = await axios.get('/api/expense')
            if(response.data.success){
                console.log(response.data.message)
            }
        } catch (error) {
           console.log("error: ",error) 
        }
    }

    const formSchema = z.object({
        category: z.string().min(2, {
            message: "category must be at least 2 characters.",
        }).max(20, {
            message: "category must be less than or equal to 20 chars."
        }),
        amount: z.string(),
        description: z.string().min(2, {
            message: "description must be at least 2 characters.",
        }).max(50, {
            message: "description must be less than or equal to 20 chars."
        }),



    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            amount: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try{
            // const {category, amount, description} = values;
            // console.log("cad: ", category, amount, description)
            const response = await axios.post("/api/expense",values)
            if(response){
                console.log(response.data.message)
            }
        }catch(e){
            console.log("error @expense/page.tsx : ",e)
        }
    }
    return (<>
        <h1 className="text-3xl">{session?.user?.email}</h1>
        <Button onClick={handleFetchExpense}>click me!</Button>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Rent | Tuition" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide the category of you Expense
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input  placeholder="100" {...field} />
                            </FormControl>
                            <FormDescription>
                                Amount to be added.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>description</FormLabel>
                            <FormControl>
                                <Input placeholder="School Fee this month" {...field} />
                            </FormControl>
                            <FormDescription>
                                One liner about the Expense
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </>)
}