import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      success
      message
      email
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtp($verifyInput: VerifyInput!) {
    verifyOtp(verifyInput: $verifyInput) {
      success
      token
      expire
      message
    }
  }
`;

export const RESEND_OTP = gql`
  mutation resendOtp($resendInput: ResendInput!) {
    resendOtp(resendInput: $resendInput) {
      success
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      message
      token
      expire
    }
  }
`;

export const GET_USERS_LIST = gql`
  query getUsers($userPrams: UserPrams!) {
    getUsers(userPrams: $userPrams) {
      id
      firstName
      lastName
      last_seen
      avatar {
        url
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query getUser {
    getUser {
      id
      firstName
      lastName
      avatar {
        url
      }
      userName
      email
      last_seen
    }
  }
`;