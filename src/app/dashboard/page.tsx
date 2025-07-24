"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {InterviewForm} from "@/components/forms/InterviewForm";
import {toast} from "sonner";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function DashboardPage() {
    const { user } = useAuth();
    const userId = user?.uid;

    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);

    const handleInterviewSubmit = () => {
        toast("Interview session started", {
            description: "Good luck with your practice interview!",
        });
        setIsInterviewDialogOpen(false); // Close the dialog
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="mt-10">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>Add Interview</Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-full sm:w-[500px]">
                        <h2 className="text-lg font-semibold mb-4">Add New Interview</h2>
                        <InterviewForm
                            onSubmit={handleInterviewSubmit}
                            onCancel={() => setIsInterviewDialogOpen(false)}
                            userId={userId}
                        />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
