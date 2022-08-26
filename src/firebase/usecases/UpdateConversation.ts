/* eslint-disable no-useless-constructor */
import moment from "moment";

import firebase from "firebase/app";
import "firebase/firestore";

import CustomerChatRepository from "../repository/CustomerChatRepository";

import { Conversation } from "../../contexts/Chat/interfaces";
import { USER_TYPE } from "../types/UserType";

export default class UpdateConversation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly chatRepository: CustomerChatRepository) {}

  async execute(conversation: Conversation, message?: string): Promise<void> {
    const conversationReference = await this.chatRepository.getReference(
      conversation?.id
    );
    const conversationData = (await this.chatRepository.get(
      conversation?.id
    )) as Conversation;

    const newMessage = {
      date: +moment(),
      isRead: false,
      messageText: message,
      uid: conversation?.id || conversationData?.lastMessage?.uid,
      userType: USER_TYPE.BACKOFFICE,
    };

    const newConversation = {
      ...conversation,
      solved: false,
      messageHistory: firebase.firestore.FieldValue.arrayUnion(newMessage),
      lastMessage: newMessage,
    };

    conversationReference?.update(newConversation);
  }
}
