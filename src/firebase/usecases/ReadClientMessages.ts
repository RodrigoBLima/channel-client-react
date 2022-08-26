/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-constructor */
import CustomerChatRepository from "../repository/CustomerChatRepository";

import "firebase/firestore";

import { Conversation } from "../../contexts/Chat/interfaces";
import { USER_TYPE } from "../types/UserType";

export default class ReadClientMessages {
  // eslint-disable-next-line no-empty-function
  constructor(readonly chatRepository: CustomerChatRepository) {}

  async execute(id: string): Promise<void> {
    const conversationReference = await this.chatRepository.getReference(id);
    const conversationData = (await this.chatRepository.get(
      id
    )) as Conversation;

    conversationData?.messageHistory?.forEach((message) => {
      if (message.userType === USER_TYPE.CUSTOMER) {
        message.isRead = true;
      }
      return message;
    });

    if (conversationData?.lastMessage?.userType === USER_TYPE.CUSTOMER) {
      conversationData.lastMessage.isRead = true;
    }

    const upgradedConversation = {
      ...conversationData,
    };

    conversationReference?.update(upgradedConversation);
  }
}
