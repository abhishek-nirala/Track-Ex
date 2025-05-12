'use client';

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useExpenseSummary } from '@/lib/useExpenseStore';



export default function TableSummary() {
    // const [error, setError] = useState<string | null>(null);

    // Fetch data and update Zustand store
  

    // Get data from Zustand store
    const data = useExpenseSummary((state) => state.summaries);

    // Handle error state
    // if (error) {
    //     return <div>{error}</div>;
    // }

    // Handle empty data state
    if (data.length === 0) {
        return <div>No expense summary available.</div>;
    }

    return (
        <>
            <h1 className="">A summary of your expenses of this month</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.totalSpent}</TableCell>
                            <TableCell className="text-right">{item.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
