import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

import  login  from "../features/useSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { useState } from "react";

const useRegister = () => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    const registerWithEmail = async (email, password, displayName, photoURL) => {
        setIsPending(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            });
            const user = userCredential.user;
            dispatch(login(user));
            toast.success("Welcome");
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setIsPending(false);
        }
    };

    return { registerWithEmail, isPending };
};

export { useRegister };