import firebaseApp from "./Firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uId) {
  const res = await db.collection("admins").doc(uId).get();
  return res.exists;
}

export const reAuth = (password) => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );

  return user.reauthenticateWithCredential(credentials);
};
