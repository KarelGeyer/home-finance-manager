import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TeamMember {
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
  currency: string;
}

export interface TeamState {
  teamID: string;
  team: TeamMember[];
}

const initialState: { teamState: TeamState } = {
  teamState: {
    teamID: "",
    team: [],
  },
};

export const teamSlice = createSlice({
  name: "teamState",
  initialState,
  reducers: {
    setTeam: (state, value: PayloadAction<any>) => {
      const { teamState } = state;
      const { payload } = value;

      if (payload.user.teamID) {
        teamState.teamID = payload.user.teamID;
      }

      if (payload.user.team.length > 0) {
        payload.user.team.forEach((user) => {
          teamState.team.push(user);
        });
      }
    },
  },
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
