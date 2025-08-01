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
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {DialogTitle} from "@/components/ui/dialog";

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
    );
}
