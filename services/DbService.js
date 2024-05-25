// All of our Firestore functionality
import { collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

//Create a new list item function
export const createNewBucketItem = async (item) => {
    try {
        //docRef - our reference to our newly created document (brand new with a self-generated ID)
        const docRef = await addDoc(collection(db, "items"), item);
        console.log("Document written with ID: ", docRef.id);
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }
}

//Get All list items function
export const getMyBucketList = async () => {
    //getDocs - get all the docs in our collection (optional where that you can add)

    var allItems = [] //array that we want to return

    //making a custom query to add order by or limit to our querying of data
    var q = query( collection(db, "items"), orderBy('priority', "desc") )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

        // console.log(doc.id, " => ", doc.data());

        allItems.push({...doc.data(), id: doc.id}) //push each docs' data to the array I wnat to return

    });

    // console.log(allItems)
    return allItems

    //can't just use query snapshot as the array of items - need to access .data()

    //Delete an item from database
}

