/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import React from "react";
import {
  Conversation as IConversation,
  MessageProps,
} from "../../contexts/Chat/interfaces";

import ReceivedMessage from "./components/ReceivedMessage";
import SendedMessage from "./components/SendedMessage";

import { useFirestoreContext } from "../../contexts/Chat";

import SeparatorByDay from "./components/SeparatorByDay";
import Card from "../../components/Card";

import { USER_TYPE } from "../../constants/firesbase";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

import clientIcon from "../../assets/icons/person-face.svg";
import { ReactComponent as AirplaneIcon } from "../../assets/icons/airplane.svg";

function Conversation() {
  const { openedClientConversation, handleUpdateConversation } =
    useFirestoreContext();

  const [newMessage, setNewMessage] = React.useState("");
  const [conversation, setConversation] = React.useState<IConversation | null>(
    null
  );

  function handleAddFirebaseListener() {
    firebase
      .firestore()
      .collection("customerChat")
      .doc(String(openedClientConversation))
      .onSnapshot((doc) => setConversation(doc.data() as IConversation));
  }

  React.useEffect(() => {
    handleAddFirebaseListener();
  }, []);

  const groupedMessages = React.useMemo(
    () => customGroupBy(conversation?.messageHistory as MessageProps[], "date"),
    [conversation?.messageHistory]
  );

  function customGroupBy(messages: MessageProps[], key: string) {
    return (
      messages &&
      (messages || []).reduce((accumulator: any, arr: any) => {
        (accumulator[moment(arr[key]).format("DD/MM/YYYY")] =
          accumulator[moment(arr[key]).format("DD/MM/YYYY")] || []).push(arr);
        return accumulator;
      }, {})
    );
  }

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [conversation, groupedMessages]);

  function scrollToBottom() {
    if (messagesEndRef.current != null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleSendNewMessage() {
    handleUpdateConversation(conversation as IConversation, newMessage);
    setNewMessage("");
  }

  function handleSetNewMessage(event: React.FormEvent<HTMLInputElement>) {
    setNewMessage((event.target as HTMLInputElement).value);
  }

  if (!openedClientConversation)
    return (
      <div id="conversation-container">
        <p>Ainda não existe nenhuma conversa em aberto</p>
      </div>
    );

  return (
    <div id="conversation-container">
      <Card title="Cliente" iconNode={clientIcon}>
        <section className="messages-area">
          {Object.entries(groupedMessages || []).map(([date, listMessages]) => (
            <>
              <SeparatorByDay title={date} />

              {(listMessages as MessageProps[]).map(
                (messageItem: MessageProps) =>
                  messageItem.userType === USER_TYPE.CLIENT ? (
                    <ReceivedMessage
                      message={messageItem}
                      key={uuidv4()}
                    />
                  ) : (
                    <SendedMessage
                      message={messageItem}
                      key={uuidv4()}
                    />
                  )
              )}
            </>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <section className="new-message-area">
          <input
            value={newMessage}
            type="text"
            placeholder="Mensagem"
            onChange={(event) => handleSetNewMessage(event)}
          />
          <button type="button" onClick={() => handleSendNewMessage()}>
            <AirplaneIcon />
          </button>
        </section>
      </Card>
    </div>
  );
}
export default Conversation;
