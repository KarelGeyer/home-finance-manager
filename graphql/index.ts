import {
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
} from "./mutations/transactions";
import { LOGIN, AUTHENTICATE, UPDATE_USER } from "./mutations/users";
import { GET_TRANSACTIONS } from "./queries/transactions";
import { GET_TEAM, GET_USER } from "./queries/users";

export {
  // MUTATIONS
  LOGIN,
  AUTHENTICATE,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
  UPDATE_USER,

  // QUERIES
  GET_USER,
  GET_TEAM,
  GET_TRANSACTIONS,
};
