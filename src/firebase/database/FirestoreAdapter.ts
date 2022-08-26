import firebase from "firebase/app";
import { Connection } from "../infra/Connection";

import "firebase/firestore";

export default class FirestoreAdapter implements Connection {
  db = firebase.firestore();

  unsubscribe = (collection: string) => {
    const unsub = this.db.collection(collection).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return data;
    });

    return unsub;
  };

  initialize = (collection: string) => {
    const chatRef = this.db.collection(collection);
    return chatRef;
  };
}
