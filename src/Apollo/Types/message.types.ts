export interface MessageData {
    id: number;
    receiver: {
        id: number;
    };
    sender: {
        id: number;
    };
    message: {
        text: string;
        image: string;
    }
    created_at: Date;
}

export interface GetMessagesData {
    getMessages: MessageData[]
}