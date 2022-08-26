/* eslint-disable no-useless-constructor */
import { Conversation } from "../../contexts/Chat/interfaces";
import CustomerChatRepository from "../repository/CustomerChatRepository";

export default class GetAllMessages {
  // eslint-disable-next-line no-empty-function
  constructor(readonly chatRepository: CustomerChatRepository) {}

  async execute(): Promise<Conversation[]> {
    const messages =
      (await this.chatRepository.getAll()) as unknown as Conversation[];

    return messages;
  }
}
