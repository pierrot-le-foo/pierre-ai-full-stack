export interface ChatMessage {
  content: string;
  type: ChatMessageType;
}

export enum ChatMessageType {
  AI = "AI",
  Human = "Human",
  System = "System",
}
