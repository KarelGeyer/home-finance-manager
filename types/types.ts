import { CURRENCY } from "./enums";

export interface Transaction {
  name: string;
  person: {
    name: string;
    surname: string;
  };
  sum: number;
  category: string;
  currency: string;
  id: string;
  date: string;
}

export interface Loan {
  name: string;
  creditor: {
    name: string;
    surname: string;
  };
  debtor: {
    name: string;
    surname: string;
  };
  sum: number;
  currency: string;
  id: string;
  date: string;
  isPayed: boolean;
  debtorEmail: string;
  creditorEmail: string;
}

export interface TransactionDetails {
  id: string;
  name: string;
  category: string;
  sum: number;
  currency: CURRENCY;
  isLoan?: boolean;
  date?: string;
  personId: string;
}

export interface LoanDetails {
  id: string;
  name: string;
  sum: number;
  currency: CURRENCY;
  date: string;
  creditorEmail: string;
  debtorEmail: string;
  personId: string;
  isPayed: boolean;
}

export interface BaseDataState {
  userEmail: string;
  chosenDate: string;
  personFilter: string;
  sortFilter: "Date" | "Amount" | "User";
  transactionTypeFilter: "All" | "Transactions" | "Loans";
  teamIds: string[];
}
