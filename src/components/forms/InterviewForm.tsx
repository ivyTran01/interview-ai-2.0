"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Rating } from "@/components/ui/shadcn-io/rating";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";
import { createInterview } from "@/utils/api/interviews";
import { BaseInterview } from "@/models/interview";

const formSchema = z.object({
    jobTitle: z.string().min(1),
    company: z.string().min(1),
    jobDescription: z.string().min(1),
    salary: z.number().min(0),
    interviewDate: z.date(),
    rating: z.number().min(1),
});

type FormData = z.infer<typeof formSchema>;

interface InterviewFormProps {
    onSubmit: () => void;
    onCancel: () => void;
    userId?: string;
}

export function InterviewForm({ onSubmit, onCancel, userId }: InterviewFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salary: 50,
            rating: 3,
            interviewDate: new Date(),
        },
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleFormSubmit = async (data: FormData) => {
        if (!userId) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        setIsSaving(true);

        try {
            const interview_info: BaseInterview = {
                job_title: data.jobTitle,
                job_description: data.jobDescription,
                company: data.company,
                created_at: {
                    date: data.interviewDate,
                    time: data.interviewDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            };

            await createInterview(userId, interview_info);
            toast.success("Interview created successfully!");
            onSubmit();
        } catch (err) {
            console.error(err);
            toast.error("Failed to create interview.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 w-full py-6">
            <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...form.register("company")} placeholder="e.g., Google" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" {...form.register("jobTitle")} placeholder="e.g., Frontend Developer" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                    id="jobDescription"
                    {...form.register("jobDescription")}
                    placeholder="Paste the complete job description here..."
                    className="min-h-[160px]"
                />
            </div>

            <div className="space-y-2">
                <Label>Expected Salary: {form.watch("salary")}</Label>
                <Slider
                    min={60000}
                    max={200000}
                    step={1000}
                    defaultValue={[form.watch("salary")]}
                    onValueChange={(vals) => form.setValue("salary", vals[0])}
                />
            </div>

            <div className="space-y-2">
                <Label>Interview Date & Time</Label>
                <SmartDatetimeInput
                    value={form.watch("interviewDate")}
                    onValueChange={(val) => form.setValue("interviewDate", val)}
                />
            </div>

            <div className="space-y-2">
                <Label>How much do you like this job?</Label>
                <Rating value={form.watch("rating")} onChange={(val) => form.setValue("rating", val)} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Create Interview"}
                </Button>
            </div>
        </form>
    );
}
