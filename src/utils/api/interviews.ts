import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { BaseInterview, Interview } from "@/models/interview";
import { db } from "@/lib/firebase/firebaseConfig";

export async function createInterview(
    userId: string,
    interview_info: BaseInterview
) {
    const interviewsCollection = collection(db, "users", userId, "interviews");
    const interviewDoc = await addDoc(interviewsCollection, interview_info);

    return interviewDoc.id;
}

export async function getAllInterviews(userId: string): Promise<Interview[]> {
    const interviewsCollection = collection(db, "users", userId, "interviews");
    const interviewDocs = await getDocs(interviewsCollection);

    return interviewDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

export async function getInterviewById(
    userId: string,
    interviewId: string
): Promise<Interview | null> {
    const interviewDocRef = doc(db, "users", userId, "interviews", interviewId);
    const interviewDoc = await getDoc(interviewDocRef);

    if (interviewDoc.exists()) {
        return {
            id: interviewDoc.id,
            ...interviewDoc.data(),
        } as Interview;
    } else {
        return null;
    }
}

