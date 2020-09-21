import firebaseApp from "./Firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uId) {
  const res = await db.collection("admins").doc(uId).get();
  return res.exists;
}
