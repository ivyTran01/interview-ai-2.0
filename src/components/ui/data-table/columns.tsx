"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Interview } from "@/models/interview"

export const columns: ColumnDef<Interview>[] = [
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