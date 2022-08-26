/* eslint-disable no-useless-constructor */
import { Conversation } from "../../contexts/Chat/interfaces";
import CustomerChatRepository from "../repository/CustomerChatRepository";

export default class ResolveConversation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly chatRepository: CustomerChatRepository) {}

  async execute(conversation: Conversation, solved: boolean): Promise<void> {
    const newConversation = { ...conversation, solved };
    const conversationReference = await this.chatRepository.getReference(
      conversation?.id
    );

    conversationReference?.update(newConversation);
  }
}
