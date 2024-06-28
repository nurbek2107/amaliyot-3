// hooks/useRegister.js
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import login from "../features/useSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

const useRegister = () => {
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);

    const registerWithEmail = async (email, password, displayName, photoURL) => {
        setIsPending(true);
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            if (password.length < 6) {
                throw new Error("Password should be at least 6 characters");
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName,
                photoURL,
            });

            dispatch(
                login({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
            );

            toast.success(`Welcome, ${displayName}!`);
            setIsPending(false);
        } catch (error) {
            toast.error(error.message);
            setIsPending(false);
        }
    };

    return { registerWithEmail, isPending };
};

export { useRegister };
