import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
export const useCollection = (collectionName, whereOptions) => {
    const [data, setData] = useState(null);

    const q = query(collection(db, collectionName), where(...whereOptions));

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({ id: doc.id, ...doc.data() });
            });
            setData(todos);
        });
    }, [collectionName]);

    return { data };
};