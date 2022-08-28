import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($user: LoginCredentials!) {
    login(user: $user) {
      accessToken
    }
  }
`;
