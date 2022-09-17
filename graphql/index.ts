import { changeLoan, createLoan, deleteLoan } from "./functions/loans";
import {
  createTransaction,
  changeTransaction,
  deleteTransaction,
} from "./functions/transactions";
import { CREATE_LOAN, DELETE_LOAN, UPDATE_LOAN } from "./mutations/loans";
import {
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
} from "./mutations/transactions";
import {
  LOGIN,
  AUTHENTICATE,
  UPDATE_USER,
  DELETE_USER,
} from "./mutations/users";
import { GET_LOANS, GET_TEAM_LOANS } from "./queries/loans";
import {
  GET_TRANSACTIONS,
  GET_TEAM_TRANSACTIONS,
} from "./queries/transactions";
import { GET_TEAM, GET_USER, GET_TEAM_IDS } from "./queries/users";

export {
  // MUTATIONS
  LOGIN,
  AUTHENTICATE,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
  CREATE_LOAN,
  UPDATE_LOAN,
  DELETE_LOAN,
  UPDATE_USER,
  DELETE_USER,

  // QUERIES
  GET_USER,
  GET_TEAM,
  GET_TEAM_IDS,
  GET_TRANSACTIONS,
  GET_TEAM_TRANSACTIONS,
  GET_LOANS,
  GET_TEAM_LOANS,

  // FUNCTIONS
  changeLoan,
  createLoan,
  deleteLoan,
  createTransaction,
  changeTransaction,
  deleteTransaction,
};
