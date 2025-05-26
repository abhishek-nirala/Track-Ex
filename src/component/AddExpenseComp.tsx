import * as React from "react"

// import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function AddExpense() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Add your Expense here
            </DialogDescription>
          </DialogHeader>
          <Expense />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">+</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Expense</DrawerTitle>
          <DrawerDescription>
          </DrawerDescription>
        </DrawerHeader>
        <Expense />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// function ProfileForm({ className }: React.ComponentProps<"form">) {
//   const [category, setCategory] = React.useState('')
//   const [amount, setAmount] = React.useState(0)
//   const [description, setDescription] = React.useState('')
//   return (
//     <form className={cn("grid items-start gap-4", className)}>
//       <div className="grid gap-2">
//         <Label htmlFor="category">Category</Label>
//         <Input type="text" id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Rent | Travel | Movie"
//         />
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="amount">Amount</Label>
//         <Input id="amount" type="number"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           placeholder="00.00"
//         />
//         <Label htmlFor="description">Note</Label>
//         <Input id="description" type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="A one liner Note"
//         />

//       </div>
//       <Button type="submit">Add</Button>
//     </form>
//   )
// }


import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { toast } from "@/hooks/use-toast"
import {useRouter} from 'next/navigation'

function Expense() {

  const router = useRouter()

  const formSchema = z.object({
    category: z.string().min(2, {
      message: "category must be at least 2 characters.",
    }).max(20, {
      message: "category must be less than or equal to 20 chars."
    }),
    amount: z.string(),
    description: z
      .string()
      .max(50, {
        message: "description must be less than or equal to 20 chars."
      })
      .optional()
      .refine(
        (val) => !val || val.length >= 3,
        { message: "notes at least must be 3 chars long" }
      )



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
    try {
      const response = await axios.post("/api/expense", values)
      if (response) {
        // console.log(response.data.message)
        toast({
          title: "Expense Added",
          variant: "default"
        })
      }
    } catch (e) {
      console.log("error @expense/page.tsx : ", e)
    }finally{
      router.refresh()
    }
  }
  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-8">
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
                <Input placeholder="100" {...field} />
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
              <FormLabel>Description<span className="text-slate-500"> (optional)</span></FormLabel>
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
        <DrawerClose type="submit">Submit</DrawerClose>
      </form>
    </Form>
  </>)
}
