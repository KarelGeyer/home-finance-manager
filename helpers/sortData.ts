import { Loan, Transaction } from "../types/types";

export interface Args {
  data: any[];
  dataType: "Loan" | "Transaction";
  chosenDate: string;
  filter: string;
}

export const sortData = ({
  data,
  dataType,
  chosenDate,
  filter,
}: Args): {
  dataByDate: Transaction[] | Loan[];
  dataBySort: Transaction[] | Loan[];
} => {
  //@ts-ignore
  const dataByDate: Transaction[] | Loan[] = data.filter(
    (item: Transaction | Loan) => {
      const itemYear = item.date.split("-")[0];
      const itemMonth = item.date.split("-")[1];

      const thisMonthsData =
        parseInt(itemYear) == parseInt(chosenDate.split("-")[0]) &&
        parseInt(itemMonth) == parseInt(chosenDate.split("-")[1]);

      return thisMonthsData;
    }
  );

  const filteredData = () => {
    if (filter === "Date") {
      return dataByDate.sort((item_1, item_2) => {
        const date_1: number = parseInt(item_1.date.split("-")[2]);
        const date_2: number = parseInt(item_2.date.split("-")[2]);
        return date_1 - date_2;
      });
    }

    if (filter === "Amount") {
      return dataByDate.sort((item_1, item_2) => {
        return item_1.sum - item_2.sum;
      });
    }

    if (filter === "User") {
      if (dataType === "Loan") {
        return dataByDate.sort((item_1, item_2) => {
          return item_1.creditor.name - item_2.creditor.name;
        });
      }

      if (dataType === "Transaction") {
        return dataByDate.sort((item_1, item_2) => {
          return item_1.person.name - item_2.person.name;
        });
      }
    }
  };

  return {
    dataByDate,
    dataBySort: filteredData(),
  };
};
