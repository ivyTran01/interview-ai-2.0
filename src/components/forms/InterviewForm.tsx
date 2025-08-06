"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Rating, RatingButton } from "@/components/ui/rating-stars";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";
import { createInterview } from "@/utils/api/interviews";
import { BaseInterview } from "@/models/interview";

const formSchema = z.object({
    company: z.string().min(1, "This field is required"),
    jobTitle: z.string().min(1, "This field is required"),
    jobDescription: z.string().min(1, "This field is required"),
    interviewDatetime: z.date(),
    salary: z.number().min(0),
    likes: z.number().min(1),
    status: z.enum(["success", "praying", "try harder"]),
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
        mode: "onChange",
        defaultValues: {
            company: "",
            jobTitle: "",
            jobDescription: "",
            interviewDatetime: (() => {
                const d = new Date();
                d.setDate(d.getDate() + 1);  // tomorrow
                d.setHours(10, 0, 0, 0);     // 10:00 AM
                return d;
            })(),
            salary: 90000,
            likes: 3,
            status: "praying",
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
                company: data.company,
                job_title: data.jobTitle,
                job_description: data.jobDescription,
                interview_datetime: {
                    date: data.interviewDatetime,
                    time: data.interviewDatetime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
                salary: data.salary,
                likes: data.likes,
                status: data.status,
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 w-full py-6">
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Google" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Paste the complete job description here..."
                                    className="min-h-[160px] h-[288px] overflow-auto resize-none scrollbar-hide"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="interviewDatetime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Interview Date & Time</FormLabel>
                            <FormControl>
                                <SmartDatetimeInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    defaultTime="10:00 AM"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expected Salary: {form.watch("salary")}</FormLabel>
                            <FormControl>
                                <Slider
                                    min={60000}
                                    max={200000}
                                    step={1000}
                                    value={[field.value || 90000]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="likes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How much do you like this job?</FormLabel>
                            <FormControl>
                                <Rating value={field.value} onChange={(e, val) => field.onChange(val)}>
                                    <RatingButton />
                                    <RatingButton />
                                    <RatingButton />
                                    <RatingButton />
                                    <RatingButton />
                                </Rating>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!form.formState.isValid || isSaving}>
                        {isSaving ? "Saving..." : "Create Interview"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
