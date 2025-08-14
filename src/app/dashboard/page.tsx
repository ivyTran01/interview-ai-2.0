"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InterviewForm } from "@/components/forms/InterviewForm";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { columns } from "@/components/ui/data-table/columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { getAllInterviews } from "@/utils/api/interviews";
import { Interview } from "@/models/interview";

export default function DashboardPage() {
    const { user } = useAuth();
    const userId = user?.uid;

    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
    const [dataForTable, setDataForTable] = useState<Interview[]>([]);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const interviews = await getAllInterviews(userId);
                setDataForTable(interviews);
            } catch (error) {
                console.error("Failed to fetch interviews", error);
            }
        };

        fetchData();
    }, [userId]);

    const handleInterviewSubmit = () => {
        toast("Interview session added", {
            description: "Good luck with your practice interview!",
        });
        setIsInterviewDialogOpen(false);
    };

    const handleInterviewCancel = () => {
        //todo: add confirm cancel dialog
        setIsInterviewDialogOpen(false);
    }

    return (
        <div className="min-h-screen p-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>

            <div className="container mx-auto py-10">
                <DataTable
                    columns={columns(userId || "")}
                    data={dataForTable}
                    addNewEntryComponent={
                        <>
                            <Button onClick={() => setIsInterviewDialogOpen(true)}>Add Interview</Button>

                            <Sheet
                                open={isInterviewDialogOpen}
                                onOpenChange={(open) => {
                                    if (!open) {
                                        // The user is trying to close it by clicking X or backdrop
                                        console.log("User clicked X or backdrop to close the interview dialog");
                                    }
                                    setIsInterviewDialogOpen(open);
                                }}
                            >
                                <SheetContent side="right" className="w-full max-w-[90vw] lg:max-w-[60vw] p-20">
                                    <SheetHeader className="p-0 pt-4">
                                        <SheetTitle>Add new interview</SheetTitle>
                                        <SheetDescription>
                                            Congratulations on your new interview invitation! Practice makes progress, so let's get you prepped up!
                                        </SheetDescription>
                                    </SheetHeader>

                                    <InterviewForm
                                        onSubmit={handleInterviewSubmit}
                                        onCancel={handleInterviewCancel}
                                        userId={userId}
                                    />
                                </SheetContent>
                            </Sheet>
                        </>
                    }
                />
            </div>
        </div>
    );
}
