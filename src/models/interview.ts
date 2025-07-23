export interface BaseInterview {
    company: string;
    job_title: string;
    job_description: string;
    created_at: {
        date: Date;
        time: string;
    };
}

export interface Interview extends BaseInterview {
    id: string;
}