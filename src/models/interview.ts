export interface BaseInterview {
    company: string;
    job_title: string;
    job_description: string;
    interview_datetime: {
        date: Date;
        time: string;
    };
    salary: number;
    likes: number;
    status: "success" | "praying" | "try_harder";
}

export interface Interview extends BaseInterview {
    id: string;
}