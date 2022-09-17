import { gql } from "@apollo/client";

export const DELETE_TRANSACTION = gql`
  mutation Delete($transaction: TransactionInput) {
    deleteTransaction(transaction: $transaction) {
      id
      name
      sum
      currency
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation Update($transaction: TransactionInput) {
    updateTransaction(transaction: $transaction) {
      id
      name
      category
      sum
      currency
      date
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation Create($transaction: TransactionInput) {
    createTransaction(transaction: $transaction) {
      name
      category
      sum
      currency
      date
      personId
    }
  }
`;
