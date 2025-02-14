interface MessageType {
  id?: number;
  content?: string;
  conversation?: string;
  sentBy?: string;
  createdAt?: Date;
}

export default MessageType;
