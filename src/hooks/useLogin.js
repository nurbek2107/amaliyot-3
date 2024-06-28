import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import  login  from "../features/useSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { useState } from "react";

const useLogin = () => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    const signInWithEmail = async (email, password) => {
        setIsPending(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            dispatch(login(user));
            toast.success(`Welcome back ${user.displayName}!`);
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error("Password or Email is incorrect!");
            setIsPending(false);
        }
    };

    return { signInWithEmail, isPending };
};

export { useLogin };