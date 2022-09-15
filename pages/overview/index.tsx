import Grid from "@mui/material/Grid";

import {
  GridItemPieGraph,
  GridItemIconCard,
  BoxPieGraph,
} from "../../styles/pages/overview";
import { Heading, IconCard, PieGraph } from "../../components";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS, GET_USER } from "../../graphql";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "../../helpers/texts";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

export interface Transaction {
  name: string;
  person: {
    name: string;
    surname: string;
  };
  category: string;
  sum: number;
  date: string;
  currency: string;
  isLoan?: boolean;
  creditor?: {
    name: string;
    surname: string;
  };
}

export interface Loan {
  name: string;
  sum: number;
  date: string;
  currency: string;
  creditorEmail: string;
  debtorEmail: string;
  creditor?: {
    email: string;
    name: string;
    surname: string;
  };
  person?: {
    email: string;
    name: string;
    surname: string;
  };
}

const OverView: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [team, setTeam] = useState<any>();
  const [loans, setLoans] = useState<Loan[]>();

  const {
    chosenDate,
    userEmail,
    sortFilter,
  }: { chosenDate: string; userEmail: string; sortFilter: string } =
    useSelector((state) => state.baseData);

  const {
    loading: isFetchingTransactions,
    error: transactionsError,
    data: transactionsData,
    refetch: transactionsRefetch,
  } = useQuery(GET_TRANSACTIONS, {
    variables: {
      email: userEmail,
    },
  });

  const {
    loading: isFetchingUser,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });

  const loanData =
    loans &&
    Object.entries(
      loans
        .filter((loan) => {
          const loanYear = loan?.date.split("-")[0];
          const loanMonth = loan?.date.split("-")[1];

          const thisMonthTransaction =
            parseInt(loanYear) == parseInt(chosenDate.split("-")[0]) &&
            parseInt(loanMonth) == parseInt(chosenDate.split("-")[1]);

          return thisMonthTransaction;
        })
        .reduce((group, loan) => {
          const { creditor } = loan;
          const creaditorName = `${creditor.name} ${creditor.surname}`;
          group[creaditorName] = group[creaditorName] ?? [];
          group[creaditorName].push(loan);
          return group;
        }, [])
    );

  const cleanTransactions: Transaction[] =
    transactions &&
    transactions
      .filter((transaction) => !transaction.isLoan)
      .filter((transaction) => {
        const transactionYear = transaction.date.split("-")[0];
        const transactionMonth = transaction.date.split("-")[1];

        const thisMonthTransaction =
          parseInt(transactionYear) == parseInt(chosenDate.split("-")[0]) &&
          parseInt(transactionMonth) == parseInt(chosenDate.split("-")[1]);

        return thisMonthTransaction;
      });

  const thisloans =
    transactions &&
    Object.entries(
      transactions
        .filter(
          (transaction) => transaction.isLoan && transaction.creditor !== null
        )
        .map((transaction) => {
          return {
            creditor: `${transaction.creditor?.name} ${transaction.creditor?.surname}`,
            date: transaction.date,
            debtor: `${transaction.person?.name} ${transaction.person?.surname}`,
            sum: transaction.sum,
            name: transaction.name,
          };
        })
        .reduce((group, item) => {
          const { debtor } = item;
          group[debtor] = group[debtor] ?? [];
          group[debtor].push(item);
          return group;
        }, [])
    );

  const usersTotal =
    team &&
    team.map((user) => {
      return {
        userName: `${user.name} ${user.surname}`,
        total: user.transactions
          .filter((transaction) => !transaction.isLoan)
          .filter((transaction) => {
            const transactionYear = transaction.date.split("-")[0];
            const transactionMonth = transaction.date.split("-")[1];

            const thisMonthTransaction =
              parseInt(transactionYear) == parseInt(chosenDate.split("-")[0]) &&
              parseInt(transactionMonth) == parseInt(chosenDate.split("-")[1]);

            return thisMonthTransaction;
          })
          .reduce((total, transaction) => {
            return total + transaction.sum;
          }, 0),
      };
    });

  const sortedData: Transaction[] = useMemo(() => {
    if (cleanTransactions) {
      if (sortFilter === "Date") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          const date_1: number = parseInt(transaction_1.date.split("-")[2]);
          const date_2: number = parseInt(transaction_2.date.split("-")[2]);
          return date_1 - date_2;
        });
      }

      if (sortFilter === "Amount") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          return transaction_1.sum - transaction_2.sum;
        });
      }

      if (sortFilter === "User") {
        return cleanTransactions.sort((transaction_1, transaction_2) => {
          //@ts-ignore
          return transaction_1.person.name - transaction_2.person.name;
        });
      }
    }
  }, [sortFilter, cleanTransactions]);

  const pieGraphData =
    sortedData &&
    Object.entries(
      sortedData
        .map((transaction) => {
          return {
            transaction: transaction.category,
            sum: transaction.sum,
          };
        })
        .reduce((group, item) => {
          const { transaction } = item;
          group[transaction] = group[transaction] ?? [];
          group[transaction].push(item.sum);
          return group;
        }, [])
    ).map((category) => {
      return {
        category: category[0],
        total: category[1].reduce((total, sum) => {
          return total + sum;
        }, 0),
      };
    });

  const iconsData =
    pieGraphData &&
    CATEGORIES.map((category) => {
      const existingCategory = pieGraphData.filter((item) => {
        return item.category === category;
      });

      if (existingCategory.length === 0) {
        return {
          category: category,
          total: 0,
        };
      } else {
        return {
          category: category,
          total: existingCategory[0].total,
        };
      }
    });

  useEffect(() => {
    transactionsRefetch();
    userRefetch();

    let transactions: Transaction[] = [];
    let loans: Loan[] = [];

    const teamData = transactionsData?.user.team;
    teamData &&
      teamData.forEach((user) => {
        user.transactions.forEach((transaction) => {
          transactions.push(transaction);
        });
        user.loans.forEach((transaction) => {
          loans.push(transaction);
        });
      });

    setTransactions(transactions);
    setLoans(loans);
    setTeam(teamData);
  }, [transactionsData, transactionsRefetch, userEmail, userData]);

  return (
    <>
      <GridItemPieGraph item xs={12} md={7}>
        <BoxPieGraph>
          {pieGraphData && (
            <PieGraph
              labels={pieGraphData.map((item) => item.category)}
              data={{
                label: "This month",
                datasets: pieGraphData.map((item) => item.total),
              }}
            />
          )}
        </BoxPieGraph>
      </GridItemPieGraph>

      <GridItemIconCard item xs={12} md={5}>
        <Grid container>
          {iconsData &&
            iconsData.map((item) => {
              return (
                <IconCard
                  category={item.category}
                  value={item.total}
                  key={item.category}
                />
              );
            })}
        </Grid>
      </GridItemIconCard>

      <GridItemIconCard item xs={12} md={2}>
        <Grid container sx={{ minWidth: "450px", maxHeight: "160px" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 450 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="right">Sum </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersTotal &&
                  usersTotal.map((user) => {
                    return (
                      <TableRow
                        key={user.userName}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {user.userName}
                        </TableCell>
                        <TableCell align="right">{user.total} EUR</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </GridItemIconCard>

      <GridItemIconCard
        item
        xs={12}
        md={5}
        sx={{
          marginLeft: "0px",
          minWidth: "100%",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Heading variant="h2">Loans</Heading>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {loanData &&
                loanData.map((loan) => {
                  return (
                    <Row credtior={loan[0]} loans={loan[1]} key={loan[0]} />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </GridItemIconCard>
    </>
  );
};

function Row({ credtior, loans }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ width: "100%" }}>
          {credtior}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Debtor</TableCell>
                    <TableCell>Debtor Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Sum</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.date}>
                      <TableCell component="th" scope="row">
                        {`${loan.debtor.name} ${loan.debtor.surname}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {loan.debtor.email}
                      </TableCell>
                      <TableCell>{loan.name}</TableCell>
                      <TableCell align="right">{loan.sum}</TableCell>
                      <TableCell align="right">{loan.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OverView;
