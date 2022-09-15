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
        loans {
          name
          sum
          currency
          date
          creditorEmail
          debtorEmail
          creditor {
            name
            surname
            email
          }
          debtor {
            name
            surname
            email
          }
        }
      }
    }
  }
`;
