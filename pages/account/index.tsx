import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_USER, UPDATE_USER } from "../../graphql";
import { useMutation, useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {
  AccountInfo,
  AccountInfoProps,
  CustomButton,
  CustomInput,
  CustomSelect,
  Heading,
  Paragraph,
} from "../../components";
import { ACCOUNT_LABELS } from "../../helpers/texts";
import { FlexBox, Form } from "../../styles/global";
import { DELETE_USER } from "../../graphql/mutations/users";
import { NextRouter, useRouter } from "next/router";

interface UserInfo {
  information: string;
  label: string | number;
}

const Account: React.FC = () => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [userUpdate, setUserUpdate] = useState<any>({
    name: "",
    surname: "",
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
    currency: "",
  });

  const { userEmail }: { userEmail: string } = useSelector(
    (state) => state.baseData
  );

  const router: NextRouter = useRouter();

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

  const [updateMutation, { data: updateData, error: updateError }] =
    useMutation(UPDATE_USER);
  const [deleteMutation, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER);

  const userInfo: UserInfo[] =
    userData &&
    Object?.keys(userData.user).map(
      (label: string | number, index: number): UserInfo => {
        if (userData) {
          return {
            information: String(Object?.values(userData.user)[index]),
            label: String(Object?.keys(userData.user)[index]),
          };
        }
      }
    );

  useEffect(() => {
    userRefetch();
    if (userData) {
      const { user } = userData;
      setUserUpdate({
        ...userUpdate,
        name: user.name,
        surname: user.surname,
        email: user.email,
        newEmail: "",
        password: "",
        newPassword: "",
        currency: user.currency,
      });
    }
  }, [userRefetch, userEmail, userData]);

  const handleAccountUpdate = () => {
    const { name, surname, newEmail, password, newPassword, currency } =
      userUpdate;
    const token = localStorage?.getItem("ref_sh_tkn");
    if (!token) {
      // THIS WILL NEED TO HAVE SOME LOGIC
      console.log("missing token");
    }
    updateMutation({
      variables: {
        user: {
          name,
          surname,
          email: userEmail,
          newEmail: newEmail,
          password,
          newPassword,
          currency,
        },
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      },
      refetchQueries: [{ query: GET_USER }],
    });
  };

  const deleteAccount = () => {
    const { user } = userData;
    const token = localStorage?.getItem("ref_sh_tkn");

    deleteMutation({
      variables: {
        user: {
          name: user.name,
          surname: user.surname,
          email: userEmail,
          password: password,
          currency: user.currency,
        },
      },
      context: {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      },
    });

    router.push("/login");
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box component="div">
          <Heading variant="h3">My Account</Heading>
          {userData &&
            userInfo?.map((information: AccountInfoProps, index: number) => (
              <AccountInfo
                label={information.label}
                information={information.information}
                key={index}
              />
            ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <FlexBox component="div">
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            btnColor="primary"
            onClick={() => {
              setShowDelete(false);
              setShowUpdate(!showUpdate);
            }}
          >
            Update Account
          </CustomButton>
          <CustomButton
            type="button"
            variant="contained"
            size="medium"
            btnColor="primary"
            onClick={() => {
              setShowDelete(!showDelete);
              setShowUpdate(false);
            }}
          >
            Delete Account
          </CustomButton>
        </FlexBox>
        {showUpdate && userData && (
          <>
            <Heading variant="h3">Update Informaction</Heading>
            <Form component="form">
              <CustomInput
                label="Name"
                type="text"
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    name: e.target.value,
                  })
                }
              />
              <CustomInput
                label="Surname"
                type="text"
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    surname: e.target.value,
                  })
                }
              />
              <CustomInput
                label="Email"
                type="email"
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    email: e.target.value,
                  })
                }
              />
              <CustomSelect
                label="currency-select-label"
                list={["CZK", "EUR"]}
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    currency: e.target.value,
                  })
                }
              />
              <CustomInput
                label="Password"
                type="password"
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    password: e.target.value,
                  })
                }
              />
              <CustomInput
                label="NewPassword"
                type="password"
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    newPassword: e.target.value,
                  })
                }
              />
              <CustomButton
                type="button"
                variant="contained"
                size="medium"
                btnColor="primary"
                isSingle={true}
                onClick={handleAccountUpdate}
              >
                submit
              </CustomButton>
            </Form>
          </>
        )}
        {showDelete && (
          <Form>
            <Paragraph variant="subtitle1">
              You sure you want to delete this account? Type your password
              bellow.
            </Paragraph>
            <FlexBox>
              <CustomInput
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FlexBox>
            <CustomButton
              type="button"
              variant="contained"
              size="medium"
              btnColor="primary"
              isSingle={true}
              onClick={deleteAccount}
            >
              submit
            </CustomButton>
          </Form>
        )}
      </Grid>
    </>
  );
};

export default Account;
