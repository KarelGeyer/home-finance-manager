import { gql } from "@apollo/client";

export const CREATE_LOAN = gql`
  mutation Mutation($loan: LoanInput) {
    createLoan(loan: $loan) {
      id
      name
      debtorEmail
    }
  }
`;

export const UPDATE_LOAN = gql`
  mutation Update($loan: LoanInput) {
    updateLoan(loan: $loan) {
      id
    }
  }
`;

export const DELETE_LOAN = gql`
  mutation Delete($deleteLoanId: String) {
    deleteLoan(id: $deleteLoanId) {
      name
      sum
      id
    }
  }
`;
