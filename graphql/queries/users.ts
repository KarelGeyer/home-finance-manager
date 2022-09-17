import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($email: String) {
    user(email: $email) {
      id
      name
      surname
      email
      phoneNumber
      password
      currency
      accountID
      teamID
      refreshToken
    }
  }
`;

export const GET_TEAM = gql`
  query Query($email: String) {
    user(email: $email) {
      teamID
      team {
        name
        surname
        email
        phoneNumber
        currency
      }
    }
  }
`;

export const GET_TEAM_IDS = gql`
  query Query($email: String) {
    user(email: $email) {
      team {
        accountID
      }
    }
  }
`;
