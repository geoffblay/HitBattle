import { Battle } from "../types";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

async function getBattle(id: string) {
    const db = getFirestore(app);
    const battlesRef = collection(db, 'battles');
    const querySnapshot = await getDocs(battlesRef);
    const results: Battle[] = [];

    querySnapshot.forEach((doc) => {
        results.push(doc.data() as Battle);
    });

    return results.find(battle => battle.id === id);
}

export { getBattle };