"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import {InterviewForm} from "@/components/forms/InterviewForm";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import { columns, InterviewRecord } from "@/components/ui/data-table/columns";
import { DataTable } from "@/components/ui/data-table/data-table"

async function getData(): Promise<InterviewRecord[]> {
    // Fetch data from your API here.
    return [
        {
            company: "Google",
            job_title: "Software Engineer",
            interview_datetime: {
                date: new Date("2025-08-10T10:00:00"),
                time: "10:00 AM",
            },
            salary: 130000,
            likes: 5,
            status: "praying",
        },
        {
            company: "Amazon",
            job_title: "Frontend Developer",
            interview_datetime: {
                date: new Date("2025-08-12T14:30:00"),
                time: "2:30 PM",
            },
            salary: 120000,
            likes: 4,
            status: "try harder",
        },
    ]
}

export default function DashboardPage() {
    const { user } = useAuth();
    const userId = user?.uid;

    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
    const [dataForTable, setDataForTable] = useState<InterviewRecord[]>([]);

    useEffect(() => {
        getData().then(setDataForTable);
    }, []);

    const handleInterviewSubmit = () => {
        toast("Interview session started", {
            description: "Good luck with your practice interview!",
        });
        setIsInterviewDialogOpen(false); // Close the dialog
    };


    return (
        <div className="min-h-screen p-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button>Add Interview</Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-full max-w-[90vw] lg:max-w-[60vw] p-20">
                        <SheetHeader className="p-0 pt-4">
                            <SheetTitle>Add new interview</SheetTitle>
                            <SheetDescription>
                                Congratulations on your new interview invitation! Practice makes perfect, and we're here to help you prepare.
                            </SheetDescription>
                        </SheetHeader>

                        <InterviewForm
                            onSubmit={handleInterviewSubmit}
                            onCancel={() => setIsInterviewDialogOpen(false)}
                            userId={userId}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={dataForTable} />
            </div>
        </div>
    );
}
