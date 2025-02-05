interface MessageType {
  id?: number;
  content?: string;
  conversation?: string;
  sentBy?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

export default MessageType;
