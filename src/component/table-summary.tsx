'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type summary = {
    _id: string,
    totalSpent: number,
    count: number
}

interface IExpenseSummary {
    success: boolean,
    message: summary[]
}
export default function TableSummary() {
    const [message, setMessage] = useState<IExpenseSummary["message"]>([])
    useEffect(() => {
        const fetchTableSummaryData = async () => {
            try {
                const response = await axios.get<IExpenseSummary>("/api/expense?filter=summary")
                // console.log("response: ", response.data)
                setMessage(response.data.message)
            } catch (error) {
                console.log("error : ", error)
            }
        }
        fetchTableSummaryData();
    }, [])
    return (<>
        <h1 className="">A summary of your expenses of this month</h1>
        {
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
                        <TableHead>Category</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* <TableRow> */}
                    {/* <TableCell className="font-medium">INV001</TableCell>
                           message( <TableCell>{msg._id}</TableCell>
                            <TableCell>{msg.totalSpent}</TableCell>
                            <TableCell className="text-right">{msg.count}</TableCell>
                           )) */}
                    {
                        // message.map((msg) => (<>
                        //     <TableRow key={key}>

                        //         <TableCell>{msg._id}</TableCell>
                        //         <TableCell>{msg.totalSpent}</TableCell>
                        //         <TableCell className="text-right">{msg.count}</TableCell>
                        //     </TableRow>
                        // </>
                        // ))

                        message.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item._id}</TableCell>
                                <TableCell>{item.totalSpent}</TableCell>
                                <TableCell>{item.count}</TableCell>
                            </TableRow>
                        ))


                    }

                    {/* </TableRow> */}
                </TableBody>
            </Table>


        }

    </>)
}
