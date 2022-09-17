import { gql } from "@apollo/client";

export const GET_LOANS = gql`
  query Query($email: String) {
    user(email: $email) {
      loans {
        id
        name
        sum
        currency
        date
        isPayed
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
      team {
        loans {
          id
          name
          sum
          currency
          date
          creditorEmail
          isPayed
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

export const GET_TEAM_LOANS = gql`
  query TeamLoans($ids: [String]!) {
    teamLoans(ids: $ids) {
      id
      name
      sum
      currency
      date
      creditorEmail
      creditor {
        name
        surname
        email
        currency
      }
      debtorEmail
      personId
      isPayed
      debtor {
        surname
        name
        email
        currency
      }
    }
  }
`;
