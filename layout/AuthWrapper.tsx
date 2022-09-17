import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql";
import { useDispatch } from "react-redux";
import { setEmail, setTeamIds } from "../state/reducers";

export interface IProps {
  children: React.FC | Element | ReactElement;
}

const AuthWrapper: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const [authenticate, { data: data, loading: isLoggingIn, error: authError }] =
    useMutation(AUTHENTICATE);
  const dispatch = useDispatch();

  useEffect((): any => {
    const email = localStorage?.getItem("email");
    const teamIds = localStorage?.getItem("team_ids").split(",");

    dispatch(setEmail(email));
    dispatch(setTeamIds(teamIds));
    const { pathname } = router;

    //   if (pathname != "/login" && pathname != "/") {

    //     if (!email) return router.push("/login");

    //     authenticate({
    //       variables: { email },
    //     });

    //     if (authError) return router.push("/login");

    //     if (!data) return router.push("/login");
    //   }
  }, [router]);

  return <>{children}</>;
};

export default AuthWrapper;
