import { Battle } from "../types";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

async function getUserResults(user: any) {
    const db = getFirestore(app);
    const battlesRef = collection(db, 'users', user.uid, 'battles');

    const querySnapshot = await getDocs(battlesRef);
    const results: Battle[] = [];

    querySnapshot.forEach((doc) => {
        results.push(doc.data() as Battle);
    });

    return results;
}

export { getUserResults };