interface FormmatedDate {
  year: number;
  month: number | string;
  monthName: string;
  date: string;
  day: string;
  fullDate: string;
}

export const getDate = (): FormmatedDate => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = `${date}`.split(" ")[2];

  const MONTH_NAMES = [
    "january",
    "feburary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const currentMonthName = MONTH_NAMES[month];
  const currentMonth = month < 10 ? `0${month}` : month;

  return {
    year,
    month: currentMonth,
    day,
    monthName: currentMonthName,
    date: `${year}-${currentMonth}`,
    fullDate: `${year}-${currentMonth}-${day}`,
  };
};
