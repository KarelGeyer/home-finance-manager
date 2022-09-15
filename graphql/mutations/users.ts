import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($user: LoginCredentials!) {
    login(user: $user) {
      refreshToken
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation RefreshToken($email: String!) {
    refreshToken(email: $email) {
      refreshToken
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput) {
    updateUser(user: $user) {
      name
      surname
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($user: UserInput) {
    deleteUser(user: $user) {
      id
      name
      surname
    }
  }
`;
