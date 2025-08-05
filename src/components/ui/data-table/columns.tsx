"use client"

import { ColumnDef } from "@tanstack/react-table"


export type InterviewRecord = {
    company: string;
    job_title: string;
    interview_datetime: {
        date: Date;
        time: string;
    };
    salary: number;
    likes: number;
    status: "success" | "praying" | "try harder";
}

export const columns: ColumnDef<InterviewRecord>[] = [
    {
        accessorKey: "company",
        header: () => <div className="text-left">Company</div>,
    },
    {
        accessorKey: "job_title",
        header: () => <div className="text-left">Job title</div>,
    },
    {
        accessorKey: "interview_datetime",
        header: "Time",
    },
    {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => {
            const amount = Number(row.getValue("salary"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
                maximumFractionDigits: 0,
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "likes",
        header: "Love rating",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]