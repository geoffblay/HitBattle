import { Battle, Artist } from "../types";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

async function getCommunityResults(artist1: Artist, artist2: Artist) {
    const db = getFirestore(app);
    const battlesRef = collection(db, 'battles');

    const q1 = query(
        battlesRef, 
        where('winner.id', '==', artist1.id),
        where('loser.id', '==', artist2.id)
    );

    const q2 = query(
        battlesRef, 
        where('winner.id', '==', artist2.id),
        where('loser.id', '==', artist1.id)
    );

    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const results: Battle[] = [];

    querySnapshot1.forEach((doc) => {
        results.push(doc.data() as Battle);
    });

    querySnapshot2.forEach((doc) => {
        results.push(doc.data() as Battle);
    });

    return results;
}

export { getCommunityResults };