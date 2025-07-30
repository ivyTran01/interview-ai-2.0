import { signInWithPopup, signOut } from "firebase/auth";
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

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Sign-Out Error:", error);
        throw error;
    }
}