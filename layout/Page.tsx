import { useRouter } from "next/dist/client/router";
import { ReactFragment } from "react";
import { AppBarMenu } from "../components";
import { getFormattedRouteName, getPageAttrs } from "../helpers";
import { Section } from "../styles/global";
import { GridContainer } from "../styles/global";

export interface IProps {
  children: ReactFragment;
}

const Page: React.FC<IProps> = ({ children }) => {
  const { pathname } = useRouter();
  const headingName = getFormattedRouteName(pathname);
  const { hasGroupFilter, hasSortFilter, hasMonthpicker } =
    getPageAttrs(headingName);

  return (
    <>
      {pathname !== "/" && pathname !== "/login" ? (
        <Section>
          <AppBarMenu
            heading={headingName}
            hasGroupFilter={hasGroupFilter}
            hasSortFilter={hasSortFilter}
            hasMonthPicker={hasMonthpicker}
          />
          <GridContainer container>{children}</GridContainer>
        </Section>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Page;
