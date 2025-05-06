"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExpenseInterface } from '@/models/Expense.model'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        header: () => <div className="text-left">Date</div>,
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
                    
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                </>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const expense = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />

                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense.id)}
                        >
                            Copy expense ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View expense details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }

]
