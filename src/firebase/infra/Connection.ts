export interface Connection {
  initialize: (collection: string) => void;  
  unsubscribe: (collection: string) => void;  
}