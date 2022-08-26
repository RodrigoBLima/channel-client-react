import FirestoreAdapter from "../database/FirestoreAdapter";

export default class CustomerChatRepository {
  chatReference;

  constructor(readonly connection: FirestoreAdapter) {
    this.connection = connection;
    this.chatReference = this.connection.initialize("customerChat");
  }

  async getAll() {
    const chatReference = this.connection.initialize("customerChat");

    const collection = await chatReference.get();

    const documents = collection.docs.map((doc) => doc.data());

    return documents;
  }

  async get(conversation: string) {
    const collection = await this.chatReference.doc(String(conversation)).get();
    const data = collection.data();

    return data;
  }

  async getReference(conversation: string) {
    const collection = this.chatReference.doc(String(conversation));

    return collection;
  }
}
