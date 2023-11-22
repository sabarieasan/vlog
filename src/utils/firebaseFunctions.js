import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase-config";

// get users data
export const getUserData = async () => {
  const users = await getDocs(query(collection(db, "users")));

  return users.docs.map((doc) => doc.data());
};
