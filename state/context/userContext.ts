import { createContext } from "react";

interface UserSearchType {
  userSearch: string;
  setUserSearch: React.Dispatch<React.SetStateAction<string>>;
}

const userSearch: UserSearchType = {
  userSearch: "",
  setUserSearch: function setUserSearch() {},
};

export const UserSearchContext = createContext(userSearch);
