import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query Query($email: String) {
    user(email: $email) {
      transactions {
        name
        category
        sum
        currency
        date
        personId
        person {
          name
          surname
        }
        id
      }
      team {
        name
        surname
        transactions {
          id
          name
          category
          sum
          currency
          date
          personId
          person {
            name
            surname
          }
        }
      }
    }
  }
`;

export const GET_TEAM_TRANSACTIONS = gql`
  query Query($ids: [String]!) {
    teamTransactions(ids: $ids) {
      name
      category
      personId
      sum
      currency
      date
      teamId
      id
      person {
        name
        surname
      }
    }
  }
`;
