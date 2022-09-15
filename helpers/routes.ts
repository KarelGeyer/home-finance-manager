export const getFormattedRouteName = (pathname) => {
  const cleaPathName = pathname.split("/")[1];
  const formattedRouteName =
    cleaPathName.charAt(0).toUpperCase() + cleaPathName.slice(1);

  return formattedRouteName;
};

export const getPageAttrs = (routename) => {
  switch (routename) {
    case "Account":
      return {
        hasGroupFilter: false,
        hasSortFilter: false,
        hasMonthpicker: false,
      };
    case "Transactions":
      return {
        hasGroupFilter: true,
        hasSortFilter: true,
        hasMonthpicker: true,
      };
    case "Overview":
      return {
        hasGroupFilter: true,
        hasSortFilter: true,
        hasMonthpicker: true,
      };
    default:
      return {
        hasGroupFilter: false,
        hasSortFilter: false,
        hasMonthpicker: false,
      };
  }
};
