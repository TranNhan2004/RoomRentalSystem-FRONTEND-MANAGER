interface ConversationType {
  id?: string;
  user1?: string;
  user2?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export default ConversationType;