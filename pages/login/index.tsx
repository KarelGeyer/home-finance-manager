import React from "react";
import { NextRouter, useRouter } from "next/dist/client/router";

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

const Index: React.FC = () => {
  const router: NextRouter = useRouter();

  const handleSubmit = (): void => {
    router.push("/");
  };

  return (
    <Section>
      <Card>
        <CardHeader>
          <AccountIcon />
          <Typography variant="h2">Login Form</Typography>
        </CardHeader>
        <CardBody>
          <CardInput id="outlined-name-input" label="Name" type="test" />

          <CardInput
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
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
