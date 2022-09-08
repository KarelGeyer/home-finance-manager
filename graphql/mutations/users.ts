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
