/* eslint-disable no-useless-constructor */
import { Conversation } from "../../contexts/Chat/interfaces";
import CustomerChatRepository from "../repository/CustomerChatRepository";

export default class GetChatMessages {
  // eslint-disable-next-line no-empty-function
  constructor(readonly chatRepository: CustomerChatRepository) {}

  async execute(id: string): Promise<Conversation> {
    const messages = (await this.chatRepository.get(id)) as Conversation;

    return messages;
  }
}
