import { createContext } from "react";

//Types
import { MessageData } from "Apollo/Types/message.types";

//Types
interface Context {
    selected: number | null;
    setSelected: Function;
    messages: MessageData[];
    setMessages: Function;
}

export const ConversationCtx = createContext<Context>({
    selected: null,
    setSelected: () => null,
    messages: [],
    setMessages: () => []
})