import { ApolloCache } from "@apollo/client";
import {
  ApolloQueryResult,
  DefaultContext,
  OperationVariables,
} from "@apollo/client/core/types";
import { MutationFunctionOptions } from "@apollo/client/react/types/types";
import { TransactionDetails } from "../../types/types";

interface BaseArgs {
  transactionState: TransactionDetails;
  teamTransactionsRefetch: (
    variables?: Partial<{
      ids: string | string[];
    }>
  ) => Promise<ApolloQueryResult<any>>;
}

interface CreateArgs extends BaseArgs {
  createTransactionMutation: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<any>;
}

interface ChangeArgs extends BaseArgs {
  updateTransactionMutation: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<any>;
}

interface DeleteArgs extends BaseArgs {
  deleteMutation: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<any>;
}

export const createTransaction = ({
  transactionState,
  createTransactionMutation,
  teamTransactionsRefetch,
}: CreateArgs): void => {
  const { id, name, currency, category, sum, personId, date } =
    transactionState;
  if (name == "" || id == "" || category == "" || sum == 0) {
    return;
  }

  const token = localStorage.getItem("ref_sh_tkn");
  if (!token) {
    // THIS WILL NEED TO HAVE SOME LOGIC
    console.log("missing token");
  }

  createTransactionMutation({
    variables: {
      transaction: {
        id,
        name,
        category,
        sum,
        date,
        currency,
        personId,
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    },
  });

  teamTransactionsRefetch();
};

export const changeTransaction = ({
  transactionState,
  updateTransactionMutation,
  teamTransactionsRefetch,
}: ChangeArgs): void => {
  const { id, name, currency, category, sum, date } = transactionState;
  if (name == "" || id == "" || category == "" || sum == 0) {
    return;
  }

  const token = localStorage.getItem("ref_sh_tkn");
  if (!token) {
    // THIS WILL NEED TO HAVE SOME LOGIC
    console.log("missing token");
  }

  updateTransactionMutation({
    variables: {
      transaction: {
        id,
        name,
        category,
        sum,
        date,
        currency,
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    },
  });

  teamTransactionsRefetch();
};

export const deleteTransaction = ({
  transactionState,
  deleteMutation,
  teamTransactionsRefetch,
}: DeleteArgs) => {
  const token = localStorage?.getItem("ref_sh_tkn");
  const { id, name, category, sum, currency } = transactionState;

  if (!token) {
    // THIS WILL NEED TO HAVE SOME LOGIC
    console.log("missing token");
  }

  deleteMutation({
    variables: {
      transaction: {
        id,
        name,
        category,
        sum,
        currency,
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    },
  });

  teamTransactionsRefetch();
};
