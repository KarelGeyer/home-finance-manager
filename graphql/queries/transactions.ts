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
        isLoan
        personId
        person {
          name
          surname
        }
        id
      }
      team {
        transactions {
          name
          category
          sum
          currency
          date
          isLoan
          personId
          person {
            name
            surname
          }
          id
        }
      }
    }
  }
`;
