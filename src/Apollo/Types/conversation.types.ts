//Sub types
import { UsersData } from "./user.types";

export interface MessageData {
    message: {
        text: string
    }
}
export interface ConversationData {
    id: number;
    user: UsersData;
    participant: UsersData;
    message: MessageData[];
    updated_at: Date;
}
export interface GetConversationData {
    getConversations: ConversationData[];
}

export interface CreateConversationData {
    createConversation: {
        success: boolean;
        message: string;
        conversationId: number;
    }
}

export interface DeleteConversationData {
    hideConversation: {
        success: boolean;
        message: string;
    }
}