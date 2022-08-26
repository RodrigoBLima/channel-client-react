export interface MessageProps {
  date: number;
  isRead: boolean;
  messageText: string;
  userType: number;
  uid: string;
  type: string;
}

export interface Conversation {
  id: string;
  solved: boolean;
  clientName: string;
  messageHistory: MessageProps[];
  lastMessage: MessageProps;
}

export interface FirestoreStore {
  allConversations: Conversation[];
  openedClientConversation: string | null;
  handleUpdateConversation: (
    conversation: Conversation,
    message: string
  ) => void;
  handleSetClientConversation: (conversation: string) => void;
}

export interface FirestoreProviderProps {
  children: any;
}
