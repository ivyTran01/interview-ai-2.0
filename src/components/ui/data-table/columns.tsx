"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge";
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Interview } from "@/models/interview"
import {Rating, RatingButton} from "@/components/ui/rating-stars";
import router from "next/router";
import Link from "next/link";
import { getInterviewSessionId } from "@/utils/api/interview_sessions";

export const columns = (userId: string): ColumnDef<Interview>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        meta: { label: "Company" },
        header: () => <div className="text-left">Company</div>,
    },
    {
        accessorKey: "job_title",
        meta: { label: "Job title" },
        header: () => <div className="text-left">Job title</div>,
    },
    {
        accessorKey: "interview_datetime",
        meta: { label: "Time"},
        header: "Time",
        cell: ({ row }) => {
            const datetime = row.getValue("interview_datetime") as {
                date: { seconds: number; nanoseconds: number };
                time: string;
            };

            // convert Firebase timestamp to JS Date
            const jsDate = new Date(datetime.date.seconds * 1000);

            // format the date nicely
            const formattedDate = jsDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            return (
                <div>
                    <div>{formattedDate}</div>
                    <div>{datetime.time}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "salary",
        meta: { label: "Salary" },
        header: "Salary",
        cell: ({ row }) => {
            const amount = Number(row.getValue("salary"))
            const formatted = "$" + amount.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "likes",
        meta: { label: "Love rating" },
        header: "Love rating",
        cell: ({ row }) => {
            const num_stars = row.original.likes;
            return (
                <Rating defaultValue={num_stars} readOnly={true}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton key={index} size={18} />
                    ))}
                </Rating>
            );
        }
    },
    {
        accessorKey: "status",
        meta: { label: "Status" },
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as 'success' | 'praying' | 'try_harder';
            return (
                <StatusBadge status={status}/>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const interview = row.original;
            const interview_session_id = getInterviewSessionId(userId, interview.id);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/interview_session/${interview_session_id}`}>
                                Practice
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>Edit</DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-orange-600 font-medium hover:bg-red-400/20 focus:bg-red-400/20 focus:text-orange-600">
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]