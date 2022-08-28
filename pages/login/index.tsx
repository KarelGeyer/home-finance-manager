import React, { useContext, useState } from "react";
import { NextRouter, useRouter } from "next/dist/client/router";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../../graphql";
import { UserSearchContext } from "../../state/context/userContext";

import Typography from "@mui/material/Typography";
import {
  Section,
  Card,
  CardHeader,
  CardBody,
  CardInput,
  CardButton,
  AccountIcon,
} from "../../styles/pages/login";
import { useSelector } from "react-redux";
import { UserState } from "../../state/reducers/user";

const Index: React.FC = () => {
  const router: NextRouter = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { setUserSearch } = useContext(UserSearchContext);
  const [login, { loading: isLoggingIn, error: loginError }] =
    useMutation(LOGIN);
  const { userState } = useSelector((state: any) => state.userState);

  const handleSubmit = () => {
    login({
      variables: { user: credentials },
    });

    if (isLoggingIn) {
      console.log("loading");
    }

    if (loginError) {
      console.log("loggin error");
    } else {
      setUserSearch(credentials.email);
      router.push("/");
    }
  };

  return (
    <Section>
      <Card>
        <CardHeader>
          <AccountIcon />
          <Typography variant="h2">Login Form</Typography>
        </CardHeader>
        <CardBody>
          <CardInput
            id="outlined-name-input"
            label="Email"
            type="test"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <CardInput
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <CardButton variant="contained" onClick={handleSubmit}>
            Submit
          </CardButton>
        </CardBody>
      </Card>
    </Section>
  );
};

export default Index;
