import { ApolloCache } from "@apollo/client";
import {
  ApolloQueryResult,
  DefaultContext,
  OperationVariables,
} from "@apollo/client/core/types";
import { MutationFunctionOptions } from "@apollo/client/react/types/types";
import { LoanDetails } from "../../types/types";

interface BaseArgs {
  loanState: LoanDetails;
  teamLoansRefetch: (
    variables?: Partial<{
      ids: string | string[];
    }>
  ) => Promise<ApolloQueryResult<any>>;
}

interface ChangeArgs extends BaseArgs {
  updateLoanMutation: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >
  ) => Promise<any>;
}

interface CreateArgs extends BaseArgs {
  createLoanMutation: (
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

export const changeLoan = ({
  loanState,
  updateLoanMutation,
  teamLoansRefetch,
}: ChangeArgs): void => {
  const token = localStorage.getItem("ref_sh_tkn");
  const { id, name, currency, sum, personId, date, debtorEmail, isPayed } =
    loanState;

  if (sum == 0) {
    return;
  }

  if (token) {
    // THIS WILL NEED TO HAVE SOME LOGIC
    console.log("missing token");
  }

  updateLoanMutation({
    variables: {
      loan: {
        id,
        name,
        debtorEmail,
        isPayed,
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

  teamLoansRefetch();
};

export const createLoan = ({
  loanState,
  createLoanMutation,
  teamLoansRefetch,
}: CreateArgs): void => {
  const token = localStorage.getItem("ref_sh_tkn");
  const { id, name, currency, sum, personId, date, debtorEmail, isPayed } =
    loanState;
  if (sum == 0) {
    return;
  }

  if (token) {
    // THIS WILL NEED TO HAVE SOME LOGIC
    console.log("missing token");
  }
  createLoanMutation({
    variables: {
      loan: {
        id,
        name,
        debtorEmail,
        isPayed,
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

  teamLoansRefetch();
};

export const deleteLoan = ({
  loanState,
  deleteMutation,
  teamLoansRefetch,
}: DeleteArgs) => {
  const token = localStorage?.getItem("ref_sh_tkn");
  const { id, name, currency, sum } = loanState;

  deleteMutation({
    variables: {
      transaction: {
        id,
        name,
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

  teamLoansRefetch();
};
