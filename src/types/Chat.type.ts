export type ConversationType = {
  id?: string;
  user_1?: string;
  user_2?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type MessageType = {
  id?: number;
  content?: string;
  conversation?: string;
  sender?: string;
  created_at?: Date;
}