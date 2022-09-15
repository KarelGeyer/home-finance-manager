import { useEffect } from "react";
import { NextRouter, useRouter } from "next/dist/client/router";

import WarningIcon from "@mui/icons-material/Warning";
import { CustomButton, Heading } from "../components";

const NotFound: React.FC = () => {
  const router: NextRouter = useRouter();

  useEffect((): void => {
    setTimeout((): void => {
      redirect();
    }, 5000);
  });

  const redirect = (): void => {
    router.push("/");
  };

  return (
    <>
      <WarningIcon
        sx={{
          width: "300px",
          height: "300px",
        }}
        color="error"
      />
      <Heading variant="h2">PAGE NOT FOUND!</Heading>
      <Heading variant="h5">
        You will be redirected back in 5 seconds, in case it does not happen,
        click the button bellow
      </Heading>
      <CustomButton
        type="button"
        size="medium"
        variant="contained"
        btnColor="error"
        onClick={redirect}
      >
        Go back
      </CustomButton>
    </>
  );
};

export default NotFound;
