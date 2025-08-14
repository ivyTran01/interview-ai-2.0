import {collection, query, where, getDocs, getDoc, addDoc, doc} from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import {InterviewSession, InterviewSessionBase} from "@/models/interview_session";
import { runTransaction } from "@firebase/firestore";

export async function getInterviewSessionId(userId: string, interviewId: string) {
    return await runTransaction(db, async (transaction) => {
        const q = query(
            collection(db, "interview_sessions"),
            where("user_id", "==", userId),
            where("interview_id", "==", interviewId)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        }

        // if no session found, create a new session and return its id:
        const sessionRef = doc(collection(db, "interview_sessions"));
        const newSessionBase: InterviewSessionBase = {
            user_id: userId,
            interview_id: interviewId,
            created_at: new Date()
        };

        transaction.set(sessionRef, newSessionBase);
        return sessionRef.id;
    });
}

export async function getInterviewSessionById(sessionId: string) {
    const sessionDocRef = doc(db, "interview_sessions", sessionId);
    const sessionDoc = await getDoc(sessionDocRef);

    if (sessionDoc.exists()) {
        return { id: sessionDoc.id, ...sessionDoc.data() } as InterviewSession;
    } else {
        throw new Error("Interview session not found");
    }
}
