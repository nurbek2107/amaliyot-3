import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
export const useCollection = (collectionName, whereOptions,orderOptions) => {
    const [data, setData] = useState(null);

    const q = query(collection(db, collectionName), where(...whereOptions),orderBy(...orderOptions));

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