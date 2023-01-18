import { gql } from "@apollo/client";

export const GET_MESSAGE_LIST = gql`
query getMessages($conversation: Float!) {
    getMessages(conversation: $conversation) {
      id
      receiver {
        id
      }
      sender {
        id
      }
      message {
        text
        image
      }
      created_at
    }
}
`;