import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import login from "../features/useSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

const useLogin = () => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    const signInWithEmail = async (email, password) => {
        setIsPending(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch(login(user));
            toast.success(`Welcome back ${user.displayName || 'User'}!`);
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error("Password or Email is incorrect!");
            setIsPending(false);
            throw error; // Rethrow the error to handle in the UI if needed
        }
    };

    const signInWithGoogle = async () => {
        setIsPending(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch(login(user));
            toast.success(`Welcome back ${user.displayName || 'User'}!`);
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error("Error signing in with Google. Please try again.");
            setIsPending(false);
            throw error; // Rethrow the error to handle in the UI if needed
        }
    };

    return { signInWithEmail, signInWithGoogle, isPending };
};

export { useLogin };
