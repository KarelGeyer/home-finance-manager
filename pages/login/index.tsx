import React, { useState } from "react";
import { NextRouter, useRouter } from "next/dist/client/router";
import { useMutation, useQuery } from "@apollo/client";

import { GET_TEAM_IDS, LOGIN } from "../../graphql";
import { CustomInput, Heading } from "../../components";

import {
  LoginSection,
  Card,
  CardHeader,
  CardBody,
  CardButton,
  AccountIcon,
} from "../../styles/pages/login";

interface Credentials {
  email: string;
  password: string;
}

const Index: React.FC = () => {
  const router: NextRouter = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [login, { data: data, loading: isLoggingIn, error: loginError }] =
    useMutation(LOGIN);

  const { data: userData, refetch: userRefetch } = useQuery(GET_TEAM_IDS, {
    variables: {
      email: credentials.email,
    },
  });

  const handleSubmit = (): void => {
    login({
      variables: { user: credentials },
    });

    if (isLoggingIn) {
      console.log("loading");
    }

    if (loginError) {
      console.log("loggin error");
    }

    if (data) {
      const { login: refreshToken }: { login: { refreshToken: string } } = data;

      userRefetch();

      if (userData) {
        const teamIds = userData.user.team.map((user) => {
          return user.accountID;
        });

        localStorage.setItem("team_ids", teamIds);
        localStorage.setItem("ref_sh_tkn", refreshToken.refreshToken);
        localStorage.setItem("email", credentials.email);

        router.push("/");
      }
    }
  };

  return (
    <LoginSection>
      <Card>
        <CardHeader>
          <AccountIcon />
          <Heading variant="h3">Login Form</Heading>
        </CardHeader>
        <CardBody>
          <CustomInput
            label="Email"
            type="test"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <CustomInput
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
    </LoginSection>
  );
};

export default Index;
