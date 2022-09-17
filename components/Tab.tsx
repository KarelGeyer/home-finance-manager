import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export interface IProps {
  labelsList: string[];
  childrenList: JSX.Element[];
  activeTab: string;
}

export const CustomTab: React.FC<IProps> = ({
  labelsList,
  childrenList,
  activeTab,
}) => {
  const [value, setValue] = useState<string>(activeTab);

  const setVisibileTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (activeTab !== "") setValue(activeTab);
  }, [activeTab]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={setVisibileTab} aria-label="lab API tabs example">
            {labelsList &&
              labelsList.map((label, index) => {
                return <Tab label={label} value={`${index}`} key={index} />;
              })}
          </TabList>
        </Box>
        {childrenList &&
          childrenList.map((Children, index) => {
            return (
              <TabPanel value={`${index}`} key={index}>
                {Children}
              </TabPanel>
            );
          })}
      </TabContext>
    </Box>
  );
};
