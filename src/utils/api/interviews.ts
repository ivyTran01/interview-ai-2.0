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

