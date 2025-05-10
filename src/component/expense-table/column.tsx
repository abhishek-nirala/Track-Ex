"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExpenseInterface } from '@/models/Expense.model'
import { ArrowUpDown, ArrowUpDownIcon, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    // DialogHeader,
    // DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
// import { useExpenseStore } from "@/lib/useExpenseStore"

export const columns: ColumnDef<ExpenseInterface>[] = [
    {
        accessorKey: "category",
        header: () => <div className="text-left">Category</div>,
        cell: (data) => {
            const category: string = data.row.getValue("category")
            const formatted = category.charAt(0).toUpperCase() + category.slice(1)
            return <div className="text-left font-medium capitalize">{formatted}</div>
        },


    },


    {
        accessorKey: "date",
        header: ({ column }) => <div className="text-left">Date
            <Button className="text-left border-4"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >

                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>,
        cell: ({ row }) => {
            const date: Date = row.getValue("date")
            const formatted = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                // timeZoneName: "short"
            }).format(new Date(date));
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (<>
                Amount
                <Button className="text-left border-4"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >

                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            </>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: localStorage.getItem("currency") || "INR",

            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <ActionCell expense={row.original} />
        )
    }

]

type ActionCellProps = {
    expense: ExpenseInterface;
}


const ActionCell: React.FC<ActionCellProps> = ({ expense }) => {
    // const [dialogOpen, setDialogOpen] = useState(false);
    const [activeDialog, setActiveDialog] = useState<{
        type: 'view' | 'edit' | null;
        item: ExpenseInterface | null;
    }>({ type: null, item: null });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                        // setActiveDialog({ type: "view", item: expense })
                        requestAnimationFrame(() => {
                            setActiveDialog({ type: 'view', item: expense });
                        });
                    }}>
                        View Note
                    </DropdownMenuItem >
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                        requestAnimationFrame(() => {
                            setActiveDialog({ type: 'edit', item: expense });
                        });
                    }}>
                        Edit</DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleDeleteExpense(expense._id as string)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={!!activeDialog.type} onOpenChange={() => {
                setActiveDialog({ type: null, item: null })
            }}>
                <DialogTitle />
                <DialogContent>
                    {activeDialog.type === 'view' && (
                        <div>
                            <h2>Viewing Notes</h2>
                            <p>{activeDialog.item?.description}</p>
                        </div>
                    )}

                    {activeDialog.type === 'edit' && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            // call your update function here
                        }}>
                            <input defaultValue={activeDialog.item?.description} />
                            <input defaultValue={activeDialog.item?.amount} />
                            <button type="submit">Save</button>
                        </form>
                    )}
                </DialogContent>
                <DialogDescription />
            </Dialog>
        </>
    );
};

const handleDeleteExpense = (id: string) => {
    console.log("expense deleted!! test.", id)
}