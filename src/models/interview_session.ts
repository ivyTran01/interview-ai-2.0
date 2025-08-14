export interface InterviewSessionBase {
    user_id: string;
    interview_id: string;
    created_at: Date;
}

export interface InterviewSession extends InterviewSessionBase {
    id: string;
}

