/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  Conversation,
  FirestoreProviderProps,
  FirestoreStore,
} from "./interfaces";
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery";

import FirestoreAdapter from "../../firebase/database/FirestoreAdapter";
import CustomerChatRepository from "../../firebase/repository/CustomerChatRepository";
import UpdateConversation from "../../firebase/usecases/UpdateConversation";

const FirestoreContext = createContext<FirestoreStore | null>(null);

function FirestoreProvider({ children }: FirestoreProviderProps) {
  const [openedClientConversation, setOpenedClientConversation] =
    React.useState<string | null>("");

  const chatReference = firebase.firestore().collection("customerChat");

  const allConversations = useFirestoreQuery(chatReference);

  const connection = new FirestoreAdapter();
  const chatRepository = new CustomerChatRepository(connection);

  const updateConversation = new UpdateConversation(chatRepository);

  async function handleUpdateConversation(
    conversation: Conversation,
    message?: string
  ) {
    await updateConversation.execute(conversation, message);
  }

  function handleSetClientConversation(conversation: string) {
    setOpenedClientConversation(conversation);
  }

  const firestoreContextValues: FirestoreStore = React.useMemo(
    () => ({
      allConversations,
      openedClientConversation,
      handleUpdateConversation,
      handleSetClientConversation,
    }),
    [allConversations, openedClientConversation]
  );

  return (
    <FirestoreContext.Provider value={firestoreContextValues}>
      {children}
    </FirestoreContext.Provider>
  );
}

const useFirestoreContext = () =>
  useContext(FirestoreContext) as FirestoreStore;

export { FirestoreContext, useFirestoreContext, FirestoreProvider };
