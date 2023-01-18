import { gql } from "@apollo/client";

export const GET_CONVERSATION_LIST = gql`
query getConversations {
    getConversations {
      id
      user {
        id
        firstName
        lastName
        last_seen
        avatar {
          url
        }
      }
      participant {
        id
        firstName
        lastName
        last_seen
        avatar {
          url
        }
      }
      message {
        message {
          text
        }
      }
      updated_at
    }
}
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation($conversationInput: ConversationInput!) {
    createConversation(conversationInput: $conversationInput) {
      success
      message
      conversationId
    }
  }
`;

export const DELETE_CONVERSATION = gql`
  mutation hideConversation($hideConversationInput: HideConversationInput!) {
    hideConversation(hideConversationInput: $hideConversationInput) {
      success
      message
    }
  }
`;