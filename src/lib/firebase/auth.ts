import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase/firebaseConfig";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Logged in user:", user);
        return user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};
